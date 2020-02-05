import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from 'firebase';

export interface IDashboardComponent{

  visitanteData: User;
  signOut(): Promise<void>;
}
@Component({
  selector: 'lib-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements IDashboardComponent, OnInit{

  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone) { }

  ngOnInit() {
  }

  public get visitanteData(): User {
    return this.authService.visitanteData;
  }

  public signOut(): Promise<void>{
    return this.authService.signOut();
  }

}
