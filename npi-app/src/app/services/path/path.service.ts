import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PathService {
  

  public get360Directions(currentPoi: any, destinationPoi: any) {
    if (currentPoi.id === 1) {
      return {
        description: 'Dirígete hacia la planta 0 del edificio.',
        x: 1
        
      }
    }
  }
}
