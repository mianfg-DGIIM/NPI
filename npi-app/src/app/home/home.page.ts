import { Component, OnInit } from '@angular/core';

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

  constructor(
    private deviceMotion: DeviceMotion,
    private deviceOrientation: DeviceOrientation,
    private shake: Shake,
    private qrScanner: QRScanner
  ) {}

  async ngOnInit() {
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

}
