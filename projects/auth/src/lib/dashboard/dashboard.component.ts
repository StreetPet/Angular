import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { AuthService } from '../auth.service';

export interface IDashboardComponent{
  visitanteData: User;
  signOut(): Promise<void>;
}

@Component({
  selector: 'lib-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements IDashboardComponent,OnInit{

  constructor(
    protected authService: AuthService) { }

  ngOnInit() {
  }

  public get visitanteData(): User {
    return this.authService.visitanteData;
  }

  public signOut(): Promise<void>{
    return this.authService.signOut();
  }

}
