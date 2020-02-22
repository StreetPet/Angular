import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, NavigationError, NavigationCancel } from '@angular/router';
import { GoogleAnalyticsService } from './google-analytics.service'; 

@Component({
  selector: 'lib-google-analytics[ga]',
  // https://developers.google.com/analytics/devguides/collection/gtagjs
  template: `<!-- Global site tag (gtag.js) - Google Analytics -->`,
  styles: []
})
export class GoogleAnalyticsComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  private _id: string;

  @Input()
  public set ga(id: string) {
    this._id = id;
  }

  constructor(private service: GoogleAnalyticsService, private router: Router) {}

  ngOnInit() {
    this.service.loadScript(this._id).then(() => {
      // https://developers.google.com/analytics/devguides/collection/gtagjs/screens
      this.router.events.subscribe(event => {
        if (event instanceof NavigationError) {
          console.log('Navigation Error');
        } else if (event instanceof NavigationCancel) {
          console.log('Navigation Cancel');
        } else if (event instanceof NavigationStart) {
          console.log('Navigation Start');
        } else if (event instanceof NavigationEnd) {
          console.log('Navigation End');
          (<any> window).gtag('config', this._id,
            {
              page_path: event.urlAfterRedirects
            }
          );
        }
      });
    });
  }

}
