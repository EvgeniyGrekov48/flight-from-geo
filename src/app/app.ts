import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MainMapComponent } from './features/main-map/main-map.component';
import { UIStore } from './core/stores/ui.store';
import { MapObjectListComponent } from "./features/map-object-list/map-object-list.component";

@Component({
  selector: 'app-root',
  imports: [MainMapComponent, MapObjectListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('flight-from-geo');
  public uiStore = inject(UIStore);
  
  // Состояние сайдбара
  readonly isSidebarOpen = this.uiStore.isSidebarOpen;
  
}
