import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from 'firebase';
import { Visitante } from 'projects/entities/src';

@Component({
  selector: 'lib-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  get visitante(): Visitante {
    return this.authService.visitante;
  }

  sendVerificationMail(): Promise<void> {
    return this.authService.sendVerificationMail();
  }
}
