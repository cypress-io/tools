describe("", () => {
  beforeEach(() => {
    cy.intercept("POST", "/endpoint").as("aliasName");
  });

  it("", () => {
    cy.wait("@aliasName");
  });
});
