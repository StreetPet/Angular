import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { MenuComponent, FooterComponent, HeaderComponent } from '../../../../dist/layout';
import { LayoutComponent } from '../../../layout/src/lib/layout.component';
import { LayoutModule } from '../../../layout/src/lib/layout.module';
import { ListaVoluntariosComponent } from './lista-voluntarios/lista-voluntarios.component';
import { MenuVoluntariosComponent } from './menu-voluntarios/menu-voluntarios.component';
import { AdicionaVoluntarioComponent } from './adiciona-voluntario/adiciona-voluntario.component';
import { EditaVoluntarioComponent } from './edita-voluntario/edita-voluntario.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaVoluntariosComponent,
    MenuVoluntariosComponent,
    AdicionaVoluntarioComponent,
    EditaVoluntarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    IonicModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
