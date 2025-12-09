import { Component, input, output } from '@angular/core';
import { MapObject } from '../../core/types/types';

@Component({
  selector: 'app-object-card',
  imports: [],
  templateUrl: './object-card.component.html',
  styleUrl: './object-card.component.css',
})
export class ObjectCardComponent {
  object = input.required<MapObject>();
  isSelected = input(false);
  clicked = output<void>();
}
