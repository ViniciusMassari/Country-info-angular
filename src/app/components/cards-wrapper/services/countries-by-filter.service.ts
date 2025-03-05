import {
  HttpClient,
type  HttpErrorResponse,
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
    return this.http
      .get<CountryCardDetails[]>(COUNTRY_BY_REGION_FILTER_ENDPOINT, {
        params,
      })
      .pipe(
        retry({
          count: 2,
          delay(error, retryCount) {
            if ([500, 503, 404].includes(error.status)) {
              throw error;
            }
            console.log(`Retrying ${retryCount}`);
            return timer(2000);
          },
        }),
        catchError(this.handleError.bind(this))
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      return throwError(
        () => new Error('Network connection error, try again later')
      );
    }if (error.status === 404) {
      return throwError(
        () => new Error('Countries not found, try another filter')
      );
    }
      return throwError(() => new Error('Unexpected Error, try again later'));
  }
}
