import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'projects/auth/src/public-api';

@Component({
  selector: 'lib-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private authService:AuthService,private router: Router) { }

  ngOnInit() {
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  public login(): Promise<boolean> {
    console.log("Clicando no Login");
    return this.authService.signIn();
  }

  public logout(): Promise<void> {
    console.log("Clicando no Logout");
    return this.authService.signOut();
  }
}
