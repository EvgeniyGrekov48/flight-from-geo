import { EnumMapObject } from "../../../core/types/types";

export const MARKER_RADIUS = 8;
export const MARKER_BORDER = 2;
export const SELECTED_MULTIPLIER = 2;

export const OBJECT_TYPE_COLOR = {
  [EnumMapObject.PARAGLIDING]: 'hsl(210, 50%, 50%)',
  [EnumMapObject.THERMAL]: 'hsl(15, 70%, 55%)',
  [EnumMapObject.USER]: 'hsl(140, 50%, 45%)'
} as const;

export const OBJECT_TYPE_ALIAS = {
  [EnumMapObject.PARAGLIDING]: 'Полет',
  [EnumMapObject.THERMAL]: 'Термик',
  [EnumMapObject.USER]: 'Мой топ'
} as const;

export const MARKER_Z_INDEX = {
  SELECTED: 1000,
  DEFAULT: 0
} as const;