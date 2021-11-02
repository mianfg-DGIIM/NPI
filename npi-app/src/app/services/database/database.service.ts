import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private pois = [
    /**
     * Types: PROFESOR, COMEDOR, BIBLIOTECA
     */
    {
      'id': 1,
      'name': 'Nicolás Marín Ruiz',
      'type': 'PROFESOR',
      'icon': 'person',
      'building': '2',
      'floor': '1'
    },
    {
      'id': 2,
      'name': 'Servicio de Comedores Universitarios',
      'type': 'COMEDOR',
      'icon': 'restaurant',
      'building': '2',
      'floor': '1'
    },
    {
      'id': 3,
      'name': 'Biblioteca Universitaria',
      'type': 'BIBLIOTECA',
      'icon': 'book',
      'building': '2',
      'floor': '1'
    }
  ];

  public getPois() : any {
    return this.pois;
  }

  public getPoi(id) : any {
    return this.pois.filter(poi => poi.id === id)[0];
  }
}
