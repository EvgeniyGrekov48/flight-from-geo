import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MainMap } from './features/main-map/main-map';
import { UIStore } from './core/stores/ui.store';
import { MapObjectListComponent } from "./ui/map-object-list/map-object-list.component";

@Component({
  selector: 'app-root',
  imports: [MainMap, MapObjectListComponent],
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
