
// API          | sufix Request / Response
// Inner types  | sufix Model
// From Library | sufix FromLib

export enum EnumMapObject {
    PARAGLIDING = 'paragliding',
    THERMAL = 'thermal',
    USER = 'user',
}

export interface LatLngFromLib {
    lat: number
    lng: number
}

export interface MapObjectModel {
    type: EnumMapObject;
    id: number;
    tittle: string;
    description: string;
    coords: LatLngFromLib;
}