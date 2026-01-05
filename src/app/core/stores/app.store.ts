import { Injectable, signal } from '@angular/core';
import { LAYERS_BASE__LIST } from '../../features/main-map/main-map.const';
import { BaseLayerDescriptionModel } from '../types/types';
import { LatLngBounds } from 'leaflet';

@Injectable({ providedIn: 'root' })
export class AppStore {
  private readonly _isSidebarOpen = signal<boolean>(false);
  private readonly _currentBaseLayer = signal<BaseLayerDescriptionModel>(LAYERS_BASE__LIST[0])
  private readonly _currentMapBounds = signal<LatLngBounds | null>(null)

  //---------SIDEBAR----------
  public readonly SIDEBAR__TRANSITION = 1000

  public readonly isSidebarOpen = this._isSidebarOpen.asReadonly();

  public toggleSidebar(): void {
    this._isSidebarOpen.update(current => !current);
  }

  //---------BASE_LAYER----------
  public readonly getCurrentBaseLayer = this._currentBaseLayer.asReadonly();

  public setCurrentBaseLayer(layer: BaseLayerDescriptionModel): void {
    this._currentBaseLayer.set(layer)
  }

  //---------MAP_BOUNDS----------
  public readonly getCurrentMapBounds = this._currentMapBounds.asReadonly();

  public setCurrentMapBounds(bounds: LatLngBounds | null): void {
    this._currentMapBounds.set(bounds)
  }

}