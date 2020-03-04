import { Directive, OnInit, OnDestroy, OnChanges, SimpleChanges, } from '@angular/core';
import { AfterContentInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import { AfterContentChecked } from '@angular/core';
import { AppMessagesService } from 'projects/app-messages/src';

// tslint:disable-next-line: directive-selector
@Directive({ selector: '[mySpy]' })
export class SpyDirective implements OnInit, OnDestroy, OnChanges, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit {

   private nextId = 0;

   constructor(private logger: AppMessagesService) { }

   ngOnInit() { this.logIt(`onInit`); }

   ngOnDestroy() { this.logIt(`onDestroy`); }

   ngAfterContentChecked(): void {
      this.logIt('ngAfterContentChecked');
   }
   ngAfterContentInit(): void {
      this.logIt("ngAfterContentInit");
   }
   ngAfterViewChecked(): void {
      this.logIt("ngAfterViewChecked");
   }
   ngAfterViewInit(): void {
      this.logIt("ngAfterViewInit");
   }
   ngOnChanges(changes: SimpleChanges): void {
      this.logIt(`ngOnChange ${JSON.stringify(changes)}`);
   }
   private logIt(msg: string) {
      this.logger.log(`Spy #${this.nextId++} ${msg}`);
   }
}