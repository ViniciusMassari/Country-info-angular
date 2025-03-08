import { Component, input, type InputSignal } from '@angular/core';
import type { CountryCardDetails } from '../../../types/countryCardDetails';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-country-card',
  imports: [RouterLink],
  templateUrl: './country-card.component.html',
})
export class CountryCardComponent {
  countryCardInfo: InputSignal<CountryCardDetails> = input.required();
}
