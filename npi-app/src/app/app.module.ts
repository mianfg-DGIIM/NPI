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
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { TextToSpeechAdvanced } from '@awesome-cordova-plugins/text-to-speech-advanced/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({mode: 'ios'}),
    AppRoutingModule,
    PoiDetailPageModule,
    AppRoutingModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DeviceMotion,
    DeviceOrientation,
    Shake,
    QRScanner,
    InAppBrowser,
    SpeechRecognition,
    HTTP,
    TextToSpeechAdvanced
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
