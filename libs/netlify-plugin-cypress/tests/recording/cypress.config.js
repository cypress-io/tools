const { defineConfig } = require("cypress");

module.exports = defineConfig({
  fixturesFolder: false,
  projectId: "ixroqc",

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
