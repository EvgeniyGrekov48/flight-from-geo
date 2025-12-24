import { Component, output, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { TuiButton, TuiIcon } from '@taiga-ui/core';
import { TuiHint } from '@taiga-ui/core/directives';

@Component({
  selector: 'app-map-controls-panel',
  imports: [TuiIcon, TuiButton, TuiHint ],
  templateUrl: './map-controls-panel.component.html',
  styleUrl: './map-controls-panel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class MapControlsPanelComponent {
  public readonly isSidebarOpen = input.required<boolean>();
  public readonly isLocating = input.required<boolean>();
  public readonly zoomLevel = input.required<number>();

  public readonly toggleSidebar = output<void>();
  public readonly locateUser = output<void>();
  public readonly zoomOut = output<void>();
  public readonly zoomIn = output<void>();

  protected readonly sidebarHint = computed(() => 
    this.isSidebarOpen() ? 'Скрыть панель' : 'Показать панель'
  );

  protected readonly sidebarIcon = computed(() =>
    this.isSidebarOpen() ? '@tui.sidebar-open' : '@tui.sidebar-close'
  );

  protected onSelectLayer(): void {
    console.log("Select layer")
  }

  protected onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  protected onLocateUser(): void {
    this.locateUser.emit();
  }

  protected onZoomIn(): void {
    this.zoomIn.emit();
  }

  protected onZoomOut(): void {
    this.zoomOut.emit();
  }

}