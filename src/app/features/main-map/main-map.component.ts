import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, linkedSignal, signal } from '@angular/core';
import { LeafletDirective, LeafletLayerDirective } from '@bluehalo/ngx-leaflet';
import { OPTIONS_MAP, SATELITE_LAYER, STREET_LAYER } from './main-map.const';
import { NavigatorService } from '../../core/services/navigator.service';
import { UIStore } from '../../core/stores/ui.store';
import L from 'leaflet';
import { MarkersLayerService } from './markers-layer.service';
import { MapObjectService } from '../../core/services/map-object.service';
import { MapControlsPanelComponent } from "../../ui/map-controls-panel/map-controls-panel.component";

@Component({
  selector: 'app-main-map',
  standalone: true,
  imports: [
    CommonModule,
    LeafletDirective,
    LeafletLayerDirective,
    MapControlsPanelComponent
  ],
  providers: [MarkersLayerService],
  templateUrl: './main-map.component.html',
  styleUrl: './main-map.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainMapComponent {
  private readonly uiStore = inject(UIStore);
  private readonly mapOvjectService = inject(MapObjectService)
  private readonly navigatorService = inject(NavigatorService)
  private readonly markersLayerService = inject(MarkersLayerService);

  protected mapInstance?: L.Map;

  private readonly markersLayer = this.markersLayerService.markersLayer;
  protected readonly selectedLayer = this.markersLayerService.selectedLayer;

  protected readonly isSidebarOpen = this.uiStore.isSidebarOpen;

  protected readonly options = OPTIONS_MAP

  private _isLocating = linkedSignal(() => !this.navigatorService.getCoords());
  protected readonly isLocating = this._isLocating.asReadonly();

  constructor() {
    this.initeffectAddMarkersLayer()
    this.initEffectViewLocateUser()
    this.initEffectInvalidateSize()
  }

  //------INIT-------
  private initeffectAddMarkersLayer(): void {
    effect(() => {
      const _markersLayer = this.markersLayer()
      this.mapInstance?.removeLayer(_markersLayer)
      this.mapInstance?.addLayer(_markersLayer)
    })
  }

  private initEffectViewLocateUser(): void {
    effect(() => {
      const _coords = this.navigatorService.getCoords();
      this.mapInstance?.flyTo([_coords.latitude, _coords.longitude], this.mapInstance.getZoom());
    });
  }

  private initEffectInvalidateSize(): void {
    effect(() => {
      const _isSidebarOpen = this.isSidebarOpen();
      setTimeout(() => this.mapInstance?.invalidateSize(), this.uiStore.SIDEBAR__TRANSITION + 1)
    });
  }

  protected onMapReady(map: L.Map): void {
    this.mapInstance = map;
    this.mapInstance.attributionControl.setPrefix("Leaflet");
    this._isLocating.set(false)
    this.mapOvjectService.loadMapObjects()
  }

  //-------USER_ACTIONS-----
  protected toggleSidebar(): void {
    this.uiStore.toggleSidebar();
  }

  protected flyToLocateUser(): void {
    this._isLocating.set(true);
    this.navigatorService.updateCurrentPosition();
  }

  //------CHILDS_ACTIONS-----
  onSelectLayer(): void {
    this.mapInstance?.removeLayer(STREET_LAYER)
    this.mapInstance?.addLayer(SATELITE_LAYER)
  }

}