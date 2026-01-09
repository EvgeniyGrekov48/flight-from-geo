import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RoutingStore {
  private readonly _router = inject(Router);

  private readonly _openedObjectId = signal<number | null>(null);

  //---------OPENED_OBJECT_ID----------
  public readonly getOpenedObjectId = this._openedObjectId.asReadonly();

  public setOpenedObjectId(id: number | null): void {
    this._openedObjectId.set(id);
  }

  public routerNavigateToOpenedObject(id: number): void {
    this._router.navigate(['/object', id])
  }

  public routerNavigateToList(): void {
    this._router.navigate(['/list'])
    this.setOpenedObjectId(null)
  }

}