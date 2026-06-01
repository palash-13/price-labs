describe("Authentication", () => {
  context("Valid credentials", () => {
    it("logs into PriceLabs and lands in the app", () => {
      cy.login();
      cy.url().should("not.include", "/signin");
    });
  });
});
