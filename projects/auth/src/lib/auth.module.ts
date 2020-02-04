import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SecureInnerPagesGuard } from './secure-inner-pages.guard';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { AuthService } from './auth.service';
import { AuthRoutingModule } from './auth.routing';

@NgModule({
  declarations: [
    DashboardComponent, 
    SignInComponent, 
    SignUpComponent, 
    ForgotPasswordComponent, 
    VerifyEmailComponent],
  imports: [
    AuthRoutingModule,
    CommonModule,
    AngularFireAuthModule
  ],  
  exports: [AuthRoutingModule]

})
export class AuthModule { }
