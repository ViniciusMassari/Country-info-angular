import { Component } from '@angular/core';
import { CountryCardComponent } from '../../components/country-card/country-card.component';
import countryData from '../../../assets/data/countryMockedData.json';
import { CountryCardDetails } from '../../../types/countryCardDetails';

@Component({
  selector: 'app-home',
  imports: [CountryCardComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public countryData: CountryCardDetails[] = countryData;
}
