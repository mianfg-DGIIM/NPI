import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'qrscanner',
    loadChildren: () => import('./pages/qrscanner/qrscanner.module').then( m => m.QRScannerPageModule)
  },
  {
    path: 'destination',
    loadChildren: () => import('./pages/destination/destination.module').then( m => m.DestinationPageModule)
  },
  {
    path: 'conversation',
    loadChildren: () => import('./pages/conversation/conversation.module').then( m => m.ConversationPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
