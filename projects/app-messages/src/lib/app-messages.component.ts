import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FIFOMessagesBuffer, MsgData } from './fifo-message.buffer';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'lib-app-messages',
  template: `
  <span [class]="class">
  {{msg}}
  </span>
  `,
  styles: [
    'app-mesages.component.scss'
  ]
})
export class AppMessagesComponent {

  msg: string;
  class: string;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) private data: MsgData,
    private srv: FIFOMessagesBuffer) {
    this.msg = this.data.message;
    if (this.data.class !== undefined)
      this.class = this.data.class;
    else if (this.data.type === 'info')
      this.class = 'app-msg-info';
    else if (this.data.type === 'alert')
      this.class = 'app-msg-alert';
    else
      this.class = 'app-msg';
  }

}
