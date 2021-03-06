import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DestinationPage } from './destination.page';

const routes: Routes = [
  {
    path: '',
    component: DestinationPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DestinationPageRoutingModule {}
