import { Injectable, signal } from '@angular/core';
import { LAYERS_BASE__LIST } from '../../features/main-map/main-map.const';
import { BaseLayerDescriptionModel } from '../types/types';

@Injectable({ providedIn: 'root' })
export class UIStore {
    public readonly SIDEBAR__TRANSITION = 1000

    private readonly _isSidebarOpen = signal<boolean>(false);
    private readonly _selectedObjectId = signal<number | null>(null);
    private readonly _currentBaseLayer = signal<BaseLayerDescriptionModel>(LAYERS_BASE__LIST[0])

    public readonly isSidebarOpen = this._isSidebarOpen.asReadonly();
    public readonly getSelectedObjectId = this._selectedObjectId.asReadonly();
    public readonly getCurrentBaseLayer = this._currentBaseLayer.asReadonly();


    public toggleSidebar(): void {
        this._isSidebarOpen.update(current => !current);
    }

    public selectObject(id: number | null): void {
        const isClicedOnSelected = this._selectedObjectId() === id
        this._selectedObjectId.set(isClicedOnSelected ? null : id);
    }

    public changeCurrentBaseLayer(id: BaseLayerDescriptionModel): void {
        this._currentBaseLayer.set(id)
    }
    
}