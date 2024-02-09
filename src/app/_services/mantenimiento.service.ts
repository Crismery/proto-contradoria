import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';
import { HttpClient } from '@angular/common/http';
import { Mantenimiento } from '../models/mantenimiento.model';

const manURL = "http://localhost:8083/api/mantenimiento/";

@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {

  constructor(private http: HttpClient) { }

  create(data:any): Observable<any> {
    return this.http.post(`${manURL}`, data); 
  }
  get (): Observable<Mantenimiento[]> {
    return this.http.get<Mantenimiento[]>(`${manURL}`)
  }

}
