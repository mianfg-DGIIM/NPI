import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PoiDetailPageRoutingModule } from './poi-detail-routing.module';

import { PoiDetailPage } from './poi-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PoiDetailPageRoutingModule
  ],
  declarations: [PoiDetailPage]
})
export class PoiDetailPageModule {}
