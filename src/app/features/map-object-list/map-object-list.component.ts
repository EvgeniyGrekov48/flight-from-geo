import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIStore } from '../../core/stores/ui.store';
import { TuiScrollbar } from "@taiga-ui/core";
import { MapObjectCardComponent } from "../../ui/map-object-card/map-object-card.component";

@Component({
  selector: 'app-map-object-list',
  imports: [
    CommonModule,
    TuiScrollbar,
    MapObjectCardComponent
],
  templateUrl: './map-object-list.component.html',
  styleUrl: './map-object-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapObjectListComponent {
  private readonly uiStore = inject(UIStore);

  protected readonly objectsList = this.uiStore.getObjectsInViewPort

  protected viewObjectDetail(id: number): void {
    this.uiStore.routerNavigateToSelectedObject(id)
  }
  
}