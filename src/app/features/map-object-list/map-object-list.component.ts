// map-object-list.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapObjectService } from '../../core/services/map-object.service';
import { UIStore } from '../../core/stores/ui.store';
import { TuiScrollbar } from "@taiga-ui/core";
import { MapObjectCardComponent } from "../../ui/map-object-card/map-object-card.component";

@Component({
  selector: 'app-map-object-list',
  standalone: true,
  imports: [
    CommonModule,
    TuiScrollbar,
    MapObjectCardComponent
],
  templateUrl: './map-object-list.component.html',
  styleUrl: './map-object-list.component.css'
})
export class MapObjectListComponent {
  mapObjectService = inject(MapObjectService);
  uiStore = inject(UIStore);
  
  editObject(id: number) {
    console.log('Edit object:', id);
  }
}