import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
import { Transaccion } from '../interfaces/transaccion.interface';
import { BackendResponse } from '../interfaces/backend-response.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TransaccionService {
  private readonly baseUrl = `${environment.BACKEND_URL}/transacciones`;

  constructor(private http: HttpClient) {}

  getTransacciones(params?: any): Observable<Transaccion[]> {
    const url = this.baseUrl;
    return this.http
      .get<BackendResponse<Transaccion[]>>(url, { params })
      .pipe(map((res) => res.data));
  }

  create(transaccion: Transaccion): Observable<Transaccion> {
    const url = this.baseUrl;
    return this.http
      .post<BackendResponse<Transaccion>>(url, transaccion)
      .pipe(map((res) => res.data));
  }
}
