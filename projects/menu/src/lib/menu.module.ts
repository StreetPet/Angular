import { NgModule } from '@angular/core';
import { MenuComponent } from './menu.component';
import { CommonModule, NgIf } from '@angular/common';
import { MatIcon, MatIconModule, MatMenuModule } from '@angular/material';

@NgModule({
  declarations: [MenuComponent],
  imports: [
    MatMenuModule,
    CommonModule,
    MatIconModule
  ],
  exports: [MenuComponent]
})
export class MenuModule { }
