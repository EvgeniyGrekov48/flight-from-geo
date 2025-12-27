
// API          | sufix API
// Inner types  | sufix Model
// From Library | sufix FromLib

import { Layer } from "leaflet";

export enum EnumMapObject {
    PARAGLIDING = 'paragliding',
    THERMAL = 'thermal',
    USER = 'user',
}

export interface LatLngFromLib {
    lat: number
    lng: number
}

export interface MapObjectAPI {
    type: EnumMapObject;
    id: number;
    title: string;
    description: string;
    coords: LatLngFromLib;
}

export interface BaseLayerDescriptionModel {
    id: string,
    layer: Layer,
    title: string
}