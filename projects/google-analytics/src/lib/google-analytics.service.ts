import { Injectable } from '@angular/core';


(window as any).dataLayer = (window as any).dataLayer || [];
// tslint:disable-next-line:only-arrow-functions
(window as any).gtag = function () {
  (window as any).dataLayer.push(arguments);
};

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  public eventEmitter(
    eventName: string,
    eventCategory: string,
    eventAction: string,
    eventLabel: string = null,
    eventValue: number = null) {

    console.log('event');

    (window as any).gtag('event', eventName, {
      eventCategory,
      eventLabel,
      eventAction,
      eventValue
    })
  }

  loadScript(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // https://stackoverflow.com/questions/45861526/load-js-script-on-component-level-not-at-startup/45917264#45917264
      // https://stackoverflow.com/questions/44204417/dynamically-load-external-javascript-file-from-angular-component
      const body = document.body as HTMLDivElement;
      const script = document.createElement('script');
      script.innerHTML = '';
      script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
      script.async = false;
      script.defer = true;
      script.onload = () => {
        (window as any).gtag('js', new Date());
        resolve();
      };
      script.onerror = (error) => {
        reject(error);
      }
      body.appendChild(script);
    });
  }
}
