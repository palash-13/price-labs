const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // QA Environment URL
  e2e: {
    baseUrl: "https://pricelabs.co",
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    viewportWidth: 1280,
    viewportHeight: 720,
    screenshotOnRunFailure: true,
    video: false,
    setupNodeEvents(on, config) {
      return config;
    },
  },

  // Mochawesome reporter (screenshots on failure are captured by Cypress)
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "mochawesome-report",
    overwrite: false,
    html: true,
    json: true,
  },

  env: {
    multicalendarPath: "/multicalendar",
  },
});
