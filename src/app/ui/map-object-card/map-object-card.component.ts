import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MapObjectAPI } from '../../core/types/types';
import { TuiSurface, TuiTitle } from '@taiga-ui/core';

@Component({
  selector: 'app-map-object-card',
  imports: [TuiSurface, TuiTitle ],
  templateUrl: './map-object-card.component.html',
  styleUrl: './map-object-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapObjectCardComponent {
  public readonly object = input.required<MapObjectAPI>();
  public readonly isSelected = input<boolean>(false);

  public readonly clicked = output<void>();
}
