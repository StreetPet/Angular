import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardVoluntarioRoutingModule } from './dashboard-voluntario-routing.module';
import { DashboardVoluntarioComponent } from './dashboard-voluntario.component';
import { IDashboardModule } from 'projects/auth/src/public-api';
import { ListarPapeisVoluntarioComponent } from '../papeis/listar-papeis-voluntario/listar-papeis-voluntario.component';
import { EditarPapeisVoluntarioComponent } from '../papeis/editar-papeis-voluntario/editar-papeis-voluntario.component';
import { MatIconModule, MatRadioGroup, MatRadioButton, MatRadioModule } from '@angular/material';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardVoluntarioComponent,
    EditarPapeisVoluntarioComponent,
    ListarPapeisVoluntarioComponent
  ],
  imports: [
    CommonModule, 
    FormsModule,   
    MatIconModule,
    MatRadioModule,
    DashboardVoluntarioRoutingModule
  ]
})
export class DashboardVoluntarioModule implements IDashboardModule { }
