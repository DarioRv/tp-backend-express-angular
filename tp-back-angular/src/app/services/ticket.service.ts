import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Ticket } from '../interfaces/ticket.interface';
import { map, Observable } from 'rxjs';
import { BackendResponse } from '../interfaces/backend-response.interface';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private readonly baseUrl = environment.BACKEND_URL + '/tickets';

  constructor(private http: HttpClient) {}

  getAll(params?: any): Observable<Ticket[]> {
    const url = this.baseUrl;

    return this.http
      .get<BackendResponse<Ticket[]>>(url, { params })
      .pipe(map((res) => res.data));
  }

  create(ticket: Ticket): Observable<Ticket> {
    const url = this.baseUrl;

    return this.http
      .post<BackendResponse<Ticket>>(url, ticket)
      .pipe(map((res) => res.data));
  }

  update(ticket: Ticket): Observable<Ticket> {
    const url = `${this.baseUrl}`;

    return this.http
      .patch<BackendResponse<Ticket>>(url, ticket)
      .pipe(map((res) => res.data));
  }

  deleteById(id: string): Observable<boolean> {
    const url = `${this.baseUrl}/${id}`;

    return this.http
      .delete<BackendResponse<boolean>>(url)
      .pipe(map((res) => res.data));
  }

  getById(id: string): Observable<Ticket> {
    const url = `${this.baseUrl}/${id}`;

    return this.http
      .get<BackendResponse<Ticket>>(url)
      .pipe(map((res) => res.data));
  }
}
