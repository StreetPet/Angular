import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardVoluntarioRoutingModule } from './dashboard-voluntario-routing.module';
import { DashboardVoluntarioComponent } from './dashboard-voluntario.component';
import { IDashboardModule } from 'projects/auth/src';
import { MatIconModule, MatRadioModule, MatCheckboxModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { PapeisModule } from '../papeis/papeis.module';


@NgModule({
  declarations: [
    DashboardVoluntarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    MatIconModule,
    MatRadioModule,
    DashboardVoluntarioRoutingModule,
    PapeisModule
  ]
})
export class DashboardVoluntarioModule implements IDashboardModule { }
