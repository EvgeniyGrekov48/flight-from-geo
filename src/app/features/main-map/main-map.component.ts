import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { LeafletDirective, LeafletLayersControlDirective } from '@bluehalo/ngx-leaflet';
import { TuiButton } from '@taiga-ui/core';
import { LAYERS_CONTROL_CONFIG, OPTIONS_MAP } from './main-map.const';
import { NavigatorService } from '../../core/services/navigator.service';
import { UIStore } from '../../core/stores/ui.store';
import L from 'leaflet';
import { MapObjectService } from '../../core/services/map-object.service';
import { MapObjectModel } from '../../core/types/types';

@Component({
  selector: 'app-main-map',
  standalone: true,
  imports: [CommonModule,
    LeafletDirective,
    LeafletLayersControlDirective,
    TuiButton,
  ],
  templateUrl: './main-map.component.html',
  styleUrl: './main-map.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainMapComponent {
  private readonly mapObjectService = inject(MapObjectService);
  private readonly uiStore = inject(UIStore);
  private readonly navigator = inject(NavigatorService)
  private mapInstance?: L.Map;
  private readonly markersLayer = L.layerGroup();

  //state
  protected readonly isSidebarOpen = this.uiStore.isSidebarOpen;

  //constants
  protected readonly options = OPTIONS_MAP
  protected readonly layersControlConfig = LAYERS_CONTROL_CONFIG

  constructor() {
    this.initEffectViewLocateUser()
    this.initEffectInvalidateSize()
    this.initUpdateMarkers()
  }

  //------INIT-------
  private initEffectViewLocateUser(): void {
    effect(() => {
      const _coords = this.navigator.getCoords();
      this.mapInstance?.flyTo([_coords.latitude, _coords.longitude], this.mapInstance.getZoom());
    });
  }

  private initEffectInvalidateSize(): void {
    effect(() => {
      const _obs = this.isSidebarOpen();
      setTimeout(() => this.mapInstance?.invalidateSize(), this.uiStore.SIDEBAR__TRANSITION + 1)
    });
  }

  private initUpdateMarkers(): void {
    effect(() => {
      this.updateMarkers(this.mapObjectService.getObjects());
    });
  }

  protected onMapReady(map: L.Map) {
    this.mapInstance = map;
    this.mapInstance?.invalidateSize()
    this.mapInstance.zoomControl.setPosition('bottomright')
    this.mapInstance.attributionControl.setPrefix("Leaflet")

    this.markersLayer.addTo(map);
  }

  private updateMarkers(objects: MapObjectModel[]) {
    this.markersLayer.clearLayers();

    objects.forEach(obj => {
      const marker = L.marker([obj.coords.lat, obj.coords.lng])
        .bindPopup(`<b>${obj.tittle}</b><br>${obj.description}`)
        .on('click', () => this.uiStore.selectObject(obj.id));

      marker.addTo(this.markersLayer);
    });
  }

  //-------USER_ACTION-----
  protected flyToLocateUser() {
    this.navigator.updateCurrentPosition()
  }

  protected toggleSidebar() {
    this.uiStore.toggleSidebar();
  }

}