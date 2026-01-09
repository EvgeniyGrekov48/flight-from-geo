import { Injectable, inject, computed } from '@angular/core';
import L, { LayerGroup } from 'leaflet';
import {  MapObjectAPI } from '../../../core/types/types';
import { MapObjectService } from '../../../core/services/map-object.service';
import { RoutingStore } from '../../../core/stores/routing.store';
import { MarkerIconConfig, MarkerIconService } from './marker-icon.service';

@Injectable()
export class MarkersLayerService {
  private readonly _mapObjectService = inject(MapObjectService);
  private readonly _routingStore = inject(RoutingStore);
  private readonly _markerIconService = inject(MarkerIconService)

  private _createMarkersLayer(objects: MapObjectAPI[]): LayerGroup {
    const _markersLayer = L.layerGroup();
    objects.forEach(obj => {
      const iconConfig: MarkerIconConfig = this._markerIconService.getIconConfig(obj.type, false);
      const marker = L.marker([obj.coords.lat, obj.coords.lng], { icon: iconConfig.icon });
      marker
        .bindTooltip(`<b>${obj.title}</b><br>${obj.description}`, iconConfig.tooltipOptions)
        .on('click', () => this._routingStore.routerNavigateToOpenedObject(obj.id))
        .addTo(_markersLayer);
    });
    return _markersLayer;
  }

  private _createSelectedMarkerLayer(id: number | null, objects: MapObjectAPI[]): LayerGroup {
    const _selectedLayer = L.layerGroup();
    const selectedObj = objects.find(obj => obj.id === id);
    if (selectedObj) {
      const iconConfig: MarkerIconConfig = this._markerIconService.getIconConfig(selectedObj.type, true);     
      const marker = L.marker([selectedObj.coords.lat, selectedObj.coords.lng], { icon: iconConfig.icon });
      marker
        .bindTooltip(`<b>${selectedObj.title}</b><br>${selectedObj.description}`, iconConfig.tooltipOptions)
        .on('click', () => this._routingStore.routerNavigateToList())
        .setZIndexOffset(iconConfig.zIndexOffset)
        .addTo(_selectedLayer);
    } 
    return _selectedLayer;
  }

  public readonly markersLayer = computed(() => {
    const objects = this._mapObjectService.getObjects()
    return this._createMarkersLayer(objects)
  });

  public readonly selectedMarkerLayer = computed(() => {
    const id = this._routingStore.getOpenedObjectId()
    const objects = this._mapObjectService.getObjects()
    return this._createSelectedMarkerLayer(id, objects)
  });

}