import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UIStore } from '../../core/stores/ui.store';
import { MainMapComponent } from "../../features/main-map/main-map.component";
import { MapObjectListComponent } from "../../features/map-object-list/map-object-list.component";

@Component({
  selector: 'app-main-layout',
  imports: [MainMapComponent, MapObjectListComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {
  private readonly uiStore = inject(UIStore);

  protected readonly SIDEBAR__WIDTH = 40
  protected readonly SIDEBAR__TRANSITION = this.uiStore.SIDEBAR__TRANSITION

  protected readonly isSidebarOpen = this.uiStore.isSidebarOpen;
}
