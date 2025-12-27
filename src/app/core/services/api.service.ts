import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MapObjectAPI } from "../types/types";

@Injectable({ providedIn: 'root' })
export class APIService {
    private readonly http = inject(HttpClient)
    private readonly url = "http://192.168.10.26:3000"

    public getMapObjects(): Observable<MapObjectAPI[]> {
        return this.http.get<MapObjectAPI[]>(`${this.url}/mapObjects`)
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

