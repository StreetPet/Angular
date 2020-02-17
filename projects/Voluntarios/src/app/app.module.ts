import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ActivatedRouteSnapshot, RouterStateSnapshot, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular'; 
import { LayoutModule } from 'projects/layout/src/lib/layout.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaVoluntariosComponent } from './lista-voluntarios/lista-voluntarios.component';
import { MenuVoluntariosComponent } from './menu-voluntarios/menu-voluntarios.component';
import { AdicionaVoluntarioComponent } from './adiciona-voluntario/adiciona-voluntario.component';
import { EditaVoluntarioComponent } from './edita-voluntario/edita-voluntario.component';
import { AvatarDialogComponent } from './avatar-dialog/avatar-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { MatButtonModule, MatInputModule, MatSliderModule, MatDialogModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'environments/environment';
import { VoluntarioResolver } from './utils/voluntario-resolver';
import { ConfirmaRemocaoComponent } from './confirma-remocao/confirma-remocao.component';
import { AuthModule, AuthService } from 'projects/auth/src/public-api';
import { AuthRoutingModule } from 'projects/auth/src/lib/auth-routing.module';
import { GoogleAnalyticsComponent, GoogleAnalyticsModule } from 'projects/google-analytics/src/public-api';

@NgModule({
  declarations: [
    AppComponent,
    ListaVoluntariosComponent,
    MenuVoluntariosComponent,
    AdicionaVoluntarioComponent,
    EditaVoluntarioComponent,
    AvatarDialogComponent,
    ConfirmaRemocaoComponent
  ],
  entryComponents: [AvatarDialogComponent, ConfirmaRemocaoComponent],
  imports: [
    RouterModule,
    CommonModule,
    BrowserModule,
    LayoutModule,
    IonicModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatSliderModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AuthModule,
    AppRoutingModule,
    AuthRoutingModule,
    GoogleAnalyticsModule
  ],
  providers: [
    VoluntarioResolver,
    {
      provide: 'externalUrlRedirectResolver',
      useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
      {
          window.location.href = (route.data as any).externalUrl;
      }
    }
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {
  constructor(private authService: AuthService){
    this.authService.setDashboardModuleLoader(()=>import('./dashboard-voluntario/dashboard-voluntario.module').then(m=>m.DashboardVoluntarioModule));
  }
 }
