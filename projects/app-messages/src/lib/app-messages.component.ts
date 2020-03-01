import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppMessagesInternalService } from './app-messages-internal-service';

@Component({
  selector: 'lib-app-messages',
  template: `
  <span class="app-msg">
  {{msg}}
  </span>
  `,
  styles: [
    `app-msg{
      color: hotpink;
    }`
  ]
})
export class AppMessagesComponent implements OnInit, OnDestroy {

  msg: string;
  subscription: Subscription;

  constructor(private srv: AppMessagesInternalService) { }

  ngOnInit() {
    this.subscription = this.srv.subscribe((msg: string) => {
      console.log(`Componente recebeu mensagem: ${msg}`);
      this.msg = msg;
    });
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

}
