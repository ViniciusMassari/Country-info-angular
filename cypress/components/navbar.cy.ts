import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../../src/app/components/navbar/navbar.component';
import { of } from 'rxjs';
it('Should mount and toggle themes', () => {
  cy.mount(NavbarComponent, {
    providers: [
      {
        provide: ActivatedRoute,
        useValue: {
          paramMap: of({ get: () => '' }), // simulate route param because cypress is acusing an inject error, idk why !
          snapshot: { paramMap: { get: () => '' } },
        },
      },
    ],
  });

  cy.getDataTest('title').should('have.text', 'Where in the world ?');
  cy.getDataTest('theme-text').should('have.text', 'Dark Theme');

  cy.getDataTest('theme-toggler').click();
  cy.getDataTest('theme-text').should('have.text', 'Light Theme');
  cy.getDataTest('theme-toggler').click();
  cy.getDataTest('theme-text').should('have.text', 'Dark Theme');
});
