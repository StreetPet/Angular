import { Observable, BehaviorSubject, Subject, Subscription } from 'rxjs';
import { OnDestroy, OnInit } from '@angular/core';
import { AppMessagesService } from 'projects/app-messages/src';
import { Papel, Voluntario, VoluntariosService, PapeisService } from 'projects/entities/src';

export abstract class PapeisVoluntarioComponentBase
   implements OnInit, OnDestroy {

   protected subscriptions: Subscription[] = new Array();
   protected subscriptionsVoluntario: Subscription[] = new Array();

   /*
    * Todos os Papeis disponiveis no sistema para uso com um voluntário
    *
    */
   // tslint:disable-next-line:variable-name
   protected _papeis: Subject<Papel[]> = new Subject<Papel[]>();

   /*
    * Papeis designados para o voluntário
    *
    */
   // tslint:disable-next-line:variable-name
   private _papeisVoluntario: Subject<Papel[]> = new Subject<Papel[]>();

   waittingPapeis: { [index: string]: BehaviorSubject<boolean>; } = {};
   checkPapeis: { [index: string]: BehaviorSubject<boolean>; } = {};

   // tslint:disable-next-line: variable-name
   _voluntario: Voluntario;

   constructor(
      protected msgs: AppMessagesService,
      protected voluntariosSrv: VoluntariosService,
      protected papeisSrv: PapeisService) {

   }

   ngOnInit() {
      console.log(`PapeisVoluntarioComponentBase.ngOnInit voluntário: ${JSON.stringify(this._voluntario)}`);

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
   }

   ngOnDestroy() {
      this.subscriptions.forEach(s => s.unsubscribe());
      this.subscriptionsVoluntario.forEach(s => s.unsubscribe());
   }


   get $papeis(): Observable<Papel[]> {
      return this._papeis;
   }

   updateVoluntarioData(voluntario: Voluntario) {
      console.log(`PapeisVoluntarioComponentBase.updateVoluntarioData Voluntario: ${JSON.stringify(voluntario)}`);

      if (voluntario && this._voluntario.uid !== voluntario.uid) {
         this.subscriptionsVoluntario.forEach((s: Subscription) => {
            s.unsubscribe();
         })
         this.subscriptionsVoluntario = [];
         this.subscriptionsVoluntario.push(this.voluntariosSrv
            .observePapeisEmEspera(voluntario.uid, (papeis: Papel[]) => {
               for (const uid in papeis) {
                  if (papeis.hasOwnProperty(uid)) {
                     this.checkPapel(papeis[uid]).next(true);
                     this.waittingPapel(papeis[uid]).next(true);
                  }
               }
            }));
         this.subscriptionsVoluntario.push(this.voluntariosSrv
            .observePapeis(voluntario.uid, (papeis: Papel[]) => {
               for (const uid in papeis) {
                  if (papeis.hasOwnProperty(uid)) {
                     this.checkPapel(papeis[uid]).next(true);
                     this.waittingPapel(papeis[uid]).next(false);
                  }
               }
            }));

         this.msgs.addMsg(
            `Voluntário: ${this._voluntario.uid},
         Nome: ${this._voluntario.nome} ${this._voluntario.sobrenome}`);
      }
   }

   /**
    * informa se o papel informado está atribuido ao voluntário atual ou sendo aguardado.
    * 
    * @param p
    */
   checkPapel(p: Papel): Subject<boolean> {
      if (!this.checkPapeis[p.uid]) {
         this.checkPapeis[p.uid] = new BehaviorSubject<boolean>(false);
      }
      return this.checkPapeis[p.uid];
   }

   /**
    * Inofrma se o papel informado está sendo aguardo para o voluntário atual.
    * 
    * @param p 
    */
   waittingPapel(p: Papel): Subject<boolean> {
      if (!this.waittingPapeis[p.uid]) {
         this.waittingPapeis[p.uid] = new BehaviorSubject<boolean>(false);
      }
      return this.waittingPapeis[p.uid];
   }
}
