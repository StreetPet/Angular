import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from 'projects/auth/src/lib/dashboard/dashboard.component';
import { Voluntario, VoluntariosService, AvatarVoluntario } from 'projects/entities/src';
import { AuthService } from 'projects/auth/src';

@Component({
  selector: 'app-dashboard-voluntario',
  templateUrl: './dashboard-voluntario.component.html',
  styleUrls: ['./dashboard-voluntario.component.scss']
})
export class DashboardVoluntarioComponent extends DashboardComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  _voluntario: Voluntario;

  voluntariadoConfirmado: boolean = false;

  constructor(
    protected authService: AuthService,
    private voluntarioSrv: VoluntariosService) {

    super(authService);

  }

  get voluntario(): Voluntario{
    console.log(`Lendo Voluntario em Dashboard ${this._voluntario}`)
    return this._voluntario;
  }

  get isVoluntario(): boolean {
    return this.voluntario != null;
  }


  ngOnInit() {
    console.log(`ngOnInit em dashboard voluntário ${this._voluntario}`);

    const subscription = this.voluntarioSrv
      .observeVoluntario(this.visitante.uid, (voluntario: Voluntario) => {
        subscription.unsubscribe();
        console.log(`Voluntario em DashBoard: ${voluntario}`);
        this._voluntario = voluntario;
        super.ngOnInit();
      });
  }

  public tornarSeVoluntario(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (!this.voluntariadoConfirmado) reject();

      // popular Voluntário com dados do usuário logado
      const novoVoluntario: Voluntario = {
        uid: this.visitante.uid,
        nome: this.visitante.displayName,
        email: this.visitante.email,
        avatar: this.visitante.photoURL
      } as Voluntario;
      this.voluntarioSrv.createVoluntario(novoVoluntario)
        .then((voluntario: Voluntario) => {
          this._voluntario = voluntario;
        });
      resolve(true);
    });
  }
}
