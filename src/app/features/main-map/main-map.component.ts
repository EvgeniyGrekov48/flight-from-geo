import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { LeafletDirective, LeafletLayerDirective, LeafletLayersControlDirective, LeafletLayersDirective } from '@bluehalo/ngx-leaflet';
import { TuiButton } from '@taiga-ui/core';
import { LAYERS_CONTROL_CONFIG, OPTIONS_MAP } from './main-map.const';
import { NavigatorService } from '../../core/services/navigator.service';
import { UIStore } from '../../core/stores/ui.store';
import L from 'leaflet';
import { MarkersLayerService } from './markers-layer.service';

@Component({
  selector: 'app-main-map',
  standalone: true,
  imports: [CommonModule,
    LeafletDirective,
    LeafletLayersControlDirective,
    LeafletLayersDirective,
    LeafletLayerDirective,
    TuiButton,
  ],
  providers: [MarkersLayerService],
  templateUrl: './main-map.component.html',
  styleUrl: './main-map.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainMapComponent {
  private readonly uiStore = inject(UIStore);
  private readonly navigator = inject(NavigatorService)
  private readonly markersLayerService = inject(MarkersLayerService);
  
  private mapInstance?: L.Map;

  protected readonly markersLayer = this.markersLayerService.markerLayerSignal;
  protected readonly selectLayer = this.markersLayerService.selectedLayerSignal;

  protected readonly isSidebarOpen = this.uiStore.isSidebarOpen;

  protected readonly options = OPTIONS_MAP
  protected readonly layersControlConfig = LAYERS_CONTROL_CONFIG

  constructor() {
    this.initEffectViewLocateUser()
    this.initEffectInvalidateSize()
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

  protected onMapReady(map: L.Map) {
    this.mapInstance = map;
    this.mapInstance?.invalidateSize()
    this.mapInstance.zoomControl.setPosition('bottomright')
    this.mapInstance.attributionControl.setPrefix("Leaflet")
  }

  //-------USER_ACTION-----
  protected flyToLocateUser() {
    this.navigator.updateCurrentPosition()
  }

  protected toggleSidebar() {
    this.uiStore.toggleSidebar();
  }

}