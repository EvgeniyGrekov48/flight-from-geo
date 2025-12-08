import { LeafletControlLayersConfig } from "@bluehalo/ngx-leaflet";
import { latLng, Layer, MapOptions, tileLayer } from "leaflet";

const STREET_LAYER = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

const SATELITE_LAYER = tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer">Esri</a>'
});

export const OPTIONS_MAP = {
    layers: [STREET_LAYER],
    zoom: 7,
    center: latLng([58, 39]),
} as MapOptions

export const LAYERS_CONTROL_CONFIG = {
    baseLayers: {
        "Топо мир": STREET_LAYER,
        'Спутник': SATELITE_LAYER
    } as {[name: string]: Layer},
    overlays: {}
} as LeafletControlLayersConfig


