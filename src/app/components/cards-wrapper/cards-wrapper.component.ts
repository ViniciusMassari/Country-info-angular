import {
  Component,
  effect,
  inject,
  input,
  InputSignal,
  OnDestroy,
  signal,
  WritableSignal,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CountryCardComponent } from '../country-card/country-card.component';
import countryData from '../../../assets/mocks/data/countryMockedData.json';
import { CountryCardDetails } from 'src/types/countryCardDetails';
import { distinctUntilChanged, Subject, Subscription, takeUntil } from 'rxjs';
import { CountriesByFilterService } from './services/countries-by-filter.service';

@Component({
  selector: 'app-cards-wrapper',
  imports: [CountryCardComponent],
  templateUrl: './cards-wrapper.component.html',
})
export class CardsWrapperComponent implements OnDestroy {
  // Mock data
  public countryDataMock: CountryCardDetails[] = countryData;

  #countriesByFilterService = inject(CountriesByFilterService);

  public countryData: WritableSignal<CountryCardDetails[] | null> =
    signal(null);
  #getCountriesDestroy$ = new Subscription();

  public filter: InputSignal<string> = input('');
  public filter$ = toObservable(this.filter);
  #filterDestroy = new Subject<void>();
  protected errorMessage = '';

  ngOnInit() {
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
