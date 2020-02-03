import { LayoutComponent } from './layout.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component'; 
import { PageNotFoundComponent } from './404/404.component';
import { MatMenuModule, MatIconModule } from '@angular/material';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'environments/environment';
import { MenuModule, MenuComponent } from 'projects/menu/src/public-api'; 

@NgModule({
  declarations: [LayoutComponent, FooterComponent, HeaderComponent, PageNotFoundComponent, MenuComponent],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MatMenuModule,
    MatIconModule,
    MenuModule
  ],
  exports: [LayoutComponent, HeaderComponent, FooterComponent, PageNotFoundComponent]
})
export class LayoutModule { }
