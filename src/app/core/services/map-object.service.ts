import { DestroyRef, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { MapObjectAPI } from '../types/types';
import { APIService } from './api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class MapObjectService {
  private readonly _api = inject(APIService)
  private readonly _destroyRef = inject(DestroyRef);

  private readonly _objects: WritableSignal<MapObjectAPI[]> = signal([]);

  public readonly getObjects: Signal<MapObjectAPI[]> = this._objects.asReadonly();

  public loadMapObjects(): void {
    this._api.getMapObjects()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (value) => this._objects.set(value),
        error: (error) => console.error(error),
      })
  }

}