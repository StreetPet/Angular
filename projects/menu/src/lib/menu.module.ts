import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MatIcon, MatIconModule, MatMenuModule, MatGridListModule, MatGridTile } from '@angular/material';

@NgModule({
  declarations: [MenuComponent],
  imports: [
    RouterModule,
    MatMenuModule,
    CommonModule,
    MatIconModule,
    MatGridListModule
  ],
  exports: [MenuComponent]
})
export class MenuModule { }
