import { Component, HostListener, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

import { ApiService } from '../../services/api/api.service';
import { LocalService } from '../../services/local/local.service';

@Component({
  selector: 'poi-detail',
  templateUrl: './poi-detail.page.html',
  styleUrls: ['./poi-detail.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PoiDetailPage implements OnInit {
  @HostListener('document:click', ['$event.target'])
  async onClickOutside(el: EventTarget): Promise<void> {
    if ((Object.keys(el).some(key => el[key] === 'ION-MODAL'))) {
      await this.closeModal();
    }
  }

  @Input() id: number;
  @Input() show: boolean = true;
  private info;

  constructor(
    private modalCtrl: ModalController,
    private apiSrv: ApiService,
    private localSrv: LocalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.info = this.apiSrv.getPoi(this.id);
    console.log(this.info)
  }

  public async closeModal(): Promise<void> {
    await this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  public async gotoPoi(): Promise<void> {
    this.localSrv.setDestinationPoi(this.id);
    this.localSrv.setCanScan(true);
    this.router.navigate(['/qrscanner']);
    this.closeModal();
  }
}
