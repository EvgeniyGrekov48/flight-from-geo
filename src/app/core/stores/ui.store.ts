import { Injectable, signal } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class UIStore {
    // Состояние сайдбара
    private readonly _isSidebarOpen = signal<boolean>(false);

    // Публичный интерфейс только для чтения
    public isSidebarOpen = this._isSidebarOpen.asReadonly();

    // Действия
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