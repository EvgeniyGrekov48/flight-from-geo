import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MapObjectModel } from "../types/types";

@Injectable({ providedIn: 'root' })
export class APIService {
    private readonly http = inject(HttpClient)
    private readonly url = "http://localhost:3000"

    public getMapObjects(): Observable<MapObjectModel[]> {
        return this.http.get<MapObjectModel[]>(`${this.url}/mapObjects`)
    }

    // public deleteTask(id: number): Observable<void> {
    //     return this.http.delete<void>(`${this.url}/mapObjects/${id}`)
    // }

    // public addTask(task: MapObjectModel): Observable<MapObjectModel> {
    //     return this.http.post<MapObjectModel>(`${this.url}/mapObjects`, task)
    // }

    // public updateTask(id: number, task: Partial<MapObjectModel>): Observable<Partial<MapObjectModel>> {
    //     return this.http.patch<Partial<MapObjectModel>>(`${this.url}/mapObjects/${id}`, task)
    // }
}

