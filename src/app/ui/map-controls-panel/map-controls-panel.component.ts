import { Component, output, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { TuiButton, TuiIcon } from '@taiga-ui/core';
import { TuiDropdown, TuiDropdownHover, TuiHint } from '@taiga-ui/core/directives';
import { BaseLayerDescriptionModel } from '../../core/types/types';

@Component({
  selector: 'app-map-controls-panel',
  imports: [
    TuiIcon, 
    TuiButton, 
    TuiHint, 
    TuiDropdown, 
    TuiDropdownHover
  ],
  templateUrl: './map-controls-panel.component.html',
  styleUrl: './map-controls-panel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapControlsPanelComponent {
  public readonly isSidebarOpen = input.required<boolean>();
  public readonly isLocating = input.required<boolean>();
  public readonly zoomLevel = input.required<number>();
  public readonly layers = input.required<BaseLayerDescriptionModel[]>();
  public readonly currentLayer = input.required<BaseLayerDescriptionModel>();

  public readonly changelayer = output<BaseLayerDescriptionModel>();
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

  protected isCheckedLayer(id: BaseLayerDescriptionModel): boolean {
    return this.currentLayer() === id
  }

  protected onChangeLayer(id: BaseLayerDescriptionModel): void {
    this.changelayer.emit(id)
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