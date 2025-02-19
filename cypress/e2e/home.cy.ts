describe('Home page e2e test', () => {
  it("Should render home page, search for 'Brazil' and render country detail screen", () => {
    cy.visit('/');

    cy.getDataTest('input').as('searchInput');

    cy.get('@searchInput').type('Brazil');

    cy.getDataTest('sendButton').click();

    cy.visit('/country/brazil');
  });
});
