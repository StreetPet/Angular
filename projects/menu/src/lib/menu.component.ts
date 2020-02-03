import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  get logged(): boolean {
    return false;
  }

  public login(): Promise<void> {
    console.log("Clicadono Login");
    return Promise.resolve();
  }

  public logout(): Promise<void> {
    console.log("Clicadono Logout");
    return Promise.resolve();
  }
}
