import { Component, input, output } from '@angular/core';
import { MapObjectModel } from '../../core/types/types';
import { TuiSurface, TuiTitle } from '@taiga-ui/core';


@Component({
  selector: 'app-map-object-card',
  imports: [TuiSurface, TuiTitle],
  templateUrl: './map-object-card.component.html',
  styleUrl: './map-object-card.component.css',
})
export class MapObjectCardComponent {
  object = input.required<MapObjectModel>();
  isSelected = input<boolean>(false);

  clicked = output<void>();
  editClicked = output<void>();
  
}
