import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AppStore } from '../../core/stores/app.store';
import { MainMapComponent } from "../../features/main-map/main-map.component";
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-main-layout',
  imports: [MainMapComponent, RouterModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {
  private readonly appStore = inject(AppStore);

  protected readonly SIDEBAR__WIDTH = 40
  protected readonly SIDEBAR__TRANSITION = this.appStore.SIDEBAR__TRANSITION

  protected readonly isSidebarOpen = this.appStore.isSidebarOpen;
}
