import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';
import { HttpClient } from '@angular/common/http';
import { Usuarios } from '../models/usuarios.model';

const usURL = "http://localhost:8083/api/usuarios";

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(usURL);
  }

  getID_Usuario(ID_Usuario:any): Observable<Usuarios> {
    return this.http.get(`${usURL}/${ID_Usuario}`);
  }

  create(data:any): Observable<any> {
    return this.http.post(usURL, data);
  }

  updateByID(ID_Usuario:any, data:any): Observable<any> {
    return this.http.put(`${usURL}/${ID_Usuario}`, data);
  }

  updateUser (ID_Usuario:any, Serial:any, data:any): Observable<any> {
    return this.http.put(`${usURL}/${ID_Usuario}/${Serial}`, data);
  }

  delete(ID_Usuario:any): Observable<any> {
    return this.http.delete(`${usURL}/${ID_Usuario}`);
  }
  findAndCountD (Dispositivo:any): Observable<Usuarios> {
    return this.http.get(`${usURL}/all/${Dispositivo}`)
  }

  getAllWhere (): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]> (`${usURL}/all_entradas/show`)
  }

  getAllWhereU (): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(`${usURL}/all_asignacion/show`)
  }
}

