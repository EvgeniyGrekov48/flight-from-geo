import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiScrollbar } from "@taiga-ui/core";
import { MapObjectCardComponent } from "../../ui/map-object-card/map-object-card.component";
import { MapObjectFilterService } from '../../core/services/map-object-filter.service';
import { RoutingStore } from '../../core/stores/routing.store';

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
  private readonly _mapObjectFilterService = inject(MapObjectFilterService);
  private readonly _routingStore = inject(RoutingStore)

  protected readonly objectsList = this._mapObjectFilterService.getObjectsInViewPort

  protected viewObjectDetail(id: number): void {
    this._routingStore.routerNavigateToOpenedObject(id)
  }
  
}