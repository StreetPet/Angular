import { NgModule } from '@angular/core';
import { AppMessagesComponent } from './app-messages.component';
import { MatSnackBarModule } from '@angular/material';



@NgModule({
  declarations: [AppMessagesComponent],
  imports: [
    MatSnackBarModule
  ],
  exports: [AppMessagesComponent]
})
export class AppMessagesModule { }
