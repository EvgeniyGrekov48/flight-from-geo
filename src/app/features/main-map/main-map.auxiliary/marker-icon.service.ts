import { Injectable } from '@angular/core';
import { DivIcon, PointExpression, TooltipOptions } from 'leaflet';
import { EnumMapObject } from '../../../core/types/types';
import { MARKER_BORDER, OBJECT_TYPE_COLOR, MARKER_RADIUS, MARKER_Z_INDEX, SELECTED_MULTIPLIER } from './marker-config.const';

export interface MarkerIconConfig {
  icon: DivIcon;
  tooltipOptions: TooltipOptions;
  zIndexOffset: number;
}

@Injectable()
export class MarkerIconService {
  private _createIconHTML(radius: number, border: number, color: string): string {
    return `<div style="
      background: ${color};
      width: ${radius * 2}px;
      height: ${radius * 2}px;
      border-radius: 50%;
      border: ${border}px solid white;
      box-shadow: 0 1px 3px rgba(0,0,0,0.3);
    "></div>`;
  }
  
  private _calculateTooltipOffset(radius: number, border: number): PointExpression {
    return [0, -(radius + border)];
  }
  
  public getIconConfig(type: EnumMapObject, isSelected: boolean): MarkerIconConfig {
    const _radius = MARKER_RADIUS * (isSelected ? SELECTED_MULTIPLIER : 1);
    const _border = MARKER_BORDER * (isSelected ? SELECTED_MULTIPLIER : 1);
    const _color = OBJECT_TYPE_COLOR[type];
    
    const _html = this._createIconHTML(_radius, _border, _color);
    const _radiusOverall = _radius + _border
    const _icon = new DivIcon({
      html: _html,
      className: '',
      iconSize: [_radiusOverall * 2, _radiusOverall * 2],
      iconAnchor: [_radiusOverall, _radiusOverall]
    });
    
    const _tooltipOptions: TooltipOptions = {
      direction: 'top',
      offset: this._calculateTooltipOffset(_radius, _border)
    };
    
    return {
      icon: _icon,
      tooltipOptions: _tooltipOptions,
      zIndexOffset: isSelected ? MARKER_Z_INDEX.SELECTED : MARKER_Z_INDEX.DEFAULT
    };
  }

}