// Global support file loaded before every spec.
// Use this for global hooks and custom command imports.

import "./commands";

// Keep tests from failing on app-side uncaught exceptions we don't control.
Cypress.on("uncaught:exception", () => false);
