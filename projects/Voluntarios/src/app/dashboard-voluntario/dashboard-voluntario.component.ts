import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from 'projects/auth/src/lib/dashboard/dashboard.component';
import { User } from 'firebase';
import { AuthService } from 'projects/auth/src/public-api';

@Component({
  selector: 'app-dashboard-voluntario',
  templateUrl: './dashboard-voluntario.component.html',
  styleUrls: ['./dashboard-voluntario.component.scss']
})
export class DashboardVoluntarioComponent extends DashboardComponent implements OnInit {

  ngOnInit() {
    super.ngOnInit();
  }

  public get visitanteData(): User {
    return this.authService.visitanteData;
  }

  public signOut(): Promise<void>{
    return this.authService.signOut();
  }
}
