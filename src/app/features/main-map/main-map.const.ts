import { latLng, MapOptions, tileLayer } from "leaflet";
import { BaseLayerDescriptionModel } from "../../core/types/types";

const STREET_LAYER = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

const SATELITE_LAYER = tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer">Esri</a>'
});

const OPENTOPO_LAYER = tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: 'Карта: © <a href="https://opentopomap.org">OpenTopoMap</a> | Данные: © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

const ESRI_TERRAIN_LAYER = tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Источник: Esri'
});

export const OPTIONS_MAP = {
  layers: [STREET_LAYER],
  zoom: 7,
  center: latLng([58, 39]),
  zoomControl: false,
} as MapOptions

export const LAYERS_BASE__LIST: BaseLayerDescriptionModel[] = [
  {
    id: 'streets',
    layer: STREET_LAYER,
    title: 'Улицы'
  }, {
    id: 'satellite',
    layer: SATELITE_LAYER,
    title: 'Спутник'
  }, {
    id: 'topo',
    layer: OPENTOPO_LAYER,
    title: 'Топо'
  }, {
    id: 'terrain',
    layer: ESRI_TERRAIN_LAYER,
    title: 'Рельеф'
  }
]
