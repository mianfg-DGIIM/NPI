import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PoiDetailPageModule } from './pages/poi-detail/poi-detail.module';
// sensors
import { DeviceMotion } from '@ionic-native/device-motion/ngx';
import { DeviceOrientation } from '@ionic-native/device-orientation/ngx';
import { Shake } from '@ionic-native/shake/ngx';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot({
    mode: 'ios'
  }), AppRoutingModule,
    PoiDetailPageModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DeviceMotion,
    DeviceOrientation,
    Shake,
    QRScanner,
    InAppBrowser
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
