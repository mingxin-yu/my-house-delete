import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Furniture } from './furniture';

@Injectable({
  providedIn: 'root'
})

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const furnitures = [
      { id: 1, name: 'Television' },
      { id: 2, name: 'Desk' },
      { id: 3, name: 'Chair' },
      { id: 4, name: 'Sofa' },
      { id: 5, name: 'Television Table' }
    ];
    return {furnitures};
  }

  // Overrides the genId method to ensure that a furniture always has an id.
  // If the furnitures array is empty,
  // the method below returns the initial number (11).
  // if the furnitures array is not empty, the method below returns the highest
  // furniture id + 1.
  genId(furnitures: Furniture[]): number {
    return furnitures.length > 0 ? Math.max(...furnitures.map(furniture => furniture.id)) + 1 : 11;
  }
}
