import MulticalendarPage from "../../pages/MulticalendarPage";
import multicalendarLocators from "../../locators/multicalendarLocators";
import DatePickerPage from "../../pages/DatePickerPage";

describe("Multicalendar DSO", () => {
  let dso;

  before(() => {
    cy.fixture("dso").then((data) => (dso = data));
  });

  beforeEach(() => {
    cy.login();
    MulticalendarPage.visit();
  });

  describe("Functional", () => {
    it("[drags a DSO value across the calendar grid][updates DSO for a single date and persists after Save]", () => {
      cy.waitForVisible(multicalendarLocators.listingsHeader);
      cy.get(multicalendarLocators.recommendationsClose).click();
      MulticalendarPage.searchListing(dso.listingName)
      cy.wait(20000);
      // cy.waitForVisible(multicalendarLocators.calendarHeaderText("2026-05-31"));
      cy.get(multicalendarLocators.priceCell("VRMREALTY___239", 4)).click();
      // cy.get(multicalendarLocators.datePicker).eq(1).click();
      DatePickerPage.selectSingle("2026-05-31");
      cy.waitForVisible(multicalendarLocators.dsoPriceInput);
      cy.DSOPriceInput(dso["Pricing-percentage"]);
      cy.get(multicalendarLocators.addDsoButton).click();
      cy.confirmDsoOverrideIfPrompted();
    });

    it("[bulk updates DSO for a date range and persists][DSO change reflects in Summary / Final Price]", () => {
      cy.waitForVisible(multicalendarLocators.listingsHeader);
      cy.get(multicalendarLocators.recommendationsClose).click();
      MulticalendarPage.searchListing(dso.listingName)
      cy.wait(20000);
      cy.get(multicalendarLocators.priceCell("VRMREALTY___239", 4)).click();
      DatePickerPage.selectRange("2026-06-01", "2026-06-04");
      cy.waitForVisible(multicalendarLocators.dsoPriceInput);
      cy.DSOPriceInput(dso["Pricing-percentage"]);
      cy.get(multicalendarLocators.addBasePriceButton).click();
      cy.get(multicalendarLocators.dsoBasePriceInput).clear().type(dso.Baseprice);
      cy.get(multicalendarLocators.addDsoButton).click();
      cy.confirmDsoOverrideIfPrompted();
      cy.get(multicalendarLocators.priceCell("VRMREALTY___239", 4)).should("be.visible").and("contain.text", `${dso.Baseprice}`);
    });
  });


  describe("Negative", () => {
    it("rejects out-of-range DSO percentage with an error", () => {
      cy.waitForVisible(multicalendarLocators.listingsHeader);
      cy.get(multicalendarLocators.recommendationsClose).click();
      MulticalendarPage.searchListing(dso.listingName)
      cy.wait(20000);
      cy.get(multicalendarLocators.priceCell("VRMREALTY___239", 4)).click();
      DatePickerPage.selectRange("2026-06-01", "2026-06-04");
      cy.waitForVisible(multicalendarLocators.dsoPriceInput);
      cy.DSOPriceInput(dso["Price-outoffrange"]);
      cy.get(multicalendarLocators.addDsoButton).click();
      cy.get(multicalendarLocators.dsoErrorAlert).should("be.visible");
      cy.log("Please fix the errors to save DSO");

    });
  });
});
