import { Component, inject } from '@angular/core';
import { UIStore } from '../../core/stores/ui.store';
import { MapObjectService } from '../../core/services/map-object.service';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  private uiStore = inject(UIStore);
  private mapObjectService = inject(MapObjectService);
  
  // Данные объектов
  readonly objectsCount = () => this.mapObjectService.objects().length;
}
