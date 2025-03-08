import {
  Component,
  inject,
  type OnDestroy,
  signal,
  type WritableSignal,
} from '@angular/core';
import { NgFor, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import type { CountryDetails } from 'src/types/countryDetails';
import { CountryDetailsService } from './service/country-details.service';
import { fromEvent, lastValueFrom, takeUntil } from 'rxjs';
import { injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
@Component({
  selector: 'app-country-details',
  imports: [NgOptimizedImage, NgFor],
  templateUrl: './country-details.component.html',
})
export class CountryDetailsComponent implements OnDestroy {
  protected errorMessage: WritableSignal<string> = signal('');
  public countryData: WritableSignal<CountryDetails | null> = signal(null);
  protected currencyKeys: string[] = [];
  protected languagesEntries = '';
  protected borderCountries: string[] = [];

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private queryClient = inject(QueryClient);

  private countryDetailsService = inject(CountryDetailsService);

  private param: string = this.activatedRoute.snapshot.params['name'];

  query = injectQuery(() => ({
    queryKey: ['country'],
    queryFn: ({ signal }) => {
      console.log(this.param);

      const abort$ = fromEvent(signal, 'abort');
      return lastValueFrom(
        this.countryDetailsService
          .getCountryDetailsByCountryName(this.param)
          .pipe(takeUntil(abort$))
      );
    },
    retry: 3,
    retryDelay: 2000,
  }));

  ngOnDestroy() {
    this.queryClient.invalidateQueries({
      queryKey: ['country'],
    });
  }

  goBack() {
    this.router.navigateByUrl('/home');
  }
}
