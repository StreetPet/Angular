import { Injectable } from '@angular/core';
import { RouterStateSnapshot, Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { DASHBOARD_ROUTER_NAME } from './auth-routing.names';
import { AppMessagesService } from 'projects/app-messages/src';

@Injectable({
  providedIn: 'root'
})
export class SecureInnerPagesGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public msgSrv: AppMessagesService,
    public router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn) {
      this.msgSrv.addMsg('Você não está autorizado a navegar para este serviço! ${state.url}', 'alert');
      this.router.navigate([DASHBOARD_ROUTER_NAME]);
    }
    return true;
  }

}
