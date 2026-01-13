import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { EnumMapObject, MapObjectAPI } from '../../core/types/types';
import { TuiTitle } from '@taiga-ui/core';
import { TuiBadge } from "@taiga-ui/kit";
import { OBJECT_TYPE_ALIAS, OBJECT_TYPE_COLOR } from '../../features/main-map/main-map.auxiliary/marker-config.const';

@Component({
  selector: 'app-map-object-card',
  imports: [TuiTitle, TuiBadge],
  templateUrl: './map-object-card.component.html',
  styleUrl: './map-object-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapObjectCardComponent {
  public readonly object = input.required<MapObjectAPI>();
  
  public readonly clicked = output<void>();

  protected getObjectTypeColor(type: EnumMapObject): string {
    return OBJECT_TYPE_COLOR[type]
  }
  
  protected getObjectTypeAlias(type: EnumMapObject): string {
    return OBJECT_TYPE_ALIAS[type]
  }
}
