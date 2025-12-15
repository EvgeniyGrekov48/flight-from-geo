import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UIStore {
    public readonly SIDEBAR__TRANSITION = 1000

    private readonly _isSidebarOpen = signal<boolean>(false);
    private _selectedObjectId = signal<number | null>(null);

    public readonly isSidebarOpen = this._isSidebarOpen.asReadonly();
    public readonly getSelectedObjectId = this._selectedObjectId.asReadonly();


    public toggleSidebar(): void {
        this._isSidebarOpen.update(current => !current);
    }

    public openSidebar(): void {
        this._isSidebarOpen.set(true);
    }

    public closeSidebar(): void {
        this._isSidebarOpen.set(false);
    }

    public selectObject(id: number | null): void {
        const isClicedOnSelected = this._selectedObjectId() === id
        this._selectedObjectId.set(isClicedOnSelected ? null : id);
    }
    
}