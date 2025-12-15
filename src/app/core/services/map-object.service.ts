import { Injectable, signal } from '@angular/core';
import { EnumMapObject, MapObjectModel } from '../types/types';

@Injectable({ providedIn: 'root' })
export class MapObjectService {
  private readonly _objects = signal<MapObjectModel[]>([
    {
      id: 1,
      tittle: 'Гора Пикет',
      description: 'Отличное место для парапланеризма',
      coords: {
        lat: 44.101,
        lng: 39.023,
      },
      type: EnumMapObject.PARAGLIDING,
    },
    {
      id: 2,
      tittle: 'Красная Поляна',
      description: 'Мощные термические потоки',
      coords: {
        lat: 43.679,
        lng: 40.204,
      },
      type: EnumMapObject.THERMAL,
    },
    {
      id: 3,
      tittle: 'Аэродром Южный',
      description: 'Можно полетать с мотором',
      coords: {
        lat: 57.9975,
        lng: 38.836,
      },
      type: EnumMapObject.USER,
    },
    {
      id: 4,
      tittle: 'Аэродром Староселье',
      description: 'Заброшенный аэродром',
      coords: {
        lat: 58.1,
        lng: 38.92,
      },
      type: EnumMapObject.USER,
    },
    {
      id: 5,
      tittle: 'Забава',
      description: 'Лучшее место в области для термических полетов на склоне',
      coords: {
        lat: 58.034,
        lng: 38.96,
      },
      type: EnumMapObject.PARAGLIDING,
    },
  ]);

  public readonly getObjects = this._objects.asReadonly();

  public addObject(object: Omit<MapObjectModel, "id">): void {
    const newObject: MapObjectModel = { ...object, id: Date.now() };
    this._objects.update(current => [...current, newObject]);
  }

  public updateObject(updatedObject: MapObjectModel): void {
    this._objects.update(current =>
      current.map(obj => obj.id === updatedObject.id ? updatedObject : obj)
    );
  }

  public deleteObject(id: number): void {
    this._objects.update(current => current.filter(obj => obj.id !== id));
  }
}