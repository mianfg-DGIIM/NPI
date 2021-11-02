import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { DatabaseService } from '../../services/database/database.service';

import { PoiDetailPage } from '../poi-detail/poi-detail.page';

// accelerometer
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
// shake
import { Shake } from '@ionic-native/shake/ngx';
// qr
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

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
    private databaseSrv: DatabaseService,
    private deviceMotion: DeviceMotion,
    private deviceOrientation: DeviceOrientation,
    private shake: Shake,
    private qrScanner: QRScanner
  ) {}

  async ngOnInit() {
    this.searchInfo = this.databaseSrv.getPois();
    // accelerometer
    this.deviceMotion.getCurrentAcceleration().then(
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
    });    

    // accelerometer
    var shakeSubscription = this.shake.startWatch(30).subscribe(() => {
      this.shakeTrigger = !this.shakeTrigger;
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
