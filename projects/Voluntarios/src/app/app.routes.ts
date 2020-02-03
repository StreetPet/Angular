import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VoluntarioResolver } from './utils/voluntario-resolver'
import { ListaVoluntariosComponent } from './lista-voluntarios/lista-voluntarios.component';
import { AdicionaVoluntarioComponent } from './adiciona-voluntario/adiciona-voluntario.component';
import { EditaVoluntarioComponent } from './edita-voluntario/edita-voluntario.component';
import { EditaPapeisVoluntarioComponent } from './edita-papeis-voluntario/edita-papeis-voluntario.component';
import { PageNotFoundComponent } from 'projects/layout/src/lib/404/404.component';
import { ForgotPasswordComponent } from 'projects/auth/src/lib/forgot-password/forgot-password.component';
import { DashboardComponent } from 'projects/auth/src/lib/dashboard/dashboard.component';
import { SignUpComponent } from 'projects/auth/src/lib/sign-up/sign-up.component';
import { SignInComponent } from 'projects/auth/src/lib/sign-in/sign-in.component';
import { VerifyEmailComponent } from 'projects/auth/src/lib/verify-email/verify-email.component';
import { SecureInnerPagesGuard } from 'projects/auth/src/lib/secure-inner-pages.guard';
import { AuthGuard } from 'projects/auth/src/lib/auth.guard';

const routes: Routes = [
  { path: '', component: ListaVoluntariosComponent, pathMatch: 'full'},
  { path: 'home', component: ListaVoluntariosComponent },
  { path: 'list', component: ListaVoluntariosComponent },
  { path: 'add', component: AdicionaVoluntarioComponent },
  {
    path: 'details/:id', component: EditaVoluntarioComponent,
    resolve: {
      data: VoluntarioResolver
    }
  },
  {
    path: 'roles/:id', component: EditaPapeisVoluntarioComponent,
    resolve: {
      data: VoluntarioResolver
    }
  },

  { path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'register-user', component: SignUpComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'verify-email-address', component: VerifyEmailComponent, canActivate: [SecureInnerPagesGuard] },
  
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
