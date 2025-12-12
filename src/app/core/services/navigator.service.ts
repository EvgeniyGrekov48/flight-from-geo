import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NavigatorService {
  private readonly _coords = signal<GeolocationCoordinates>({latitude: 0, longitude: 0} as GeolocationCoordinates);
  public readonly getCoords = this._coords.asReadonly()

  public updateCurrentPosition(): void {
    if (!navigator.geolocation) {
      console.error('Геолокация не поддерживается');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this._coords.set(position.coords);
      },
      (error) => {
        console.error('Ошибка геолокации:', error.message);
      },
      { timeout: 10000 }
    );
  }
}
