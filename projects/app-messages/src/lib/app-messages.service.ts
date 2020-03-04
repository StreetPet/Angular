import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FIFOMessagesBuffer, Message, MsgData, MsgType } from './fifo-message.buffer';

@Injectable({
  providedIn: 'root'
})
export class AppMessagesService {

  // tslint:disable-next-line:variable-name
  private _durationInSeconds: number;

  constructor(
    private fifo: FIFOMessagesBuffer,
    private snackBar: MatSnackBar) {

    this._durationInSeconds = 5;

    this.fifo.subscribeMsgInfo((msg: Message) => {
      console.log(`Exibe Mensagem: ${msg}`);
      if (msg === undefined) return;
      if (typeof msg === 'string') {
        if (msg === '') return;
        this.snackBar.open(msg, 'X', {
          duration: this._durationInSeconds * 1000,
        });
      } else {
        console.log(JSON.stringify(msg));
        if (msg.message === '') return;
        msg = msg as MsgData;
        this.snackBar.open(msg.message, 'X', {
          verticalPosition: (msg.type !== 'info') ? 'top' : 'bottom',
          duration: msg.duration ? msg.duration : this._durationInSeconds * 1000,
        });
      }
    });
  }
  public log(arg0: string) {
    console.log(arg0);
  }

  set duration(d: number) {
    this._durationInSeconds = d;
  }

  public addMsg(message: Message, type: MsgType = 'info') {
    console.log(`Adicionando Mensagem: ${message}, do tipo ${type}`);
    if (type === 'info')
      this.fifo.addMessage(message);
    else {
      if (typeof message === 'string') {
        this.fifo.addMessage({ message, type });
      } else {
        (message as MsgData).type = type;
        this.fifo.addMessage(message);
      }
    }
  }
}
