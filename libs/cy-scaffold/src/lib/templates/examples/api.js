describe("Users API", () => {
  context("GET /users", () => {
    it("returns a list of all of the users", () => {
      cy.request("GET", "/users").then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });

  context("POST /users", () => {
    it("creates a new user", () => {
      cy.request("POST", "/users").then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });

  context("PATCH /users/:userId", () => {
    it("updates a user", () => {
      cy.request("PATCH", `/users/123`, {
        admin: true,
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });

  context("DELETE /users/:userId", () => {
    it("deletes a user", () => {
      cy.request("DELETE", `/users/123}`).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });
});
