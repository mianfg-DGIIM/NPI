import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// sensors
import { DeviceMotion } from '@ionic-native/device-motion/ngx';
import { DeviceOrientation } from '@ionic-native/device-orientation/ngx';
import { Shake } from '@ionic-native/shake/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DeviceMotion,
    DeviceOrientation,
    Shake
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
