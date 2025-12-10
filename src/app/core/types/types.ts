
// API          | sufix Request / Response
// Inner types  | sufix Model
// From Library | sufix Lib

export enum EnumMapObject {
    PARAGLIDING = 'paragliding',
    THERMAL = 'thermal',
    USER = 'user',
}

export interface LatLngLib {
    lat: number
    lng: number
}

export interface MapObjectModel {
    type: EnumMapObject;
    id: number;
    tittle: string;
    description: string;
    coords: LatLngLib
}