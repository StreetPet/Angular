import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AppMessagesComponent } from './app-messages.component';
import { AppMessagesInternalService } from './app-messages-internal-service';

@Injectable({
  providedIn: 'root'
})
export class AppMessagesService {

  // tslint:disable-next-line:variable-name
  private _durationInSeconds: number;

  constructor(
    private srv: AppMessagesInternalService,
    private snackBar: MatSnackBar) {

    this._durationInSeconds = 5;

    this.srv.subscribe((msg: string) => {
      this.snackBar.open(msg, 'x', {
        duration: this._durationInSeconds * 1000,
      });
    });
  }

  set duration(d: number) {
    this._durationInSeconds = d;
  }

  public addMsg(msg: string) {
    console.log(`Adicionando Mensagem: ${msg}`);
    this.srv.next(msg);
  }
}
