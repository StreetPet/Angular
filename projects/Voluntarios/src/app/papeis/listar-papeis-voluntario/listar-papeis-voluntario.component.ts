import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Voluntario, VoluntariosService, PapeisService, Papel } from 'projects/entities/src';
import { ActivatedRoute } from '@angular/router';
import { AppMessagesService } from 'projects/app-messages/src';
import { PapeisVoluntarioComponentBase } from '../papeis-voluntario-component-base';
import { Subscription } from 'rxjs';

/**
 * TODO: O Componente Editar e Listar podem ser unificados, adicionand apenas um parametro que torna a listagem somente leitura, somente a função checkPapel() é diferente
 */
@Component({
  selector: 'app-listar-papeis-voluntario',
  templateUrl: './listar-papeis-voluntario.component.html',
  styleUrls: ['./listar-papeis-voluntario.component.scss']
})
export class ListarPapeisVoluntarioComponent
  extends PapeisVoluntarioComponentBase
  implements OnInit, OnDestroy, OnChanges {

  constructor(
    protected msgs: AppMessagesService,
    protected voluntariosSrv: VoluntariosService,
    protected papeisSrv: PapeisService) {

    super(msgs, voluntariosSrv, papeisSrv);
  }

  // tslint:disable-next-line: no-input-rename
  @Input('voluntario')
  set voluntario(v: Voluntario) {
    console.log(`ListarPapeisVoluntarioComponent.voluntario: ${JSON.stringify(v)}`);
    this._voluntario = v;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ListarPapeisVoluntarioComponent.ngOnChanges');
    console.log(`Changes: ${JSON.stringify(changes)}`);
    console.log(`Voluntario: ${JSON.stringify(this._voluntario)}`);

    const voluntario: Voluntario = changes.voluntario.currentValue as any as Voluntario;

    this.updateVoluntarioData(voluntario);
  }

}
