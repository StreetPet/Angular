import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, DASHBOARD_ROUTER_NAME as DASHBOARD_ROUTER_NAME_LIB } from 'projects/auth/src';

@Component({
  selector: 'lib-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  readonly DASHBOARD_ROUTER_NAME = DASHBOARD_ROUTER_NAME_LIB;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  public login(): Promise<void> {
    console.log('Clicando no Login');
    return this.authService.signIn();
  }

  public logout(): Promise<void> {
    console.log('Clicando no Logout');
    return this.authService.signOut();
  }

  public get userAvatar(): string {
    return this.authService.visitante.photoURL;
  }
}
