import LoginPage from "../pages/LoginPage";
import DatePicker from "../pages/DatePickerPage";
import multicalendarLocators from "../locators/multicalendarLocators";


Cypress.Commands.add("login", () => {
  cy.fixture("credentials").then((creds) => {
    cy.session(
      creds.username, // unique id for this session (cache key)
      () => {
        LoginPage.visit();
        LoginPage.login(creds.username, creds.password);
        // make sure login actually finished before caching
        cy.url().should("not.include", "/signin");
        cy.log("✅ Login successful 🎉");
      }
    );
  });
});

Cypress.Commands.add("waitForVisible", (selector, timeout = 15000) => {
  return cy.get(selector, { timeout }).should("be.visible");
});


Cypress.Commands.add("selectDateRange", (fromDate, toDate) => {
  DatePicker.selectRange(fromDate, toDate);
});

Cypress.Commands.add("DSOPriceInput", (value) => {
  cy.get(multicalendarLocators.dsoPriceInput).clear().type(`${value}`);
});


Cypress.Commands.add("confirmDsoOverrideIfPrompted", () => {
  cy.get("body").then(($body) => {
    if ($body.find(multicalendarLocators.dsoWarningModalTitle).length) {
      cy.get(multicalendarLocators.dsoWarningModalTitle)
        .should("be.visible")
        .invoke("text")
        .should("match", /confirm date-specific override/i);
      cy.get(multicalendarLocators.DsoUpdateButton).click();
    }
  });
});