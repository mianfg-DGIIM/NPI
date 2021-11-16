import { Component, ViewEncapsulation } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Platform } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';

import { Show360Service } from '../../services/show-360/show-360.service';
import { ApiService } from '../../services/api/api.service';
import { LocalService } from '../../services/local/local.service';

import { DestinationPage } from '../destination/destination.page';

@Component({
  selector: 'app-qrscanner',
  templateUrl: './qrscanner.page.html',
  styleUrls: ['./qrscanner.page.scss'],
})
export class QRScannerPage {
  isOn = false;
  scannerSub;

  isLightOn = false;
  camera = 0;

  public info: any;

  constructor(
    public alertController: AlertController,
    private modalCtrl: ModalController,
    private qrScanner: QRScanner,
    private show360Srv: Show360Service,
    private apiSrv: ApiService,
    private localSrv: LocalService,
    private platform: Platform,
    private router: Router
  ) { }

  async ngOnInit() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.router.navigate(['/']);
    });
    this.info = this.apiSrv.getPoi(this.localSrv.getDestinationPoi());
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.info = this.apiSrv.getPoi(this.localSrv.getDestinationPoi());
      }
    });
  }

  /**
   * ionic life cycle
   */
  ionViewWillEnter() {
    this.startScanner();
  }

  /**
   * ionic life cycle
   */
  ionViewWillLeave() {
    this.stopScanner();
    this.destroyScanner();
  }


  startScanner() {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          this.isOn = true;

          /* start scanning */
          this.scannerSub = this.qrScanner.scan().subscribe((data: any) => {
            this.doScan(data).then(() => {
              this.startScanner();
            });
          });

          this.qrScanner.show().then();
        } else if (status.denied) {
          // camera permission was permanently denied
          this.presentAlertConfirm().then();
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => {
        console.error('Error is', e);

        if (e.code === 1) {
          this.presentAlertConfirm().then();
        } else {
          // eslint-disable-next-line no-underscore-dangle
          this.presentAlert('Alert', e.name, e._message).then();
        }
      });
  }

  stopScanner() {
    this.isOn = false;
    this.qrScanner.hide().then();
    this.scannerSub.unsubscribe();
  }

  destroyScanner() {
    this.qrScanner.destroy().then();
  }

  reverseCamera() {
    this.camera = (this.camera === 0) ? 1 : 0;
    this.qrScanner.useCamera(this.camera).then();
  }

  enableLight() {
    this.isLightOn = true;
    this.qrScanner.enableLight().then();
  }

  disableLight() {
    this.isLightOn = false;
    this.qrScanner.disableLight().then();
  }

  openSettings() {
    /* go to phone settings */
    this.qrScanner.openSettings();
  }

  async doScan(data: any) {
    console.log("scanning, can:", this.localSrv.getCanScan())
    if (data.match('^NPI-APP-POI: [0-9]*$') && this.localSrv.getCanScan()) {
      const location = parseInt(data.substring(13, data.length), 10);
      this.localSrv.setCanScan(false);
      if (location === this.localSrv.getDestinationPoi()) {
        this.router.navigate(['/destination']);
      } else {
        this.show360Srv.show(location);
      }
    }
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Permission',
      message: 'Make sure you enable camera access in your settings in order to use QR Code scanner',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Go To Settings',
          handler: () => {
            this.openSettings();
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlert(header, subHeader, message) {
    const alert = await this.alertController.create({
      header,
      subHeader,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  public back() {
    this.router.navigate(['/']);
  }
}
