import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular'; 
import { LayoutModule } from 'projects/layout/src/lib/layout.module';
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
import { EditaPapeisVoluntarioComponent } from './edita-papeis-voluntario/edita-papeis-voluntario.component';
import { VoluntarioResolver } from './utils/voluntario-resolver';
import { ConfirmaRemocaoComponent } from './confirma-remocao/confirma-remocao.component';
import { AuthModule } from 'projects/auth/src/public-api';
import { CommonModule } from '@angular/common';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthRoutingModule } from 'projects/auth/src/lib/auth-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ListaVoluntariosComponent,
    MenuVoluntariosComponent,
    AdicionaVoluntarioComponent,
    EditaVoluntarioComponent,
    AvatarDialogComponent,
    EditaPapeisVoluntarioComponent,
    ConfirmaRemocaoComponent
  ],
  entryComponents: [AvatarDialogComponent, ConfirmaRemocaoComponent],
  imports: [
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
    AuthRoutingModule
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
export class AppModule { }
