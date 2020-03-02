import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() { }

  public signIn(email: string, password: string): Promise<boolean | void> {
    return this.authService.signIn(email, password);
  }

  public googleAuth(): Promise<void> {
    return this.authService.googleAuth();
  }

  public facebookAuth(): Promise<void> {
    return this.authService.facebookAuth();
  }

  public githubAuth(): Promise<void> {
    return this.authService.githubAuth();
  }
}