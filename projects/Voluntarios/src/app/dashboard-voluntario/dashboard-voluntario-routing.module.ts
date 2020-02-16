import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardVoluntarioComponent } from './dashboard-voluntario.component';

const routes: Routes = [{ path: '', component: DashboardVoluntarioComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardVoluntarioRoutingModule { }
