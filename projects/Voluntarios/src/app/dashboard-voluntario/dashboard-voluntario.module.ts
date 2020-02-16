import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardVoluntarioRoutingModule } from './dashboard-voluntario-routing.module';
import { DashboardVoluntarioComponent } from './dashboard-voluntario.component';
import { IDashboardModule } from 'projects/auth/src/public-api';


@NgModule({
  declarations: [DashboardVoluntarioComponent],
  imports: [
    CommonModule,
    DashboardVoluntarioRoutingModule
  ]
})
export class DashboardVoluntarioModule implements IDashboardModule { }
