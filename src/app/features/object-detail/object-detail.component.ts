import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DecimalPipe } from '@angular/common';
import { RoutingStore } from '../../core/stores/routing.store';
import { MapObjectService } from '../../core/services/map-object.service';
import { TuiTitle, TuiButton, TuiHint } from '@taiga-ui/core';
import { TuiBadge } from '@taiga-ui/kit';
import { OBJECT_TYPE_ALIAS, OBJECT_TYPE_COLOR } from '../main-map/main-map.auxiliary/marker-config.const';
import { EnumMapObject } from '../../core/types/types';

@Component({
  selector: 'app-object-detail',
  imports: [
    DecimalPipe,
    TuiTitle,
    TuiBadge,
    TuiButton,
    TuiHint,
],
  templateUrl: './object-detail.component.html',
  styleUrl: './object-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectDetailComponent implements OnInit {
  private readonly _route = inject(ActivatedRoute);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _mapObjectService = inject(MapObjectService);
  private readonly _routingStore = inject(RoutingStore);

  protected readonly object = computed(() => 
    this._mapObjectService.getObjects()
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
    this._routingStore.routerNavigateToList();
  }

  protected getObjectTypeColor(type: EnumMapObject): string {
    return OBJECT_TYPE_COLOR[type]
  }

  protected getObjectTypeAlias(type: EnumMapObject): string {
    return OBJECT_TYPE_ALIAS[type]
  }
}