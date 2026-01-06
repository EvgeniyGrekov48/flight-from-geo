import { Injectable, signal } from '@angular/core';
import { LAYERS_BASE__LIST } from '../../features/main-map/main-map.const';
import { BaseLayerDescriptionModel } from '../types/types';

@Injectable({ providedIn: 'root' })
export class AppStore {
  private readonly _isSidebarOpen = signal<boolean>(false);
  private readonly _currentBaseLayer = signal<BaseLayerDescriptionModel>(LAYERS_BASE__LIST[0])

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

}