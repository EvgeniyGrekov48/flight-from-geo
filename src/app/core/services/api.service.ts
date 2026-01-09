import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MapObjectAPI } from "../types/types";

@Injectable({ providedIn: 'root' })
export class APIService {
  private readonly _http = inject(HttpClient)
  private readonly _URL = "http://localhost:3000"

  public getMapObjects(): Observable<MapObjectAPI[]> {
    return this._http.get<MapObjectAPI[]>(`${this._URL}/mapObjects`)
  }
}

