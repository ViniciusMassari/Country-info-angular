import {
  Component,
  inject,
  input,
  type InputSignal,
  type OnDestroy,
  signal,
  type WritableSignal,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CountryCardComponent } from '../country-card/country-card.component';
import type { CountryCardDetails } from 'src/types/countryCardDetails';
import {
  distinctUntilChanged,
  fromEvent,
  lastValueFrom,
  Subject,
  Subscription,
  takeUntil,
} from 'rxjs';
import { CountriesByFilterService } from './services/countries-by-filter.service';
import { injectQuery } from '@tanstack/angular-query-experimental';

@Component({
  selector: 'app-cards-wrapper',
  imports: [CountryCardComponent],
  templateUrl: './cards-wrapper.component.html',
})
export class CardsWrapperComponent implements OnDestroy {
  #countriesByFilterService = inject(CountriesByFilterService);

  public countryData: WritableSignal<CountryCardDetails[] | null> =
    signal(null);
  #getCountriesDestroy$ = new Subscription();

  public filter: InputSignal<string> = input('');
  public filter$ = toObservable(this.filter);

  #filterDestroy = new Subject<void>();

  query = injectQuery(() => ({
    queryKey: ['countries'],
    queryFn: ({ signal }) => {
      const abort$ = fromEvent(signal, 'abort');
      return lastValueFrom(
        this.#countriesByFilterService
          .getCountriesByFilter(this.filter())
          .pipe(takeUntil(abort$))
      );
    },
  }));

  ngOnInit() {
    // will be called only if filter change
    this.filter$
      .pipe(takeUntil(this.#filterDestroy), distinctUntilChanged())
      .subscribe(() => {
        this.query.refetch();
      });
  }

  ngOnDestroy() {
    this.#filterDestroy.next();
    this.#filterDestroy.complete();
    this.#getCountriesDestroy$.unsubscribe();
  }
}
