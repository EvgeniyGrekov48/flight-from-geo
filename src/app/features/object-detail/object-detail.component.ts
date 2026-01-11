import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RoutingStore } from '../../core/stores/routing.store';
import { MapObjectService } from '../../core/services/map-object.service';

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

  private readonly _mapObjectService = inject(MapObjectService);
  private readonly _routingStore = inject(RoutingStore);

  protected readonly object = computed(() => this._mapObjectService.getObjects()
    .find(obj => obj.id === this._routingStore.getOpenedObjectId())
  );

  ngOnInit(): void {
    this._route.paramMap
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(params => {
        const id = params.get('id');
        this._routingStore.setOpenedObjectId(id ? +id : null);
      });
  }

  protected closeDetail(): void {
    this._routingStore.routerNavigateToList()
  }
}
