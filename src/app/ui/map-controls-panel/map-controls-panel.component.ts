import { Component, output, input } from '@angular/core';
import { TuiButton, TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'app-map-controls-panel',
  imports: [TuiIcon, TuiButton],
  templateUrl: './map-controls-panel.component.html',
  styleUrls: ['./map-controls-panel.component.css']
})
export class MapControlsPanelComponent {
  // Входные параметры (минимальные!)
  isSidebarOpen = input(false);
  isLocating = input(false); // Для состояния загрузки геолокации
  zoomLevel = input(7); // Текущий зум карты

  // Выходные события (чистая коммуникация)
  toggleSidebar = output<void>();
  locateUser = output<void>();
  zoomIn = output<void>();
  zoomOut = output<void>();
}
