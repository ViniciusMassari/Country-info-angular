import { CountryDetailsComponent } from '../../src/app/screens/country-details/country-details.component';
it('Screen: Country Detail: unit test', () => {
  cy.mount(CountryDetailsComponent);
  cy.should('exist');
  cy.url().then((url) => {
    expect(url.toLowerCase()).to.contain('country');
  });
});
