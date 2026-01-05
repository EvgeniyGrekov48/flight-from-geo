import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit } from '@angular/core';
import { MapObjectService } from '../../core/services/map-object.service';
import { UIStore } from '../../core/stores/ui.store';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-object-detail',
  imports: [],
  templateUrl: './object-detail.component.html',
  styleUrl: './object-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectDetailComponent implements OnInit {
  private readonly mapObjectService = inject(MapObjectService);
  private readonly uiStore = inject(UIStore);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.route.paramMap
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(params => {
      const id = params.get('id');
      this.uiStore.setSelectedObjectId(id ? +id : null);
    });
  }

  object = computed(() => this.mapObjectService.getObjects()
      .find(obj => obj.id === this.uiStore.selectedObjectId())
  );

  closeDetail(): void {
    this.uiStore.routerNavigateToList()
  }
}
