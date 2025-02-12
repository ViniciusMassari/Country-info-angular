import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import countryData from '../../../assets/mocks/data/countryDetailMockedData.json';
import { NgFor, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CountryDetails } from 'src/types/countryDetails';
import { whereAlpha3 } from 'iso-3166-1';
import { CountryDetailsService } from './service/country-details.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-country-details',
  imports: [NgOptimizedImage, NgFor],
  templateUrl: './country-details.component.html',
})
export class CountryDetailsComponent implements OnInit {
  protected errorMessage: WritableSignal<string> = signal('');
  // mocked data
  // public countryData: CountryDetails = countryData;
  public countryData: WritableSignal<CountryDetails | null> = signal(null);
  protected currencyKeys: string[] = [];
  protected languagesEntries: string = '';
  protected borderCountries: any;

  private countryDetailsService = inject(CountryDetailsService);

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.countryDetailsService
        .getCountryDetailsByCountryName(params['name'])
        .subscribe({
          next: (country) => {
            country.forEach((countryDetails) => {
              this.countryData.set(countryDetails);
              this.borderCountries = countryDetails.borders.map(
                (country) => whereAlpha3(country)?.country
              );

              this.languagesEntries = Object.entries(countryDetails.languages)
                .map((entry) => entry[1])
                .join(', ');

              this.currencyKeys = Object.keys(countryDetails.currencies);
            });
          },
          error: (err: HttpErrorResponse) => {
            console.error(err);

            this.errorMessage.set(err.message);
          },
        });
    });
  }

  goBack() {
    this.router.navigateByUrl('/');
  }
}
