import { RouterModule, Routes, LoadChildren } from '@angular/router';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { AuthService, AuthServiceLocator } from './auth.service';
import { SecureInnerPagesGuard } from './secure-inner-pages.guard';
import { AuthGuard } from './auth.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SIGN_IN_ROUTER_NAME, REGISTER_USER_ROUTER_NAME } from './auth-routing.names';
import { DASHBOARD_ROUTER_NAME, FORGOT_PASSWORD_ROUTER_NAME } from './auth-routing.names';
import { VERIFY_EMAIL_ADDRESS_ROUTER_NAME } from './auth-routing.names';
import { NgModule } from '@angular/core';
export { SIGN_IN_ROUTER_NAME, REGISTER_USER_ROUTER_NAME, DASHBOARD_ROUTER_NAME };
export { FORGOT_PASSWORD_ROUTER_NAME, VERIFY_EMAIL_ADDRESS_ROUTER_NAME };

const routes: Routes = [

   {
      path: SIGN_IN_ROUTER_NAME,
      component: SignInComponent,
      canActivate: [SecureInnerPagesGuard]
   },
   {
      path: REGISTER_USER_ROUTER_NAME,
      component: SignUpComponent,
      canActivate: [SecureInnerPagesGuard]
   },
   {
      path: DASHBOARD_ROUTER_NAME,
      loadChildren: () => {
         console.log('****** loadChildren *******')
         const comp = AuthServiceLocator.injector
            .get(AuthService).getDashboardComponent();
         console.log(comp);
         return comp;
      },
      canActivate: [AuthGuard]
   },
   {
      path: FORGOT_PASSWORD_ROUTER_NAME,
      component: ForgotPasswordComponent,
      canActivate: [SecureInnerPagesGuard]
   },
   {
      path: VERIFY_EMAIL_ADDRESS_ROUTER_NAME,
      component: VerifyEmailComponent,
      canActivate: [SecureInnerPagesGuard]
   },

];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class AuthRoutingModule { }
