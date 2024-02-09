import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';
import { HttpClient } from '@angular/common/http';
import { Tests } from '../models/tests.model';

const apiUrl = "http://localhost:8083/api/test/";


@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Tests[]> {
    return this.http.get<Tests[]>(apiUrl);
  }

  getSerial(Serial:any): Observable<Tests> {
    return this.http.get(`${apiUrl}/${Serial}`);
  }

  create(data:any): Observable<any> {
    return this.http.post(apiUrl, data);
  }

  updateBySerial(Serial:any, data:any): Observable<any> {
    return this.http.put(`${apiUrl}/${Serial}`, data);
  }

  updateUser (ID_Usuario:any, Serial:any, data:any): Observable<any> {
    return this.http.put(`${apiUrl}asign/usuario/${ID_Usuario}/${Serial}`, data);
  }

  updateDA(Serial:any, data:any): Observable<any> {
    return this.http.put(`${apiUrl}/descargoA/${Serial}`, data);
  }

  updateDD(Serial:any, data:any): Observable<any> {
    return this.http.put(`${apiUrl}/descargoD/${Serial}`, data);
  }

  updateDBN(Serial:any, data:any): Observable<any> {
    return this.http.put(`${apiUrl}/descargoBN/${Serial}`, data);
  }

  delete(Serial:any): Observable<any> {
    return this.http.delete(`${apiUrl}/${Serial}`);
  }
  findAndCountD (Dispositivo:any): Observable<Tests> {
    return this.http.get(`${apiUrl}/all/${Dispositivo}`)
  }
  findByD (Departamento: any): Observable<Tests[]> {
    return this.http.get<Tests[]> (`${apiUrl}/all/whereD/${Departamento}`)
  }
  findByDis (Dispositivo: any): Observable<Tests[]> {
    return this.http.get<Tests[]> (`${apiUrl}/all/whereDis/${Dispositivo}`)
  }
  findByM (Modelo: any): Observable<Tests[]> {
    return this.http.get<Tests[]> (`${apiUrl}/all/whereMod/${Modelo}`)
  }
  findByDDis (Departamento: any, Dispositivo: any): Observable<Tests[]> {
    return this.http.get<Tests[]> (`${apiUrl}/all/whereDDis/${Departamento}/${Dispositivo}`)
  }
  findByDMod (Departamento: any, Modelo: any): Observable<Tests[]> {
    return this.http.get<Tests[]> (`${apiUrl}/all/whereDMod/${Departamento}/${Modelo}`)
  }
  findByDisMod (Dispositivo: any, Modelo: any): Observable<Tests[]> {
    return this.http.get<Tests[]> (`${apiUrl}/all/whereDisMod/${Dispositivo}/${Modelo}`)
  }
  findByDDisMod (Departamento: any, Dispositivo: any, Modelo: any): Observable<Tests[]> {
    return this.http.get<Tests[]> (`${apiUrl}/all/whereDDisMod/${Departamento}/${Dispositivo}/${Modelo}`)
  }

  getAllWhere (): Observable<Tests[]> {
    return this.http.get<Tests[]> (`${apiUrl}/all_entradas/show`)
  }

  getAllWhereU (): Observable<Tests[]> {
    return this.http.get<Tests[]>(`${apiUrl}/all_asignacion/show`)
  }
  getAllWhereUO (): Observable<Tests[]> {
    return this.http.get<Tests[]>(`${apiUrl}/all_descargo/show`)
  }
  getAllWhereAD (): Observable<Tests[]> {
    return this.http.get<Tests[]> (`${apiUrl}/all_AD/show`)
  }
  getAllWhereDBN (): Observable<Tests[]> {
    return this.http.get<Tests[]> (`${apiUrl}/all_descargoBN/show`)
  }
  getAllWhereNOBN (): Observable<Tests[]> {
    return this.http.get<Tests[]> (`${apiUrl}/all_descargoNOBN/show`)
  }
  
}

