import { computed, inject, Injectable, signal } from "@angular/core";
import { MapObjectService } from "./map-object.service";
import { MapObjectAPI } from "../types/types";
import { LatLng, LatLngBounds } from "leaflet";

@Injectable({ providedIn: 'root' })
export class MapObjectFilterService {
  private readonly _mapObjectService = inject(MapObjectService)

  private readonly _currentMapBounds = signal<LatLngBounds | null>(null)

  private _filterObjectsListInViewPort(objectsList: MapObjectAPI[], bounds: LatLngBounds): MapObjectAPI[] {
    return objectsList.filter((object) => bounds.contains(object.coords as LatLng))
  }

  //-------FILTER_OBJECTS_IN_VIEW_PORT--------
  public readonly getObjectsInViewPort = computed<MapObjectAPI[]>(() => {
    const objectsList = this._mapObjectService.getObjects()
    const bounds = this._currentMapBounds()
    return bounds ? this._filterObjectsListInViewPort(objectsList, bounds) : []
  })

  public setCurrentMapBounds(bounds: LatLngBounds | null): void {
    this._currentMapBounds.set(bounds)
  }

}