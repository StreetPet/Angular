import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    DashboardComponent, 
    SignInComponent, 
    SignUpComponent, 
    ForgotPasswordComponent, 
    VerifyEmailComponent],
  imports: [
    CommonModule,
    AngularFireAuthModule
  ],
  exports: []
})
export class AuthModule { }
