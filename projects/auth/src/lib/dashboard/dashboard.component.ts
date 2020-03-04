import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Visitante } from 'projects/entities/src';
import { BehaviorSubject, Subscribable, Subscription } from 'rxjs';

export interface IDashboardComponent {
  $visitante: BehaviorSubject<Visitante>;
  signOut(): Promise<void>;
}

@Component({
  selector: 'lib-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements IDashboardComponent, OnDestroy {

  // tslint:disable-next-line: variable-name
  private _visitante: BehaviorSubject<Visitante> = new BehaviorSubject<Visitante>(null);
  // tslint:disable-next-line: variable-name
  private _subscriptionVisitante: Subscription;

  constructor(
    protected authService: AuthService) {
    this._subscriptionVisitante = this.authService.observeVisitante((visitante: Visitante) => {
      this._visitante.next(visitante);
    });

  }

  public get $visitante(): BehaviorSubject<Visitante> {
    return this._visitante;
  }

  public get visitante(): Visitante {
    return this._visitante.getValue();
  }

  public signOut(): Promise<void> {
    return this.authService.signOut();
  }

  ngOnDestroy() {
    if (this._subscriptionVisitante) this._subscriptionVisitante.unsubscribe();
  }
}
