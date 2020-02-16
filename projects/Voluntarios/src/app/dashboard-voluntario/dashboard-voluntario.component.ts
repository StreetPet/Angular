import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from 'projects/auth/src/lib/dashboard/dashboard.component';

@Component({
  selector: 'app-dashboard-voluntario',
  templateUrl: './dashboard-voluntario.component.html',
  styleUrls: ['./dashboard-voluntario.component.scss']
})
export class DashboardVoluntarioComponent extends DashboardComponent implements OnInit {


  ngOnInit() {
    super.ngOnInit();
  }

}
