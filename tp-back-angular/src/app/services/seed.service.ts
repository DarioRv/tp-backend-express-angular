import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SeedService {
  private baseUrl = environment.BACKEND_URL;

  constructor(private http: HttpClient) {}

  seed(): Observable<string> {
    const url = `${this.baseUrl}/seed`;
    return this.http.get<string>(url);
  }

  clean(): Observable<string> {
    const url = `${this.baseUrl}/clean`;
    return this.http.get<string>(url);
  }
}
