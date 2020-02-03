import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'lib-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  googleAuth(): Promise<void>{
    return this.authService.googleAuth();
  }
  facebookAuth(): Promise<void>{
    return this.authService.facebookAuth();
  }
  signUp(email:string, password:string): Promise<void>{
    return this.authService.signUp(email, password);
  }

}
