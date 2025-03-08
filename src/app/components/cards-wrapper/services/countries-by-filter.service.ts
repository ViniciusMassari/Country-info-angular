import {
  HttpClient,
  type HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, retry, throwError, timer } from 'rxjs';
import type { CountryCardDetails } from 'src/types/countryCardDetails';

@Injectable({ providedIn: 'root' })
export class CountriesByFilterService {
  private http = inject(HttpClient);

  getCountriesByFilter(filter: string) {
    const COUNTRY_BY_REGION_FILTER_ENDPOINT =
      filter && filter !== ''
        ? `https://restcountries.com/v3.1/region/${filter}`
        : 'https://restcountries.com/v3.1/all';
    const params = new HttpParams().set(
      'fields',
      'flags,name,capital,region,population'
    );
    return this.http.get<CountryCardDetails[]>(
      COUNTRY_BY_REGION_FILTER_ENDPOINT,
      {
        params,
      }
    );
  }
}
