import { Component, inject } from '@angular/core';
import countryData from '../../../assets/mocks/data/countryDetailMockedData.json';
import { NgFor, NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { CountryDetails } from 'src/types/countryDetails';
import { whereAlpha2, whereAlpha3 } from 'iso-3166-1';
@Component({
  selector: 'app-country-details',
  imports: [NgOptimizedImage, NgFor],
  templateUrl: './country-details.component.html',
})
export class CountryDetailsComponent {
  public countryData: CountryDetails = countryData;
  protected currencyKeys = Object.keys(this.countryData.currencies);
  protected languagesEntries = Object.entries(this.countryData.languages)
    .map((entry) => entry[1])
    .join(', ');
  protected borderCountries = this.countryData.borders.map(
    (country) => whereAlpha3(country)?.country
  );

  private router = inject(Router);

  constructor() {
    console.log(this.borderCountries);
  }

  goBack() {
    this.router.navigateByUrl('/');
  }
}
