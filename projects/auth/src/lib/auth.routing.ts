import { RouterModule, Routes } from '@angular/router';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { AuthService } from './auth.service';
import { SecureInnerPagesGuard } from './secure-inner-pages.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NgModule } from '@angular/core';

const routes: Routes = [

   { path: AuthService.SIGN_IN_ROUTER_NAME, component: SignInComponent, canActivate: [SecureInnerPagesGuard] },
   { path: AuthService.REGISTER_USER_ROUTER_NAME, component: SignUpComponent, canActivate: [SecureInnerPagesGuard] },
   { path: AuthService.DASHBOARD_ROUTER_NAME, component: DashboardComponent, canActivate: [AuthGuard] },
   { path: AuthService.FORGOT_PASSWORD_ROUTER_NAME, component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard] },
   { path: AuthService.VERIFY_EMAIL_ADDRESS_ROUTER_NAME, component: VerifyEmailComponent, canActivate: [SecureInnerPagesGuard] },

];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class AuthRoutingModule { }
