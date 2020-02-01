import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { PageNotFoundComponent } from './404/404.component';



@NgModule({
  declarations: [LayoutComponent, FooterComponent, HeaderComponent, MenuComponent, PageNotFoundComponent],
  imports: [
  ],
  exports: [LayoutComponent, HeaderComponent, FooterComponent, MenuComponent,PageNotFoundComponent]
})
export class LayoutModule { }
