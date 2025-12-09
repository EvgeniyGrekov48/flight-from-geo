export enum EnumMapObject {
    PARAGLIDING = 'paragliding',
    THERMAL = 'thermal',
    USER = 'user',
}

export interface MapObject {
    id: string;
    name: string;
    description: string;
    lat: number;
    lng: number;
    type: EnumMapObject;
    createdAt: string;
}