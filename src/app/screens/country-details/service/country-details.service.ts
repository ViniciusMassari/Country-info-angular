import {
  HttpClient,
  type HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, retry, throwError, timer } from 'rxjs';
import type { CountryDetails } from 'src/types/countryDetails';

export const COUNTRY_BY_NAME_ENDPOINT =
  'https://restcountries.com/v3.1/name/' as const;

@Injectable({
  providedIn: 'root',
})
export class CountryDetailsService {
  private http = inject(HttpClient);

  getCountryDetailsByCountryName(countryName: string) {
    const params = new HttpParams().set(
      'fields',
      'name,flags,currencies,capital,region,subregion,languages,borders,population'
    );
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );
    return this.http.get<CountryDetails[]>(
      COUNTRY_BY_NAME_ENDPOINT + countryName.toLowerCase(),
      {
        params,
        headers,
        responseType: 'json',
      }
    );
  }
}
