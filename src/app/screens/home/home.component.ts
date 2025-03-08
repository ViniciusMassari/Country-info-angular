import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchComponent } from '../../components/search/search.component';
import { CardsWrapperComponent } from '../../components/cards-wrapper/cards-wrapper.component';

@Component({
  selector: 'app-home',
  imports: [CardsWrapperComponent, SearchComponent],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  public filter = '';

  changeFilter(event: string) {
    this.filter = event;
  }
}
