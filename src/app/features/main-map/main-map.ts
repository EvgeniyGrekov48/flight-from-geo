import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LeafletDirective, LeafletLayersControlDirective } from '@bluehalo/ngx-leaflet';
import { TuiButton } from '@taiga-ui/core';
import { LAYERS_CONTROL_CONFIG, OPTIONS_MAP } from './constants';

@Component({
  selector: 'app-main-map',
  standalone: true,
  imports: [CommonModule,
    LeafletDirective,
    LeafletLayersControlDirective,
    TuiButton
  ],
  templateUrl: './main-map.html',
  styleUrl: './main-map.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainMap {
  private mapInstance?: L.Map;
  protected readonly options = OPTIONS_MAP
  protected readonly layersControlConfig = LAYERS_CONTROL_CONFIG

  onMapReady(map: L.Map) {
    this.mapInstance = map;
    this.mapInstance.zoomControl.setPosition('bottomright')
    this.mapInstance.attributionControl.setPrefix("Leaflet")
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