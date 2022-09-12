/*
  @ cy.login()
    Is a custom Cypress command that we have generated for you in cypress/support/commands.js
    Make sure to update the command for your application's specific needs
*/

describe("User Signup and Login", () => {
  beforeEach(() => {
    cy.visit("");
  });

  it("should redirect unauthenticated users to the login page", () => {
    // Visit a protected page that only users who have been authenticated can access
    cy.visit("/account");
    // Then verify that the application redirects the users to the login page
    cy.location("pathname").should("equal", "/login");
  });

  it("should redirect to the ___ page after login", () => {
    // Make sure to update the "username" and "password" values to match your application's credentials
    cy.login("username", "password", { rememberUser: true });
    // Then verify that the application redirects the users to the protected page
    cy.location("pathname").should("equal", "/account");
  });

  it("should allow a user to sign-up, login, and logout", () => {});

  it("should display login errors", () => {});

  it("should display signup errors", () => {});

  it("should error for an invalid user", () => {});

  it("should error for an invalid password for an existing user", () => {});
});
