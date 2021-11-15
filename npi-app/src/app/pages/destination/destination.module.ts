import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DestinationPage } from './destination.page';

import { DestinationPageRoutingModule } from './destination-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DestinationPageRoutingModule
  ],
  declarations: [DestinationPage]
})
export class DestinationPageModule {}
