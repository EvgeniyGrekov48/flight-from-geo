import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NavigatorService {
  public coords = signal<GeolocationCoordinates | null>(null);
  
  getCurrentPosition(): void {
    if (!navigator.geolocation) {
      console.error('Геолокация не поддерживается');
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.coords.set(position.coords);
      },
      (error) => {
        console.error('Ошибка геолокации:', error.message);
      },
      { timeout: 10000 }
    );
  }
}
