import { CountryCardComponent } from '../../src/app/components/country-card/country-card.component';
it('Should mount the component', () => {
  cy.fixture('countryData.json').then((countryData) => {
    cy.mount(CountryCardComponent, {
      componentProperties: {
        countryCardInfo: countryData,
      },
    }).as('countryCard');
  });
  cy.getDataTest('country-name').should('contain.text', 'South Georgia');
});
