import { Injectable, inject, computed, effect } from '@angular/core';
import L, { LayerGroup, TooltipOptions } from 'leaflet';
import { EnumMapObject, MapObjectModel } from '../../core/types/types';
import { MapObjectService } from '../../core/services/map-object.service';
import { UIStore } from '../../core/stores/ui.store';

const MARKER_RADIUS = 8;
const MARKER_BORDER = 2;
const SELECTED_MULTIPLIER = 1.5;

const SIZE = (radius: number, border: number) => radius + border;

const MARKER_COLORS = {
    [EnumMapObject.PARAGLIDING]: 'hsl(210, 100%, 50%)',
    [EnumMapObject.THERMAL]: 'hsl(0, 75%, 56%)',
    [EnumMapObject.USER]: 'hsl(140, 60%, 45%)'
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
    private readonly mapObjectService = inject(MapObjectService);
    private readonly uiStore = inject(UIStore);

    public readonly markersLayer = computed(() => {
        const objects = this.mapObjectService.getObjects()
        return this.createMarkersLayer(objects)
    });

    public readonly selectedLayer = computed(() => {
        const id = this.uiStore.getSelectedObjectId()
        const objects = this.mapObjectService.getObjects()
        return this.createSelectedMarkerLayer(id, objects)
    });

    private createMarkersLayer(objects: MapObjectModel[]): LayerGroup {
        const _markersLayer = L.layerGroup();
        objects.forEach(obj => {
            const marker = L.marker([obj.coords.lat, obj.coords.lng], {
                icon: NORMAL_ICONS[obj.type]
            });
            marker
                .bindTooltip(`<b>${obj.title}</b><br>${obj.description}`, NORMAL_TOOLTIP_OPTION)
                .on('click', () => this.uiStore.selectObject(obj.id))
                .addTo(_markersLayer);
        });
        return _markersLayer
    }

    private createSelectedMarkerLayer(id: number | null, objects: MapObjectModel[]): LayerGroup {
        const _selectedLayer = L.layerGroup();
        const selectedObj = objects.find(obj => obj.id === id);
        if (selectedObj) {
            const marker = L.marker([selectedObj.coords.lat, selectedObj.coords.lng], {
                icon: SELECTED_ICONS[selectedObj.type]
            });
            marker
                .bindTooltip(`<b>${selectedObj.title}</b><br>${selectedObj.description}`, SELECTED_TOOLTIP_OPTION)
                .on('click', () => this.uiStore.selectObject(selectedObj.id))
                .setZIndexOffset(1000)
                .addTo(_selectedLayer);
        }
        return _selectedLayer
    }
}