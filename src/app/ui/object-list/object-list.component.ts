import { Component, input, output } from '@angular/core';
import { ObjectCardComponent } from '../object-card/object-card.component';
import { MapObject } from '../../core/types/types';

@Component({
  selector: 'app-object-list',
  imports: [ObjectCardComponent],
  templateUrl: './object-list.component.html',
  styleUrl: './object-list.component.css',
})
export class ObjectListComponent {
  objects = input.required<MapObject[]>();
  selectedObjectId = input<string | null>(null);
  objectClicked = output<string>();
}
