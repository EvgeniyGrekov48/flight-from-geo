import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { LeafletDirective, LeafletLayersControlDirective } from '@bluehalo/ngx-leaflet';
import { TuiButton } from '@taiga-ui/core';
import { LAYERS_CONTROL_CONFIG, OPTIONS_MAP } from '../constants';
import { NavigatorService } from '../../core/services/navigator.service';
import { UIStore } from '../../core/stores/ui.store';

@Component({
  selector: 'app-main-map',
  standalone: true,
  imports: [CommonModule,
    LeafletDirective,
    LeafletLayersControlDirective,
    TuiButton,
  ],
  templateUrl: './main-map.component.html',
  styleUrl: './main-map.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainMapComponent {
  private uiStore = inject(UIStore);
  private readonly navigator = inject(NavigatorService)
  private mapInstance?: L.Map;

  //state
  protected isSidebarOpen = this.uiStore.isSidebarOpen;
  //constants
  protected readonly options = OPTIONS_MAP
  protected readonly layersControlConfig = LAYERS_CONTROL_CONFIG

  constructor() {
    this.initEffectViewLocateUser()

  effect(() => {
    const isOpen = this.isSidebarOpen();
    if (this.mapInstance) {
      setTimeout(() => {
        this.invalidateSize()
      }, this.uiStore.SIDEBAR__TRANSITION)

    }
  });

  }

  //------INIT-------
  private initEffectViewLocateUser() {
    effect(() => {
      const coords = this.navigator.coords();
      if (coords && this.mapInstance) {
        this.mapInstance.flyTo([coords.latitude, coords.longitude], this.mapInstance.getZoom());
      }
    });
  }

  public invalidateSize(): void {
    this.mapInstance?.invalidateSize();
  }

  public onMapReady(map: L.Map) {
    this.mapInstance = map;
    this.mapInstance?.invalidateSize()
    this.mapInstance.zoomControl.setPosition('bottomright')
    this.mapInstance.attributionControl.setPrefix("Leaflet")
  }

  //-------USER_ACTION-----
  getLocateUser() {
    this.navigator.getCurrentPosition()
  }

  toggleSidebar() {
    this.uiStore.toggleSidebar();
  }

}