import { NavbarComponent } from '../../src/app/components/navbar/navbar.component';
it('Should mount and toggle themes', () => {
  cy.mount(NavbarComponent);
  cy.getDataTest('title').should('have.text', 'Where in the world ?');
  cy.getDataTest('theme-text').should('have.text', 'Dark Theme');

  cy.getDataTest('theme-toggler').click();
  cy.getDataTest('theme-text').should('have.text', 'Light Theme');
  cy.getDataTest('theme-toggler').click();
  cy.getDataTest('theme-text').should('have.text', 'Dark Theme');
});
