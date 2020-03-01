import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject, Subscription } from 'rxjs';

/**
 * O Serviço interno evida referencia ciclica entre o componente
 * e o serviço externo.
 */
@Injectable({
  providedIn: 'root'
})
export class AppMessagesInternalService {

  private msgSubject: Subject<string> = new BehaviorSubject<string>('');
  private $msgObservable: Observable<string> = this.msgSubject.asObservable();

  constructor() { }

  protected get $msg(): Observable<string> {
    return this.$msgObservable;
  }

  public subscribe(arg0: (msg: string) => void): Subscription {
    return this.$msg.subscribe(arg0);
  }

  public next(msg: string) {
    this.msgSubject.next(msg);
  }

}
