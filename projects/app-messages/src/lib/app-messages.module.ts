import { NgModule } from '@angular/core';
import { AppMessagesComponent } from './app-messages.component';
import { MatSnackBarModule } from '@angular/material';
import { FIFOMessagesBuffer } from './fifo-message.buffer';



@NgModule({
  declarations: [AppMessagesComponent],
  imports: [
    MatSnackBarModule
  ],
  exports: [AppMessagesComponent],
  providers: [FIFOMessagesBuffer]
})
export class AppMessagesModule { }
