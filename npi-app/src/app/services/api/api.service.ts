import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private params360 = {
    1: {
      'theta': 100
    }
  }

  private pois = [
    {
      id: 1,
      type: 'AULA',
      icon: 'business',
      name: 'Aula 1.4',
      building: 'A',
      floor: '1',
      room: '4',
      capacity: 40,
      available: 15,
      schedule: {
        before: {
          start: '08:00',
          end: '10:00',
          title: 'Visión por Computador',
          description: 'Grado en Ingeniería Informática'
        },
        now: {
          start: '08:00',
          end: '10:00',
          title: 'Visión por Computador',
          description: 'Grado en Ingeniería Informática'
        },
        after: {
          start: '08:00',
          end: '10:00',
          title: 'Visión por Computador',
          description: 'Grado en Ingeniería Informática'
        }
      },
      scheduleType: 'TITLED'
    },
    {
      id: 2,
      type: 'BIBLIOTECA',
      name: 'Biblioteca',
      icon: 'book',
      building: 'D',
      floor: '-1',
      capacity: 200,
      available: 150,
      schedule: [
        {
          day: 'lunes-viernes',
          start: '08:00',
          end: '20:00',
        }
      ],
      scheduleType: 'UNTITLED'
    },
    {
      id: 3,
      type: 'DESPACHO',
      icon: 'person',
      name: 'Pablo Mesejo Santiago',
      building: 'D',
      floor: '3',
      room: '2',
      department: 'Ciencias de la Computación e Inteligencia Artificial',
      schedule: [
        {
          day: 'martes',
          start: '10:00',
          end: '13:00'
        },
        {
          day: 'miércoles',
          start: '10:00',
          end: '13:00'
        }
      ],
      scheduleType: 'UNTITLED',
      contact: {
        phone: '958248555',
        email: 'pmesejo@ugr.es'
      }
    },
    {
      id: 4,
      type: 'COMEDOR',
      icon: 'restaurant',
      name: 'Comedores Universitarios',
      building: 'D',
      floor: '-1',
      capacity: 200,
      available: 40,
      menuToday: [
        {
          name: 'Pollo con patatas',
          type: 'Primer plato',
          allergens: 'Huevo'
        }
      ]
    }
  ]

  public getPois() : any {
    return this.pois;
  }

  public getPoi(id): any {
    return this.pois.filter(poi => poi.id === id)[0];
  }

  public get360Params(poi: number): void {
    return this.params360[poi];
  }
}
