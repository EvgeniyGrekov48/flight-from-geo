import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MapObjectService } from '../../core/services/map-object.service';

@Component({
  selector: 'app-object-detail',
  imports: [],
  templateUrl: './object-detail.component.html',
  styleUrl: './object-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private mapObjectService = inject(MapObjectService);
  
  private id = signal<number | null>(null);
  
  object = computed(() => {
    const objectId = this.id();
    if (!objectId) return null;
    
    return this.mapObjectService.getObjects()
      .find(obj => obj.id === objectId) || null;
  });

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');
    this.id.set(routeId ? Number(routeId) : null);
  }

  goBack(): void {
    window.history.back();
  }
}
