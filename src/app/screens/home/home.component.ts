import { ChangeDetectionStrategy, Component, OnChanges } from '@angular/core';
import { CountryCardComponent } from '../../components/country-card/country-card.component';
import { CountryCardDetails } from '../../../types/countryCardDetails';
import { SearchComponent } from '../../components/search/search.component';
import { CardsWrapperComponent } from '../../components/cards-wrapper/cards-wrapper.component';

@Component({
  selector: 'app-home',
  imports: [CardsWrapperComponent, SearchComponent],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  public filter: string = '';

  changeFilter(event: string) {
    this.filter = event;
  }
}
