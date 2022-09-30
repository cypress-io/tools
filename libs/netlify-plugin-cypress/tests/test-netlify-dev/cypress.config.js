const { defineConfig } = require("cypress");

module.exports = defineConfig({
  fixturesFolder: false,

  e2e: {
    baseUrl: "http://localhost:8888",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
