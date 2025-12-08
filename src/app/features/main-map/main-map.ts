import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LeafletControlLayersConfig, LeafletDirective, LeafletLayersControlDirective } from '@bluehalo/ngx-leaflet';
import { latLng, tileLayer } from 'leaflet';
import { TuiButton, tuiIconsProvider, TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'app-main-map',
  standalone: true,
  imports: [CommonModule,
    LeafletDirective,
    LeafletLayersControlDirective,
    TuiButton, TuiIcon],
  templateUrl: './main-map.html',
  styleUrl: './main-map.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainMap {
  private mapInstance?: L.Map;

  streetLayer = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  satelliteLayer = tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer">Esri</a>'
  });

  options = {
    layers: [this.streetLayer],
    zoom: 7,
    center: latLng([58, 39]),
  };

  protected readonly layersControlConfig: LeafletControlLayersConfig = {
    baseLayers: {
      //TODO const description for keys
      'Карта': this.streetLayer,
      'Спутник': this.satelliteLayer
    },
    overlays: {}
  }

  onMapReady(map: L.Map) {
    this.mapInstance = map;
    this.mapInstance.zoomControl.setPosition('bottomright')
  }

  locateUser() {
    if (!navigator.geolocation) {
      console.error('Геолокация не поддерживается браузером');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        this.mapInstance?.flyTo([latitude, longitude], 7);
      },
      (error) => {
        console.error('Ошибка геолокации:', error.message);
        // Здесь можно добавить уведомление через Taiga UI
      },
      { timeout: 10000 }
    );
  }

}