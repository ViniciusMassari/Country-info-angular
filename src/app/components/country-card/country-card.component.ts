import { Component, input, InputSignal } from '@angular/core';
import { CountryCardDetails } from '../../../types/countryCardDetails';

@Component({
  selector: 'app-country-card',
  imports: [],
  templateUrl: './country-card.component.html',
})
export class CountryCardComponent {
  countryCardInfo: InputSignal<CountryCardDetails> = input.required();
}
