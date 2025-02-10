import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { catchError, retry, throwError, timer } from 'rxjs';
import { CountryDetails } from 'src/types/countryDetails';

export const COUNTRY_BY_NAME_ENDPOINT = 'restcountries.com/v3.1/name/' as const;

@Injectable({
  providedIn: 'root',
})
export class CountryDetailsService {
  private http = inject(HttpClient);

  public errorMessage: WritableSignal<string> = signal('');

  getCountryDetailsByCountryName(countryName: string) {
    const params = new HttpParams().set(
      'fields',
      'name,flags,currencies,capital,region,subregion,languages,borders,population'
    );
    return this.http
      .get<CountryDetails>(COUNTRY_BY_NAME_ENDPOINT + countryName, {
        params,
      })
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
    if (error.status === 0) {
      this.errorMessage.set('Connection error, verify your network');
    } else if (error.status === 404) {
      this.errorMessage.set('Country not found, try another search');
    } else {
      this.errorMessage.set(`Error returned from server ${error.status}`);
    }
    return throwError(() => new Error('Unexpected Error, try again later'));
  }
}
