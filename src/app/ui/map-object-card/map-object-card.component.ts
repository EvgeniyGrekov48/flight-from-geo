import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
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

  protected readonly getObjectTypeColor = computed<string>(() => OBJECT_TYPE_COLOR[this.object().type])
  protected readonly getObjectTypeAlias = computed<string>(() => OBJECT_TYPE_ALIAS[this.object().type])
  
}
