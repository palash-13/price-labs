import multicalendarLocators from "../locators/multicalendarLocators";

class MulticalendarPage {
  visit() {
    cy.visit(Cypress.env("multicalendarPath"));
  }

  searchListing(name) {
    cy.get(multicalendarLocators.searchInput).clear().type(name);
  }

  openDateCell(date) {
    cy.get(multicalendarLocators.dateHeader(date)).first().click();
  }

  setDsoValue(value) {
    cy.get(multicalendarLocators.dsoInput).clear().type(value);
  }

  saveOverride() {
    cy.get(multicalendarLocators.popupSaveButton).click();
  }

  saveAndRefresh() {
    cy.get(multicalendarLocators.saveRefreshButton).first().click();
  }

  getToast() {
    return cy.get(multicalendarLocators.toastMessage);
  }
}

export default new MulticalendarPage();
