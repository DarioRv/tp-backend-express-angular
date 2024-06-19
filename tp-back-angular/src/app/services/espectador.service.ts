import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
import { BackendResponse } from '../interfaces/backend-response.interface';
import { Espectador } from '../interfaces/espectador.interface';

@Injectable({
  providedIn: 'root',
})
export class EspectadorService {
  private readonly baseUrl = environment.BACKEND_URL + '/espectadores';
  constructor(private htttp: HttpClient) {}

  getAll(): Observable<Espectador> {
    const url = this.baseUrl;

    return this.htttp
      .get<BackendResponse<Espectador>>(url)
      .pipe(map((res) => res.data));
  }

  getById(id: string): Observable<Espectador> {
    const url = `${this.baseUrl}/${id}`;

    return this.htttp
      .get<BackendResponse<Espectador>>(url)
      .pipe(map((res) => res.data));
  }

  create(espectador: Espectador): Observable<Espectador> {
    const url = this.baseUrl;

    return this.htttp
      .post<BackendResponse<Espectador>>(url, espectador)
      .pipe(map((res) => res.data));
  }

  deleteById(id: string): Observable<boolean> {
    const url = `${this.baseUrl}/${id}`;

    return this.htttp
      .delete<BackendResponse<boolean>>(url)
      .pipe(map((res) => res.data));
  }
}
