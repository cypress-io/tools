Cypress.Commands.add(
  "login",
  (username, password, { rememberUser = false } = {}) => {
    const signinPath = "/signin";
    const log = Cypress.log({
      name: "login",
      displayName: "LOGIN",
      message: [`🔐 Authenticating | ${username}`],
      autoEnd: false,
    });

    cy.intercept("POST", "/login").as("loginUser");

    cy.location("pathname", { log: false }).then((currentPath) => {
      if (currentPath !== signinPath) {
        cy.visit(signinPath);
      }
    });

    log.snapshot("before");

    cy.get("#username").type(username);
    cy.get("#password").type(password);

    if (rememberUser) {
      cy.get("#remember-me").find("input").check();
    }

    cy.get("#submit").click();

    cy.wait("@loginUser").then((loginUser) => {
      log.set({
        consoleProps() {
          return {
            username,
            password,
            rememberUser,
            userId:
              loginUser.response.statusCode !== 401 &&
              loginUser.response.body.user.id,
          };
        },
      });

      log.snapshot("after");
      log.end();
    });
  }
);
