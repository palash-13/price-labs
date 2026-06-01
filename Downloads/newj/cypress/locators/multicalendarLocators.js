
const multicalendarLocators = {

  listingsHeader: '[qa-id="mc-header-listingName"]',

  searchInput: 'input[placeholder*="Search listings"]',
  saveRefreshButton: 'button:contains("Save & Refresh")',
  addBasePriceButton: '[qa-id="add-base-price-btn"]',
  dsoBasePriceInput: '[qa-id="dso-base-price"]',
  datePicker: '[qa-id="date-picker-default-range"]',
  dsoWarningModalTitle: '[qa-id="dso-warning-modal-title"]',
  recommendationsClose: '[qa-id="recommendations-closed"]',
  dsoErrorAlert: '.chakra-alert__desc[data-status="error"]',
  monthMenuButton: '[qa-id="month-header-menu-button"]',
  monthOption: (yearMonth) => `[qa-id="date-range-picker-month-${yearMonth}"]`,
  dayOption: (ariaLabel) => `.react-datepicker__day[aria-label="${ariaLabel}"]`,
  dateHeader: (date) => `[qa-id="mc-date-header-${date}"]`,
  calendarHeader: (date) => `[qa-id="calendar-header-${date}"]`,
  calendarHeaderText: (date) =>
    `[data-header-id="${date}"] [qa-id="calendar-header-${date}"] .chakra-text`,
  dateCell: (date) => `[data-date="${date}"]`,
  priceCell: (listing, colIndex) =>
    `[qa-id="price-tooltip--${listing}-${colIndex}"]`,
  overridePopup: '[role="dialog"]',
  addDsoButton: '[qa-id="add-dso-button"]',
  dsoPriceInput: '[qa-id="dso-price"]',
  DsoUpdateButton: '[qa-id="dso-override-confirmation-update-button"]',
  popupSaveButton: '[role="dialog"] button:contains("Save")',
  dsoErrorAlert: '.chakra-alert__desc[data-status="error"]',
  toastMessage: ".toast, [role=\"alert\"]",
  dsoErrorAlert: '.chakra-alert__desc[data-status="error"]',
};

export default multicalendarLocators;
