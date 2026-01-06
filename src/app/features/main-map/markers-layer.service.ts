import { Injectable, inject, computed } from '@angular/core';
import L, { LayerGroup, TooltipOptions } from 'leaflet';
import { EnumMapObject, MapObjectAPI } from '../../core/types/types';
import { MapObjectService } from '../../core/services/map-object.service';
import { MapObjectFilterService } from '../../core/services/map-object-filter.service';
import { RoutingStore } from '../../core/stores/routing.store';

const MARKER_RADIUS = 8;
const MARKER_BORDER = 2;
const SELECTED_MULTIPLIER = 2;

const SIZE = (radius: number, border: number) => radius + border;

const MARKER_COLORS = {
  [EnumMapObject.PARAGLIDING]: 'hsl(210, 80%, 40%)',
  [EnumMapObject.THERMAL]: 'hsl(0, 80%, 40%)',
  [EnumMapObject.USER]: 'hsl(140, 80%, 35%)'
};

const createIcon = (type: EnumMapObject, isSelected: boolean): L.DivIcon => {
  const radius = MARKER_RADIUS * (isSelected ? SELECTED_MULTIPLIER : 1);
  const border = MARKER_BORDER * (isSelected ? SELECTED_MULTIPLIER : 1);
  const color = MARKER_COLORS[type];
  const size = SIZE(radius, border);
  const html = `<div style="
            background: ${color};
            width: ${radius * 2}px;
            height: ${radius * 2}px;
            border-radius: 50%;
            border: ${border}px solid white;
            box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        "></div>`

  return L.divIcon({
    html,
    className: '',
    iconSize: [size * 2, size * 2],
    iconAnchor: [size, size]
  });
};

const NORMAL_ICONS = {
  [EnumMapObject.PARAGLIDING]: createIcon(EnumMapObject.PARAGLIDING, false),
  [EnumMapObject.THERMAL]: createIcon(EnumMapObject.THERMAL, false),
  [EnumMapObject.USER]: createIcon(EnumMapObject.USER, false)
};

const SELECTED_ICONS = {
  [EnumMapObject.PARAGLIDING]: createIcon(EnumMapObject.PARAGLIDING, true),
  [EnumMapObject.THERMAL]: createIcon(EnumMapObject.THERMAL, true),
  [EnumMapObject.USER]: createIcon(EnumMapObject.USER, true)
};

const NORMAL_TOOLTIP_OPTION = {
  direction: 'top',
  offset: L.point(0, -SIZE(MARKER_RADIUS, MARKER_BORDER))
} as TooltipOptions

const SELECTED_TOOLTIP_OPTION = {
  direction: 'top',
  offset: L.point(0, -SIZE(MARKER_RADIUS * SELECTED_MULTIPLIER, MARKER_BORDER * SELECTED_MULTIPLIER))
} as TooltipOptions

@Injectable()
export class MarkersLayerService {
  private readonly _mapObjectService = inject(MapObjectService);
  private readonly _mapObjectFilterService = inject(MapObjectFilterService);
  private readonly _routingStore = inject(RoutingStore);

  private _createMarkersLayer(objects: MapObjectAPI[]): LayerGroup {
    const _markersLayer = L.layerGroup();
    objects.forEach(obj => {
      const marker = L.marker([obj.coords.lat, obj.coords.lng], {
        icon: NORMAL_ICONS[obj.type]
      });
      marker
        .bindTooltip(`<b>${obj.title}</b><br>${obj.description}`, NORMAL_TOOLTIP_OPTION)
        .on('click', () => this._routingStore.routerNavigateToOpenedObject(obj.id))
        .addTo(_markersLayer);
    });
    return _markersLayer
  }

  private _createSelectedMarkerLayer(id: number | null, objects: MapObjectAPI[]): LayerGroup {
    const _selectedLayer = L.layerGroup();
    const selectedObj = objects.find(obj => obj.id === id);
    if (selectedObj) {
      const marker = L.marker([selectedObj.coords.lat, selectedObj.coords.lng], {
        icon: SELECTED_ICONS[selectedObj.type]
      });
      marker
        .bindTooltip(`<b>${selectedObj.title}</b><br>${selectedObj.description}`, SELECTED_TOOLTIP_OPTION)
        .on('click', () => this._routingStore.routerNavigateToList())
        .setZIndexOffset(1000)
        .addTo(_selectedLayer);
    }
    return _selectedLayer
  }

  public readonly markersLayer = computed(() => {
    const objects = this._mapObjectFilterService.getObjectsInViewPort()
    return this._createMarkersLayer(objects)
  });

  public readonly selectedMarkerLayer = computed(() => {
    const id = this._routingStore.getOpenedObjectId()
    const objects = this._mapObjectService.getObjects()
    return this._createSelectedMarkerLayer(id, objects)
  });

}