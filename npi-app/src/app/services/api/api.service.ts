import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
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
          start: '10:00',
          end: '13:00',
          title: 'Nuevos Paradigmas de Interacción',
          description: 'Grado en Ingeniería Informática'
        },
        after: {
          start: '13:00',
          end: '15:00',
          title: 'Procesadores de Lenguajes',
          description: 'Grado en Ingeniería Informática'
        }
      },
      scheduleType: 'TITLED',
      image: 'https://etsiit.ugr.es/sites/centros/etsiit/public/gallery/contenido_atemporal/aula-1-etsiit_atemporal.jpg'
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
    },
    {
      id: 5,
      type: 'SECRETARÍA',
      icon: 'briefcase',
      name: 'Secretaría',
      building: 'D',
      floor: '0',
      schedule: [
        {
          day: 'lunes-viernes',
          start: '80:30',
          end: '14:00'
        },
        {
          day: 'lunes-jueves',
          start: '16:00',
          end: '20:00'
        }
      ]
    }
  ]

  private directions = {
    10: {
      // puerta aula
      description: 'Dirígete hacia la planta 0 del edificio',
      positionRadius: 50,
      positionTheta: 95,
      positionPhi: -30,
      rotationX: -80,
      rotationY: 80,
      rotationZ: 90,
      scaleX: 2,
      scaleY: 2,
      image: 'https://vault.mianfg.me/npi-app-360/images/360-10.jpg'
    },
    11: {
      // escaleras planta 2
      description: 'Dirígete hacia la planta 0 del edificio',
      positionRadius: 50,
      positionTheta: 120,
      positionPhi: -30,
      rotationX: -100,
      rotationY: 60,
      rotationZ: 90,
      scaleX: 3,
      scaleY: 3,
      image: 'https://vault.mianfg.me/npi-app-360/images/360-11.jpg'
    },
    12: {
      // escaleras planta 1
      description: 'Dirígete hacia la planta 0 del edificio',
      positionRadius: 50,
      positionTheta: 180,
      positionPhi: -30,
      rotationX: -100,
      rotationY: 0,
      rotationZ: 80,
      scaleX: 3,
      scaleY: 3,
      image: 'https://vault.mianfg.me/npi-app-360/images/360-12.jpg'
    },
    13: {
      // escaleras planta 0
      description: 'Sal del edificio A (aulas) y entra en el edificio D (despachos)',
      positionRadius: 50,
      positionTheta: -20,
      positionPhi: -30,
      rotationX: -100,
      rotationY: 180,
      rotationZ: 80,
      scaleX: 3,
      scaleY: 3,
      image: 'https://vault.mianfg.me/npi-app-360/images/360-13.jpg'
    },
    14: {
      // conserjería
      description: 'Sal del edificio A (aulas) y entra en el edificio D (despachos)',
      positionRadius: 50,
      positionTheta: -45,
      positionPhi: -35,
      rotationX: -80,
      rotationY: 220,
      rotationZ: 75,
      scaleX: 2,
      scaleY: 2,
      image: 'https://vault.mianfg.me/npi-app-360/images/360-14.jpg'
    },
    15: {
      // puerta calle
      description: 'Entra en el edificio D (despachos)',
      positionRadius: 50,
      positionTheta: -25,
      positionPhi: -35,
      rotationX: -80,
      rotationY: 180,
      rotationZ: 75,
      scaleX: 2,
      scaleY: 2,
      image: 'https://vault.mianfg.me/npi-app-360/images/360-15.jpg'
    },
    16: {
      // hall edificio
      description: 'Sigue recto',
      positionRadius: 50,
      positionTheta: -100,
      positionPhi: -30,
      rotationX: -100,
      rotationY: -80,
      rotationZ: 80,
      scaleX: 3,
      scaleY: 3,
      image: 'https://vault.mianfg.me/npi-app-360/images/360-16.jpg'
    },
    /*17: {
      // destino
      // no necesario
    },*/
  }

  public getPois() : any {
    return this.pois;
  }

  public getPoi(id): any {
    return this.pois.filter(poi => poi.id === id)[0];
  }

  public get360Params(currentPoi: any, destinationPoi: any) {
    return this.directions[currentPoi];
  }
}
