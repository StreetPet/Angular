import { CommonModule } from '@angular/common';
import { Injector, NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { IonicModule } from '@ionic/angular';
import { AuthRoutingModule } from './auth-routing.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { AuthServiceLocator } from './auth.service';

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent],
  imports: [
    IonicModule.forRoot(),
    AuthRoutingModule,
    CommonModule,
    AngularFireAuthModule
  ],
  exports: [AuthRoutingModule]

})
export class AuthModule {
  constructor(private injector: Injector) {
    AuthServiceLocator.injector = injector;
  }
}
