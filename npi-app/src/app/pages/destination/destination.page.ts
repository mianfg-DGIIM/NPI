import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

// accelerometer
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
// shake
import { Shake } from '@ionic-native/shake/ngx';
// qr
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-destination',
  templateUrl: 'destination.page.html',
  styleUrls: ['destination.page.scss'],
})
export class DestinationPage implements OnInit {
  constructor(
    private platform: Platform,
    private router: Router
  ) {}

  async ngOnInit() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.router.navigate(['/']);
    });
  }

  back() {
    this.router.navigate(['/']);
  }
}
