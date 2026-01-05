import { computed, inject, Injectable } from "@angular/core";
import { MapObjectService } from "./map-object.service";
import { MapObjectAPI } from "../types/types";
import { AppStore } from "../stores/app.store";
import { LatLng, LatLngBounds } from "leaflet";

@Injectable({ providedIn: 'root' })
export class MapObjectFilterService {
  private readonly _appStoreService = inject(AppStore)
  private readonly _mapObjectService = inject(MapObjectService)

  private _filterObjectsListInViewPort(objectsList: MapObjectAPI[], bounds: LatLngBounds): MapObjectAPI[] {
    return objectsList.filter((object) => bounds.contains(object.coords as LatLng))
  }

  //-------FILTER_OBJECTS_IN_VIEW_PORT--------
  public readonly getObjectsInViewPort = computed<MapObjectAPI[]>(() => {
    const objectsList = this._mapObjectService.getObjects()
    const bounds = this._appStoreService.getCurrentMapBounds()
    return bounds ? this._filterObjectsListInViewPort(objectsList, bounds) : objectsList
  })

}