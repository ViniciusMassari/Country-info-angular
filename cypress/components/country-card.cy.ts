import { of } from 'rxjs';
import { CountryCardComponent } from '../../src/app/components/country-card/country-card.component';
import { ActivatedRoute } from '@angular/router';
it('Should mount the component', () => {
  cy.fixture('countryData.json').then((countryData) => {
    cy.mount(CountryCardComponent, {
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => 'South Georgia' }), // simulate route param
            snapshot: { paramMap: { get: () => 'South Georgia' } }, // simulate  this.activatedRoute.params.subscribe() call
          },
        },
      ],
      componentProperties: {
        countryCardInfo: countryData,
      },
    }).as('countryCard');
  });
  cy.getDataTest('country-name').should('contain.text', 'South Georgia');
});
