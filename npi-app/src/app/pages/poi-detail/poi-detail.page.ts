import { Component, HostListener, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { DatabaseService } from '../../services/database/database.service';

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
  private info;

  constructor(
    private modalCtrl: ModalController,
    private databaseSrv: DatabaseService,
  ) { }

  ngOnInit(): void {
    this.info = this.databaseSrv.getPoi(this.id);
  }

  public async closeModal(): Promise<void> {
    await this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}
