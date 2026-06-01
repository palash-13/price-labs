import multicalendarLocators from "../locators/multicalendarLocators";
import { toAriaLabel, toYearMonth } from "../support/dateUtils";

// Encapsulates the react-datepicker range picker so tests can just say:
//   DatePicker.selectRange("2026-06-01", "2026-06-15")
//   DatePicker.selectSingle("2026-06-10")
class DatePickerPage {
  open() {
    cy.get(multicalendarLocators.datePicker).eq(1).click();
    return this;
  }

  // Jumps to the month via the dropdown, then clicks the day by its aria-label.
  selectDay(isoDate) {
    cy.get(multicalendarLocators.monthMenuButton).first().click();
    cy.get(multicalendarLocators.monthOption(toYearMonth(isoDate))).click();
    cy.get(multicalendarLocators.dayOption(toAriaLabel(isoDate))).first().click();
    return this;
  }

  selectRange(fromDate, toDate) {
    this.open();
    this.selectDay(fromDate); // range start
    this.selectDay(toDate); // range end
    return this;
  }

  selectSingle(isoDate) {
    this.open();
    this.selectDay(isoDate); // start
    this.selectDay(isoDate); // same day as end
    return this;
  }
}

export default new DatePickerPage();
