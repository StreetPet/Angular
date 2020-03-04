import { Component, OnInit, OnDestroy } from '@angular/core';
import { Papel, VoluntariosService, PapeisService } from 'projects/entities/src';
import { ResultWaitPapel } from 'projects/entities/src';
import { ListarPapeisVoluntarioComponent } from '../listar-papeis-voluntario/listar-papeis-voluntario.component';
import { PapeisVoluntarioComponentBase } from '../papeis-voluntario-component-base';
import { AppMessagesService } from 'projects/app-messages/src';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-papeis-voluntario',
  templateUrl: './editar-papeis-voluntario.component.html',
  styleUrls: ['./editar-papeis-voluntario.component.scss']
})
export class EditarPapeisVoluntarioComponent
  extends PapeisVoluntarioComponentBase
  implements OnInit, OnDestroy {

  constructor(
    protected msgs: AppMessagesService,
    protected voluntariosSrv: VoluntariosService,
    protected papeisSrv: PapeisService,
    protected route: ActivatedRoute) {

    super(msgs, voluntariosSrv, papeisSrv);

  }

  ngOnInit() {
    console.log(`EditarPapeisVoluntarioComponent.ngOnInit`);
    super.ngOnInit();

    this.subscriptions.push(this.route.data
      .subscribe(routeData => {
        this._voluntario = routeData.data;
        if (this._voluntario) {
          this.updateVoluntarioData(this._voluntario);
        }
      }));
  }

  clickCheckPapel(p: Papel): boolean {

    this.waittingPapeis[p.uid].next(true);
    this.checkPapeis[p.uid].next(true);

    this.voluntariosSrv
      .solicitaPapel(this._voluntario, p, (resultado: ResultWaitPapel) => {
        console.log(`Serviço respondeu ${resultado}`);
        if (resultado === 'aguardando') {
          this.waittingPapeis[p.uid].next(true);
          this.checkPapeis[p.uid].next(true);
          this.alertaUsuarioPapelAguardando();
        } else if (resultado === 'autorizado') {
          this.waittingPapeis[p.uid].next(false);
          this.checkPapeis[p.uid].next(true);
          this.alertaUsuarioPapelAutorizado();
        } else if (resultado === 'cancelado') {
          this.waittingPapeis[p.uid].next(false);
          this.checkPapeis[p.uid].next(false);
          this.alertaUsuarioSolicitaPapelCancelado();
        } else if (resultado === 'negado') {
          this.waittingPapeis[p.uid].next(false);
          this.checkPapeis[p.uid].next(false);
          this.alertaUsuarioSolicitaPapelNegado();
        } else {
          this.alertaUsuarioSolicitaPapelResultadoDesconhecido(resultado);
        }
      });

    return false;
  }
  alertaUsuarioSolicitaPapelCancelado() {
    this.msgs.addMsg('A Solicitação de Papel foi cancelada!');
  }
  alertaUsuarioSolicitaPapelResultadoDesconhecido(resultado: any) {
    this.msgs
      .addMsg(`A Solicitação deu um resultado desconhecido: ${resultado}`);
  }
  alertaUsuarioSolicitaPapelNegado() {
    this.msgs.addMsg('A solicitação foi negada!');
  }
  alertaUsuarioPapelAutorizado() {
    this.msgs.addMsg('Papel Autorizado!');
  }
  alertaUsuarioPapelAguardando() {
    this.msgs.addMsg('Solicitação ainda não foi aprovada e está aguardando analise!');
  }
}
