const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    baseUrl: "https://app.experiment-oa.zendy.io/",
    API_BASE_URL: "https://api.experiment-oa.zendy.io/",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
