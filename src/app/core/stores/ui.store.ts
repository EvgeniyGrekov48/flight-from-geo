import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UIStore {
    public readonly OPEN_CLOSE__TRANSITION = 1000
    public readonly WIDTH = 30

    private readonly _isSidebarOpen = signal<boolean>(false);

    public isSidebarOpen = this._isSidebarOpen.asReadonly();

    public toggleSidebar(): void {
        this._isSidebarOpen.update(current => !current);
    }

    public openSidebar(): void {
        this._isSidebarOpen.set(true);
    }

    public closeSidebar(): void {
        this._isSidebarOpen.set(false);
    }
}