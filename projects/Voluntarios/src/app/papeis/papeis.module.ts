import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PapeisRoutingModule } from './papeis-routing.module';
import { ListarPapeisVoluntarioComponent } from './listar-papeis-voluntario/listar-papeis-voluntario.component';
import { EditarPapeisVoluntarioComponent } from './editar-papeis-voluntario/editar-papeis-voluntario.component';
import { MatCardModule, MatCheckboxModule, MatTooltipModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListarPapeisVoluntarioComponent,
    EditarPapeisVoluntarioComponent,
  ],
  exports:[
    ListarPapeisVoluntarioComponent,
    EditarPapeisVoluntarioComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatTooltipModule,
    MatCardModule,
    MatCheckboxModule,
    PapeisRoutingModule
  ]
})
export class PapeisModule { }
