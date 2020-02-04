import { NgModule } from '@angular/core';
import { MenuComponent } from './menu.component';
import { CommonModule, NgIf } from '@angular/common';
import { MatIcon, MatIconModule, MatMenuModule, MatGridListModule, MatGridTile } from '@angular/material';

@NgModule({
  declarations: [MenuComponent],
  imports: [
    MatMenuModule,
    CommonModule,
    MatIconModule,
    MatGridListModule
  ],
  exports: [MenuComponent]
})
export class MenuModule { }
