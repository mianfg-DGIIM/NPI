import { Injectable, Injector, Input } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

import { ApiService } from '../api/api.service';
import { LocalService } from '../local/local.service';


@Injectable({
  providedIn: 'root'
})
export class Show360Service {
  @Input() id: number;
  
  private url = 'https://vault.mianfg.me/npi-app-360/test';
  private options: InAppBrowserOptions = {
    clearcache: 'yes',
    cleardata: 'yes',
    clearsessioncache: 'yes',
    hideurlbar: 'yes',
    // hidespinner: 'yes',
    fullscreen: 'yes',
    toolbarposition: 'top',
    hidenavigationbuttons: 'yes',
    hardwareback: 'no',
    disallowoverscroll: 'yes',
    closebuttoncaption: 'CERRAR',
    closebuttoncolor: '#2e9e93',
    location: 'no',
    zoom: 'no',
    lefttoright: 'yes',
    presentationstyle: 'fullscreen',
    toolbar: 'no',
  };

  constructor(
    private iab: InAppBrowser,
    private apiSrv: ApiService,
    private localSrv: LocalService
  ) {}

  async show() {
    const show360Params = this.apiSrv.get360Params(this.id);
    await this.show360(show360Params)
  }

  public serializeURLSearchParams(dict: any) {
    let str = "?";
    for (const key in dict) {
      str += `${key}=${dict[key]}&`
    }
    return str.slice(0, -1);
  }

  public async show360(params: any): Promise<void> {
    const url = this.url + this.serializeURLSearchParams(params);
    const browser = this.iab.create(url, '_blank', this.options);
    browser.on('loadstart').subscribe(event => {
      if (event.url.endsWith('continue')) {
        this.localSrv.setCanScan(true);
        browser.close();
      } else if (event.url.endsWith('close')) {
        this.localSrv.setCanScan(true);
        browser.close();
      }
    });
  }
}
