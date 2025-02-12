import { Component, input, InputSignal } from '@angular/core';
import { CountryCardDetails } from '../../../types/countryCardDetails';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-country-card',
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './country-card.component.html',
})
export class CountryCardComponent {
  countryCardInfo: InputSignal<CountryCardDetails> = input.required();
}
