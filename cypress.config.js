const { defineConfig } = require("cypress");
const { beforeEach } = require('mocha');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    charts: true,   
    reportPageTitle: 'Relatório de Testes - Automação WEB',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false
  }
});
