import { Component, input, InputSignal } from '@angular/core';
import { CountryCardComponent } from '../country-card/country-card.component';
import countryData from '../../../assets/data/countryMockedData.json';
import { CountryCardDetails } from '../../../types/countryCardDetails';

@Component({
  selector: 'app-cards-wrapper',
  imports: [CountryCardComponent],
  templateUrl: './cards-wrapper.component.html',
})
export class CardsWrapperComponent {
  public countryData: CountryCardDetails[] = countryData;
  public filter: InputSignal<string> = input('');

  ngOnInit() {
    console.log('valor do filtro ao iniciar', this.filter());
  }

  ngOnChanges() {
    console.log('Houve mudança', this.filter());
  }
}
