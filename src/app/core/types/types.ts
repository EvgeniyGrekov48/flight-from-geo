
// API          | sufix API
// Inner types  | sufix Model
// From Library | sufix FromLib

import { LatLng, Layer } from "leaflet";

export enum EnumMapObject {
    PARAGLIDING = 'paragliding',
    THERMAL = 'thermal',
    USER = 'user',
}

export interface MapObjectAPI {
    type: EnumMapObject;
    id: number;
    title: string;
    description: string;
    coords: LatLng;
}

export interface BaseLayerDescriptionModel {
    id: string,
    layer: Layer,
    title: string
}