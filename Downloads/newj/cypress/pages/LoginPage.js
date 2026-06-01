import loginLocators from "../locators/loginLocators";

class LoginPage {
  visit() {
    cy.visit("/signin");
  }

  login(username, password) {
    cy.get(loginLocators.emailInput).clear().type(username);
    cy.get(loginLocators.passwordInput).clear().type(password);
    cy.get(loginLocators.submitButton).first().click();
  }
}

export default new LoginPage();
