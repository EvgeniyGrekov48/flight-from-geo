import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MainMap } from './features/main-map/main-map';
import { SidebarComponent } from "./features/sidebar/sidebar.component";
import { UIStore } from './core/stores/ui.store';

@Component({
  selector: 'app-root',
  imports: [MainMap, SidebarComponent],
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
