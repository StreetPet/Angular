import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Voluntario, VoluntariosService, PapeisService, Papel } from 'projects/entities/src';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable, Subject, BehaviorSubject } from 'rxjs';
import { AppMessagesService } from 'projects/app-messages/src';

/**
 * TODO: O Componente Editar e Listar podem ser unificados, adicionand apenas um parametro que torna a listagem somente leitura, somente a função checkPapel() é diferente
 */
@Component({
  selector: 'app-listar-papeis-voluntario',
  templateUrl: './listar-papeis-voluntario.component.html',
  styleUrls: ['./listar-papeis-voluntario.component.scss']
})
export class ListarPapeisVoluntarioComponent implements OnInit, OnDestroy {
  private routeDataSubscription: Subscription;

  private subscriptions: Subscription[] = new Array();

  /*
   * Todos os Papeis disponiveis no sistema para uso com um voluntário
   *
   */
  // tslint:disable-next-line:variable-name
  private _papeis: Subject<Papel[]> = new Subject<Papel[]>();
  /*
   * Observable que representa todos os papeis disponiveis no sistema
   * para uso com um voluntário
   */
  // tslint:disable-next-line:variable-name
  private _papeis$: Observable<Papel[]>;

  /*
   * Papeis designados para o voluntário
   *
   */
  // tslint:disable-next-line:variable-name
  private _papeisVoluntario: Subject<Papel[]> = new Subject<Papel[]>();
  /*
   * Observable que representa os papeis que foram desginados para o voluntario
   */
  // tslint:disable-next-line:variable-name
  private _papeisVoluntario$: Observable<Papel[]>;

  waittingPapeis: { [index: string]: BehaviorSubject<boolean>; } = {};
  waittingPapeis$: { [index: string]: Observable<boolean>; } = {};
  checkPapeis: { [index: string]: BehaviorSubject<boolean>; } = {};
  checkPapeis$: { [index: string]: Observable<boolean>; } = {};

  // tslint:disable-next-line: variable-name
  _voluntario: Voluntario;

  constructor(
    protected msgs: AppMessagesService,
    protected voluntariosSrv: VoluntariosService,
    protected papeisSrv: PapeisService,
    protected route: ActivatedRoute) {

    this._papeis$ = this._papeis.asObservable();
    this._papeisVoluntario$ = this._papeisVoluntario.asObservable();

  }

  // tslint:disable-next-line: no-input-rename
  @Input('voluntario')
  set voluntario(v: Voluntario) {
    console.log(`setado Voluntario em listar papeis ${v}`);
    this._voluntario = v;
  }
  
  ngOnInit() {
    console.log(`ngOnInit em lista papeis ${this._voluntario}`);

    this.subscriptions
      .push(this.papeisSrv.observePapeis((papeis: Papel[]) => {
        const papeisArray: Papel[] = [];
        papeis.forEach((papel: Papel) => {
          // TODO verificar se o tipo de papel deve ser usado
          papeisArray.push(papel);

          this.checkPapel(papel);

          this.waittingPapel(papel);

        });

        this._papeis.next(papeisArray);
      }));
    this.subscriptions.push(this.route.data
      .subscribe(routeData => {
        this.voluntario = routeData.data;
        if (this.voluntario) {
          this.voluntariosSrv.observePapeis(this.voluntario, (papeis: Papel[]) => {
            console.log('papeis do voluntario');
            console.log(papeis);
            const papeisArray: Papel[] = [];
            for (const uid in papeis) {
              if (papeis.hasOwnProperty(uid))
                papeisArray.push(papeis[uid]);
            }
            this._papeisVoluntario.next(papeisArray);
          });
        }
      }));
    this.subscriptions.push(this.voluntariosSrv
      .observePapeisEmEspera(this.voluntario.uid, (papeis: Papel[]) => {
        for (const uid in papeis) {
          if (papeis.hasOwnProperty(uid)) {

            this.checkPapel(papeis[uid]);

            this.waittingPapel(papeis[uid]);

            this.waittingPapeis[uid].next(true);
            this.checkPapeis[uid].next(true);
          }
        }
      }));
    this.subscriptions.push(this.voluntariosSrv
      .observePapeis(this.voluntario.uid, (papeis: Papel[]) => {
        for (const uid in papeis) {
          if (papeis.hasOwnProperty(uid)) {
            this.checkPapel(papeis[uid]);

            this.waittingPapel(papeis[uid]);

            this.waittingPapeis[uid].next(false);
            this.checkPapeis[uid].next(true);
          }
        }
      }));

    this.msgs.addMsg(
      `Editando Papeis do Usuário ${this.voluntario.uid},
       Nome: ${this.voluntario.nome} ${this.voluntario.sobrenome}`);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }


  get $papeis(): Observable<Papel[]> {
    return this._papeis$;
  }

  /**
   * Verifica se o papel informado é atribuido ao Voluntário
   */
  checkPapel(p: Papel): Observable<boolean> {
    if (!this.waittingPapeis$[p.uid]) {
      this.checkPapeis[p.uid] = new BehaviorSubject<boolean>(false);
      this.checkPapeis$[p.uid] = this.checkPapeis[p.uid].asObservable();
    }
    return this.checkPapeis$[p.uid];
  }

  waittingPapel(p: Papel): Observable<boolean> {
    if (!this.waittingPapeis$[p.uid]) {
      this.waittingPapeis[p.uid] = new BehaviorSubject<boolean>(false);
      this.waittingPapeis$[p.uid] = this.waittingPapeis[p.uid].asObservable();
    }
    return this.waittingPapeis$[p.uid];
  }

  /**
   * Ao Listar papeis não é permitido mudar o estado.
   * 
   * @param p 
   */
  clickCheckPapel(p: Papel): boolean {
    return false;
  }
}
