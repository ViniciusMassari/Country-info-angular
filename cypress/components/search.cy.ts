import { SearchComponent } from '../../src/app/components/search/search.component';
import { EventEmitter } from 'stream';
import { createOutputSpy } from 'cypress/angular';
it('Search component Test:', () => {
  cy.mount(SearchComponent, {
    componentProperties: {
      filterValue: createOutputSpy('filterOutputSpy'),
    },
  });
  cy.should('exist');
  cy.getDataTest('input').as('countryInput');
  cy.getDataTest('sendButton').as('sendButton');
  // Input is empty
  cy.get('@countryInput').should('be.empty');
  cy.get('@sendButton').should('be.disabled');
  // Testing validation
  cy.get('@countryInput').then(($input) => {
    cy.wrap($input).type('br');
    cy.wrap($input).blur();
    cy.wrap($input).should('have.class', 'ng-invalid');
    cy.get('@sendButton').should('be.disabled');

    // Good Validation
    cy.wrap($input).clear();
    cy.wrap($input).type('Brazil');

    cy.wrap($input).should('not.have.class', 'ng-invalid');
    cy.get('@sendButton').should('not.be.disabled');
  });

  // Testing filter selector
  cy.getDataTest('filterSelector').as('filterSelector');

  cy.get('@filterSelector').then(($select) => {
    cy.wrap($select).should('have.value', '');
    cy.wrap($select).select('America');
    cy.get('@filterOutputSpy').should('have.been.called');
    cy.wrap($select).should('have.value', 'America');
  });
});
