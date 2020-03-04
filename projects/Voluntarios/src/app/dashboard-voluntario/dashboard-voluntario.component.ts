import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardComponent } from 'projects/auth/src/lib/dashboard/dashboard.component';
import { Voluntario, VoluntariosService, AvatarVoluntario } from 'projects/entities/src';
import { AuthService } from 'projects/auth/src';
import { BehaviorSubject, Subject, Observable, Subscription } from 'rxjs';
import { AppMessagesService } from 'projects/app-messages/src';
import { Visitante } from 'entities/lib/visitantes/visitante';

@Component({
  selector: 'app-dashboard-voluntario',
  templateUrl: './dashboard-voluntario.component.html',
  styleUrls: ['./dashboard-voluntario.component.scss']
})
export class DashboardVoluntarioComponent
  extends DashboardComponent
  implements OnInit, OnDestroy {

  // tslint:disable-next-line: variable-name
  private _$voluntario: BehaviorSubject<Voluntario> = new BehaviorSubject<Voluntario>(null);

  voluntariadoConfirmado: boolean = false;
  private subscriptionVoluntario: Subscription;

  constructor(
    protected msgSrv: AppMessagesService,
    protected authService: AuthService,
    private voluntarioSrv: VoluntariosService) {

    super(authService);

  }

  get $voluntario(): Observable<Voluntario> {
    return this._$voluntario;
  }

  get isVoluntario(): boolean {
    return this._$voluntario.getValue() != null;
  }

  ngOnInit() {
    console.log(`DashboardVoluntarioComponent.ngOnInit voluntário: ${JSON.stringify(this._$voluntario.getValue())}`);

    this.$visitante.subscribe((visitante: Visitante) => {
      if (visitante) {
        if (this.subscriptionVoluntario)
          this.subscriptionVoluntario.unsubscribe();

        this.subscriptionVoluntario = this.voluntarioSrv
          .observeVoluntario(visitante.uid, (voluntario: Voluntario) => {

            console.log(`DashboardVoluntarioComponent.ngOnInit`
              + ` Srv.observeVoluntario Voluntario: ${JSON.stringify(voluntario)}`);

            this._$voluntario.next(voluntario);

          });

      }
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  public tornarSeVoluntario(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (!this.voluntariadoConfirmado) {
        this.msgSrv.addMsg(
          'Você precisa confirmar que está ciente de nossa politica de trabalho e das responsabilidade que está assumindo!');
        reject();
      }

      // popular Voluntário com dados do usuário logado
      const novoVoluntario: Voluntario = {
        uid: this.visitante.uid,
        nome: this.visitante.displayName,
        email: this.visitante.email,
        avatar: this.visitante.photoURL
      } as Voluntario;
      this.voluntarioSrv.createVoluntario(novoVoluntario)
        .then((voluntario: Voluntario) => {
          this._$voluntario.next(voluntario);
        });
      resolve(true);
    });
  }
}
