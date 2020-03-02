import { Injectable } from '@angular/core';
import { RouterStateSnapshot, Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { DASHBOARD_ROUTER_NAME } from './auth-routing.names';

@Injectable({
  providedIn: 'root'
})
export class SecureInnerPagesGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn) {
      window.alert('You are not allowed to access this URL!');
      this.router.navigate([DASHBOARD_ROUTER_NAME]);
    }
    return true;
  }

}
