import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavController, Platform, ModalController } from '@ionic/angular';

import { ApiService } from '../../services/api/api.service';
import { LocalService } from '../../services/local/local.service';

import { PoiDetailPage } from '../poi-detail/poi-detail.page';
import { HelpPage } from '../help/help.page';
// shake
import { Shake } from '@ionic-native/shake/ngx';
// speech recognition
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private searchInfo = [];
  private searchShow = [];

  constructor(
    private modalCtrl: ModalController,
    private apiSrv: ApiService,
    private localSrv: LocalService,
    private shake: Shake,
    public navCtrl: NavController,
    private router: Router
  ) {}

  async ngOnInit() {
    this.searchInfo = this.apiSrv.getPois();

    // accelerometer
    var shakeSubscription = this.shake.startWatch(30).subscribe(async () => {
      if (!this.localSrv.getHelpShown()) {
        const modal = await this.modalCtrl.create({
          component: HelpPage,
          cssClass: 'modal-quarter-space',
          animated: true,
        });
        return await modal.present();
      }
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

  /**
   * Abre el Punto de Interés del número (ID) pasado como parámetro
   * @param id ID del punto de interés
   * @returns modal present (for await)
   */
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

  /**
   * Abre el asistente conversacional
   * @see ../conversation/conversation.page.ts
   */
  public openAssistant() {
    this.router.navigate(['/conversation']);
  }
}
