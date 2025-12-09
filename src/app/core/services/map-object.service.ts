import { Injectable, signal } from '@angular/core';
import { EnumMapObject, MapObject } from '../types/types';

@Injectable({ providedIn: 'root' })
export class MapObjectService {
  // Все данные в сигналах
  private _objects = signal<MapObject[]>([
    {
      id: '1',
      name: 'Гора Пикет',
      description: 'Отличное место для парапланеризма',
      lat: 44.101,
      lng: 39.023,
      type: EnumMapObject.PARAGLIDING,
      createdAt: "2024-01-15T10:30:00Z",
    },
    {
      id: '2',
      name: 'Красная Поляна',
      description: 'Мощные термические потоки',
      lat: 43.679,
      lng: 40.204,
      type: EnumMapObject.THERMAL,
      createdAt: "2024-05-24T10:30:00Z",
    }
  ]);

  // Только для чтения (публичный интерфейс)
  readonly objects = this._objects.asReadonly();

  addObject(object: Omit<MapObject, 'id'>) {
    const newObject: MapObject = {
      ...object,
      id: Date.now().toString()
    };
    
    this._objects.update(current => [...current, newObject]);
    return newObject;
  }

  updateObject(updatedObject: MapObject) {
    this._objects.update(current => 
      current.map(obj => obj.id === updatedObject.id ? updatedObject : obj)
    );
  }

  deleteObject(id: string) {
    this._objects.update(current => current.filter(obj => obj.id !== id));
  }
}