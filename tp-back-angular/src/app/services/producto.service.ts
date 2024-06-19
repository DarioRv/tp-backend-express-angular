import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Producto } from '../interfaces/producto.interface';
import { BackendResponse } from '../interfaces/backend-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private readonly baseUrl = `${environment.BACKEND_URL}/productos`;

  constructor(private httpClient: HttpClient) {}

  public getProductos(): Observable<Producto[]> {
    const url = this.baseUrl;
    return this.httpClient.get<BackendResponse<Producto[]>>(url).pipe(
      map((res) => {
        return res.data;
      })
    );
  }

  public getProductosFeatured(): Observable<Producto[]> {
    const url = `${this.baseUrl}/featured`;
    return this.httpClient.get<BackendResponse<Producto[]>>(url).pipe(
      map((res) => {
        return res.data;
      })
    );
  }

  public createProducto(producto: any): Observable<Producto> {
    const url = this.baseUrl;
    return this.httpClient.post<BackendResponse<Producto>>(url, producto).pipe(
      map((res) => {
        return res.data;
      })
    );
  }

  public updateProducto(producto: any): Observable<Producto> {
    const url = `${this.baseUrl}/${producto.id}`;
    return this.httpClient.put<BackendResponse<Producto>>(url, producto).pipe(
      map((res) => {
        return res.data;
      })
    );
  }

  public deleteProducto(id: string): Observable<boolean> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete<BackendResponse<boolean>>(url).pipe(
      map((res) => {
        return res.data;
      })
    );
  }
}
