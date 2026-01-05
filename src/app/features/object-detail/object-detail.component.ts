import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RoutingStore } from '../../core/stores/routing.store';
import { MapObjectFilterService } from '../../core/services/map-object-filter.service';

@Component({
  selector: 'app-object-detail',
  imports: [],
  templateUrl: './object-detail.component.html',
  styleUrl: './object-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectDetailComponent implements OnInit {
  private readonly _route = inject(ActivatedRoute);
  private readonly _destroyRef = inject(DestroyRef);

  private readonly _mapObjectFilterService = inject(MapObjectFilterService);
  private readonly _routingStore = inject(RoutingStore);

  ngOnInit(): void {
    this._route.paramMap
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe(params => {
      const id = params.get('id');
      this._routingStore.setOpenedObjectId(id ? +id : null);
    });
  }

  object = computed(() => this._mapObjectFilterService.getObjectsInViewPort()
      .find(obj => obj.id === this._routingStore.getOpenedObjectId())
  );

  closeDetail(): void {
    this._routingStore.routerNavigateToList()
  }
}
