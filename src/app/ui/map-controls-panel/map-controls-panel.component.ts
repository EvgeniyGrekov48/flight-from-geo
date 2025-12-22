import { Component, output, input } from '@angular/core';
import { TuiButton, TuiIcon } from '@taiga-ui/core';
import {TuiHint} from '@taiga-ui/core/directives';

@Component({
  selector: 'app-map-controls-panel',
  imports: [TuiIcon, TuiButton, TuiHint],
  templateUrl: './map-controls-panel.component.html',
  styleUrls: ['./map-controls-panel.component.css']
})
export class MapControlsPanelComponent {

  isSidebarOpen = input();
  isLocating = input();
  zoomLevel = input();

  toggleSidebar = output<void>();
  locateUser = output<void>();
  zoomIn = output<void>();
  zoomOut = output<void>();
}
