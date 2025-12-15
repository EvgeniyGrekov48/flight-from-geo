import { DestroyRef, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { MapObjectModel } from '../types/types';
import { APIService } from './api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class MapObjectService {
  private readonly API = inject(APIService)
  private readonly destroyRef = inject(DestroyRef);

  private readonly _objects: WritableSignal<MapObjectModel[]> = signal([]);
  public readonly getObjects: Signal<MapObjectModel[]> = this._objects.asReadonly();

  public loadMapObjects(): void {
    this.API.getMapObjects()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (value) => this._objects.set(value),
        error: (error) => console.error(error),
      })
  }

  // public doDeleteTask(id: number): void {
  //   const task = this.getTasks().find(v => v.id === id)
  //   this.protocol.deleteTask(id)
  //     .pipe(takeUntilDestroyed(this.destroyRef))
  //     .subscribe({
  //       next: () => {
  //         this.toast.show(`Задача "${task?.title}" удалена`)
  //         this.loadTasks()
  //       },
  //       error: () => {
  //         this.toast.show(`Ошибка удаления задачи "${task?.title}"`)
  //       }
  //     })
  // }

  // public doAddNewTask(task: Partial<Task>): void {
  //   const taskOverall = { ...task, id: this.getIdNextAfterMax(), status: TaskStatus.SCHEDULED } as Task
  //   this.protocol.addTask(taskOverall)
  //     .pipe(takeUntilDestroyed(this.destroyRef))
  //     .subscribe({
  //       next: () => {
  //         this.toast.show(`Задача "${taskOverall.title}" добавлена`)
  //         this.loadTasks()
  //       },
  //       error: () => {
  //         this.toast.show(`Ошибка добавления задачи "${taskOverall.title}"`)
  //       }
  //     })
  // }

  // public doChangeTaskTitle(id: number, title: string): void {
  //   this.protocol.updateTask(id, { title: title })
  //     .pipe(takeUntilDestroyed(this.destroyRef))
  //     .subscribe({
  //       next: () => {
  //         this.isEdited.set(null)
  //         this.toast.show(`Изменен заголовок задачи "${title}"`)
  //         this.loadTasks()
  //       },
  //       error: () => {
  //         this.toast.show(`Ошибка изменения заголовка задачи "${title}"`)
  //       }
  //     })
  // }

  // public addObject(object: Omit<MapObjectModel, "id">): void {
  //   const newObject: MapObjectModel = { ...object, id: Date.now() };
  //   this._objects.update(current => [...current, newObject]);
  // }

  // public updateObject(updatedObject: MapObjectModel): void {
  //   this._objects.update(current =>
  //     current.map(obj => obj.id === updatedObject.id ? updatedObject : obj)
  //   );
  // }

  // public deleteObject(id: number): void {
  //   this._objects.update(current => current.filter(obj => obj.id !== id));
  // }
}