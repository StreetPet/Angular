import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PapeisRoutingModule } from './papeis-routing.module';
import { PapeisComponent } from './papeis.component';
import { ListarPapeisVoluntarioComponent } from './listar-papeis-voluntario/listar-papeis-voluntario.component';
import { EditarPapeisVoluntarioComponent } from './editar-papeis-voluntario/editar-papeis-voluntario.component';


@NgModule({
  declarations: [
    PapeisComponent, 
    ListarPapeisVoluntarioComponent,
    EditarPapeisVoluntarioComponent
  ],
  imports: [
    CommonModule,
    PapeisRoutingModule
  ]
})
export class PapeisModule { }
