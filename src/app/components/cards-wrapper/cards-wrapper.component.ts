import {
  Component,
  inject,
  input,
  InputSignal,
  OnDestroy,
  signal,
  WritableSignal,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CountryCardComponent } from '../country-card/country-card.component';
import { CountryCardDetails } from 'src/types/countryCardDetails';
import { distinctUntilChanged, Subject, Subscription, takeUntil } from 'rxjs';
import { CountriesByFilterService } from './services/countries-by-filter.service';

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
  protected errorMessage = '';

  ngOnInit() {
    this.#getCountriesDestroy$ = this.#countriesByFilterService
      .getCountriesByFilter(this.filter())
      .subscribe({
        next: (countries) => this.countryData.set(countries),
        error: (error: Error) => {
          this.errorMessage = error.message;
        },
      });

    // will be called only if filter change
    this.filter$
      .pipe(takeUntil(this.#filterDestroy), distinctUntilChanged())
      .subscribe((filter) => {
        this.#getCountriesDestroy$ = this.#countriesByFilterService
          .getCountriesByFilter(filter)
          .subscribe({
            next: (countries) => this.countryData.set(countries),
            error: (error: Error) => {
              this.errorMessage = error.message;
            },
          });
      });
  }

  ngOnDestroy() {
    this.#filterDestroy.next();
    this.#filterDestroy.complete();
    this.#getCountriesDestroy$.unsubscribe();
  }
}
