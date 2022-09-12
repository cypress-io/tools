describe("Network", () => {
  beforeEach(() => {
    cy.intercept("POST", "/user").as("newUser");
  });

  it("shows the new user's account", () => {
    cy.wait("@newUser");
  });
});
