import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private _routers: RouteInfo[];

  constructor() { }

  get routers(): RouteInfo[] {
    return this._routers;
  }

  set routers(routers: RouteInfo[]){
    this._routers = routers;
  }
}

export declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}