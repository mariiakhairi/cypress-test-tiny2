const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 30000,
  waitForAnimations: true,
  animationDistanceThreshold: 1000,
  video: false,
  env: {
    baseUrl: "https://app.experiment-oa.zendy.io/",
    API_BASE_URL: "https://api.experiment-oa.zendy.io/",
  },
  retries: {
    runMode: 1,
  },
  e2e: {
    supportFile: "cypress/support/e2e.js",
  },
});
