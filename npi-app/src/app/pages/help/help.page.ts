import { Component, HostListener, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

import { ApiService } from '../../services/api/api.service';
import { LocalService } from '../../services/local/local.service';

@Component({
  selector: 'help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HelpPage implements OnInit {
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
  }

  public async closeModal(): Promise<void> {
    await this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  public async gotoPoi(): Promise<void> {
    this.localSrv.setDestinationPoi(this.id);
    console.log("poidest:", this.localSrv.getDestinationPoi());
    this.router.navigate(['/qrscanner']);
    this.closeModal();
  }
}
