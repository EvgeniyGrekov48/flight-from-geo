import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadComponent: () => import('./features/map-object-list/map-object-list.component').then(c => c.MapObjectListComponent),
  },
  {
    path: 'object/:id',
    loadComponent: () => import('./features/object-detail/object-detail.component').then(c => c.ObjectDetailComponent),
  },
  // { path: 'edit/:id', loadComponent: ... }, // Позже
  // { path: 'create', loadComponent: ... },   // Позже
  {
    path: '**',
    redirectTo: 'list'
  },
]