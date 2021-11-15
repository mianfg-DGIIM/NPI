import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ApiService } from '../../services/api/api.service';

import { PoiDetailPage } from '../poi-detail/poi-detail.page';
import { HelpPage } from '../help/help.page';

// accelerometer
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
// shake
import { Shake } from '@ionic-native/shake/ngx';
// qr
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private deviceMotionData : any;
  private deviceOrientationData : any;
  private shakeTrigger : boolean = true;

  private searchInfo = [];
  private searchShow = [];

  constructor(
    private modalCtrl: ModalController,
    private apiSrv: ApiService,
    private deviceMotion: DeviceMotion,
    private deviceOrientation: DeviceOrientation,
    private shake: Shake,
    private iab: InAppBrowser
  ) {}

  async ngOnInit() {
    this.searchInfo = this.apiSrv.getPois();
    // accelerometer
    /*this.deviceMotion.getCurrentAcceleration().then(
      (acceleration: DeviceMotionAccelerationData) => console.log(acceleration),
      (error: any) => console.log(error)
    );
    var deviceMotionSubscription = this.deviceMotion.watchAcceleration({frequency: 200}).subscribe((data: DeviceMotionAccelerationData) => {
      this.deviceMotionData = data;
      console.log(this.deviceMotionData)
    });
    // accelerationSubscription.unsubscribe();

    this.deviceOrientation.getCurrentHeading().then(
      (data: DeviceOrientationCompassHeading) => console.log(data),
      (error: any) => console.log(error)
    );
    var deviceOrientationSubscription = this.deviceOrientation.watchHeading().subscribe((data: DeviceOrientationCompassHeading) => {
      this.deviceOrientationData = data;
      console.log(this.deviceOrientationData);
    });*/

    // accelerometer
    var shakeSubscription = this.shake.startWatch(30).subscribe(async () => {
      const modal = await this.modalCtrl.create({
        component: HelpPage,
        cssClass: 'modal-quarter-space',
        animated: true,
      });
      return await modal.present();
    });
  }

  public search(query: string): void {
    this.searchShow = [];

    for (const searchItem of this.searchInfo) {
      const searchItemNormalized = searchItem.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
      const queryNormalized = query.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

      if (searchItemNormalized.includes(queryNormalized) && queryNormalized !== '') {
        this.searchShow.push(searchItem); 
      }
    }
  }

  public async openPoi(id: number): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: PoiDetailPage,
      cssClass: 'modal-half-space',
      animated: true,
      componentProps: {
        'id': id
      }
    });
    return await modal.present();
  }
}
