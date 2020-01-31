import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';



@NgModule({
  declarations: [LayoutComponent, FooterComponent, HeaderComponent, MenuComponent],
  imports: [
  ],
  exports: [LayoutComponent, HeaderComponent, FooterComponent, MenuComponent]
})
export class LayoutModule { }