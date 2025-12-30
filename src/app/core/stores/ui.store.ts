import { computed, inject, Injectable, signal } from '@angular/core';
import { LAYERS_BASE__LIST } from '../../features/main-map/main-map.const';
import { BaseLayerDescriptionModel, MapObjectAPI } from '../types/types';
import { LatLng, LatLngBounds } from 'leaflet';
import { MapObjectService } from '../services/map-object.service';

@Injectable({ providedIn: 'root' })
export class UIStore {
    private readonly _mapOvjectService = inject(MapObjectService)

    private readonly _isSidebarOpen = signal<boolean>(false);
    private readonly _selectedObjectId = signal<number | null>(null);
    private readonly _currentBaseLayer = signal<BaseLayerDescriptionModel>(LAYERS_BASE__LIST[0])
    private readonly _currentMapBounds = signal<LatLngBounds | null>(null)

    //---------SIDEBAR----------
    public readonly SIDEBAR__TRANSITION = 1000

    public readonly isSidebarOpen = this._isSidebarOpen.asReadonly();

    public toggleSidebar(): void {
        this._isSidebarOpen.update(current => !current);
    }

    //---------SELECTED_OBJECT----------
    public readonly getSelectedObjectId = this._selectedObjectId.asReadonly();

    public updateSelectedObject(id: number | null): void {
        const isClicedOnSelected = this._selectedObjectId() === id
        this._selectedObjectId.set(isClicedOnSelected ? null : id);
    }

    //---------CURRENT_BASE_LAYER----------
    public readonly getCurrentBaseLayer = this._currentBaseLayer.asReadonly();

    public updateCurrentBaseLayer(id: BaseLayerDescriptionModel): void {
        this._currentBaseLayer.set(id)
    }

    //---------OBJECTS_IN_VIEW_PORT----------
    public readonly getObjectsInViewPort = computed<MapObjectAPI[]>(() => {
        const objectsList = this._mapOvjectService.getObjects()
        const bounds = this._currentMapBounds()
        return bounds ? this.filterObjectsListInViewPort(objectsList, bounds) : objectsList
    })

    public updateCurrentMapBounds(bounds: LatLngBounds): void {
        this._currentMapBounds.set(bounds)
    }
    
    private filterObjectsListInViewPort(objectsList: MapObjectAPI[], bounds: LatLngBounds): MapObjectAPI[] {
        return objectsList.filter((object) => bounds.contains(object.coords as LatLng))
    }

}