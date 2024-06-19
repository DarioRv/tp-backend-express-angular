import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConvertRequest } from '../interfaces/convert-request.interface';
import { map, Observable } from 'rxjs';
import { ConvertResponse } from '../interfaces/convert-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ConversionDivisas {
  private readonly baseUrl =
    'https://currency-conversion-and-exchange-rates.p.rapidapi.com';

  constructor(private http: HttpClient) {}

  convert(convertRequest: ConvertRequest): Observable<number> {
    const url = `${this.baseUrl}/convert`;

    const headers = new HttpHeaders({
      'x-rapidapi-key': 'd5958d7e67mshed5cdfa08c6a56bp14686bjsn051dc6ddbe7a',
      'x-rapidapi-host':
        'currency-conversion-and-exchange-rates.p.rapidapi.com',
    });

    return this.http
      .get<ConvertResponse>(url, {
        headers,
        params: { ...convertRequest },
      })
      .pipe(map((res) => res.result));
  }
}
