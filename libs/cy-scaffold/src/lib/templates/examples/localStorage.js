/*
  @ cy.restoreLocalStorage() & cy.saveLocalStorage()
    Are custom Cypress commands that we have generated for you in cypress/support/commands.js
*/

describe("Local Storage", () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("saves the data to localStorage", () => {});
});
