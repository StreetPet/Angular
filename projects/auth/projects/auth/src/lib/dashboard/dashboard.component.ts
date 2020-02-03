import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from 'firebase';

@Component({
  selector: 'lib-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

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
