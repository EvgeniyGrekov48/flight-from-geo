import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, linkedSignal } from '@angular/core';
import { LeafletDirective, LeafletLayerDirective } from '@bluehalo/ngx-leaflet';
import { LAYERS_BASE__LIST, OPTIONS_MAP } from './main-map.const';
import { NavigatorService } from '../../core/services/navigator.service';
import L from 'leaflet';
import { MarkersLayerService } from './markers-layer.service';
import { MapObjectService } from '../../core/services/map-object.service';
import { MapControlsPanelComponent } from "../../ui/map-controls-panel/map-controls-panel.component";
import { BaseLayerDescriptionModel } from '../../core/types/types';
import { AppStore } from '../../core/stores/app.store';

@Component({
  selector: 'app-main-map',
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
  private readonly _mapObjectService = inject(MapObjectService)
  private readonly _navigatorService = inject(NavigatorService)
  private readonly _markersLayerService = inject(MarkersLayerService);
  private readonly _appStore = inject(AppStore)

  private readonly _isLocating = linkedSignal(() => !this._navigatorService.getCoords());

  protected mapInstance?: L.Map;

  private readonly markersLayer = this._markersLayerService.markersLayer;
  protected readonly selectedMarkerLayer = this._markersLayerService.selectedMarkerLayer;

  protected readonly isSidebarOpen = this._appStore.isSidebarOpen;
  protected readonly getCurrentBaseLayer = this._appStore.getCurrentBaseLayer

  protected readonly options = OPTIONS_MAP
  protected readonly layersBaseList = LAYERS_BASE__LIST
  
  protected readonly isLocating = this._isLocating.asReadonly();

  constructor() {
    this._initeffectAddMarkersLayer()
    this._initEffectViewLocateUser()
    this._initEffectInvalidateSize()
  }

  //------INIT-------
  private _initeffectAddMarkersLayer(): void {
    effect(() => {
      const _markersLayer = this.markersLayer()
      this.mapInstance?.removeLayer(_markersLayer)
      this.mapInstance?.addLayer(_markersLayer)
    })
  }

  private _initEffectViewLocateUser(): void {
    effect(() => {
      const _coords = this._navigatorService.getCoords();
      this.mapInstance?.flyTo([_coords.latitude, _coords.longitude], this.mapInstance.getZoom());
    });
  }

  private _initEffectInvalidateSize(): void {
    effect(() => {
      const _isSidebarOpen = this.isSidebarOpen();
      setTimeout(() => this.mapInstance?.invalidateSize(), this._appStore.SIDEBAR__TRANSITION + 1)
    });
  }

  //-----MAP_EVENTS---------
  protected onMapReady(map: L.Map): void {
    this.mapInstance = map;
    this.mapInstance.attributionControl.setPrefix("Leaflet");
    this._isLocating.set(false)
    this._mapObjectService.loadMapObjects()
    this.onMapMoveEnd()
  }

  protected onMapMoveEnd(): void {
    this._appStore.setCurrentMapBounds(this.mapInstance!.getBounds())
  }

  //-------USER_ACTIONS-----
  protected toggleSidebar(): void {
    this._appStore.toggleSidebar();
  }

  protected flyToLocateUser(): void {
    this._isLocating.set(true);
    this._navigatorService.updateCurrentPosition();
  }

  //------CHILDS_ACTIONS-----
  protected onChangeLayer(newLayer: BaseLayerDescriptionModel): void {
    this.mapInstance!.removeLayer(this._appStore.getCurrentBaseLayer().layer)
    this.mapInstance!.addLayer(newLayer.layer)
    this._appStore.setCurrentBaseLayer(newLayer)
  }

}