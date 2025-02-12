import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { catchError, retry, throwError, timer } from 'rxjs';
import { CountryDetails } from 'src/types/countryDetails';

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
    return this.http
      .get<CountryDetails[]>(
        COUNTRY_BY_NAME_ENDPOINT + countryName.toLowerCase(),
        {
          params,
          headers,
          responseType: 'json',
        }
      )
      .pipe(
        retry({
          count: 2,
          delay(error, retryCount) {
            if ([500, 503, 404].includes(error.status)) {
              throw error;
            }
            console.log('Retrying ' + retryCount);
            return timer(2000);
          },
        }),
        catchError(this.handleError.bind(this))
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('handleerror ', error);

    if (error.status === 0) {
      return throwError(
        () => new Error('Network connection error, try again later')
      );
    } else if (error.status === 404) {
      return throwError(
        () => new Error('Country not found, verify the search')
      );
    } else {
      return throwError(() => new Error('Unexpected Error, try again later'));
    }
  }
}
