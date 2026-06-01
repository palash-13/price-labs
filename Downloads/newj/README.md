# PriceLabs Automation QA

Cypress automation (UI + API) for the **PriceLabs Multicalendar – Date Specific Override (DSO)**
feature. Tests are written in JavaScript using the **Page Object Model (POM)** with a separate
locators layer and data-driven fixtures.

## What this project covers

### UI tests — `cypress/e2e/ui/multicalendar-dso.cy.js`
End-to-end DSO flow through the browser:

- **Login** via a reusable `cy.login()` session.
- Search for a listing on the Multicalendar.
- Open the DSO editor by clicking a **price cell** in the calendar grid.
- Enter a **percentage** price change and/or a **base price (USD)**.
- Apply the override and confirm the "Confirm Date-specific Override" modal.
- **Negative test**: enter an out-of-range value and assert the validation error
  ("Please fix the errors to save DSO").

### API tests — `cypress/e2e/api/dso-api.cy.js`
Direct tests against the `POST /api/add_custom_pricing` endpoint using `cy.request()`:

- **Functional**: apply a 10% DSO and assert `200` + `"Your custom prices have been updated."`
- **Negative**: invalid/expired session (cookies cleared) and malformed payloads
  must not apply the override.

> Auth is session-cookie based (via `cy.login()`), not a bearer token.

## Project structure

```
cypress/
  e2e/
    auth/login.cy.js              # login test
    ui/multicalendar-dso.cy.js    # UI DSO tests (Functional / Negative)
    api/dso-api.cy.js             # API tests for /api/add_custom_pricing
  pages/                          # Page Objects – action methods only
    LoginPage.js
    MulticalendarPage.js
    DatePickerPage.js
  locators/                       # Selectors only (no logic)
    loginLocators.js
    multicalendarLocators.js
  fixtures/                       # Data-driven test inputs
    credentials.json
    dso.json
  support/
    commands.js                   # custom commands (cy.login, cy.DSOPriceInput, etc.)
    dateUtils.js                  # date string helpers
cypress.config.js
```

## Key building blocks

- **Custom commands** (`support/commands.js`):
  - `cy.login()` – cached login session.
  - `cy.waitForVisible(selector)` – dynamic, retry-based wait (no fixed `cy.wait`).
  - `cy.DSOPriceInput(value)` – types into the DSO % price input.
  - `cy.confirmDsoOverrideIfPrompted()` – confirms the override modal only if it appears.
- **Locators** (`locators/multicalendarLocators.js`): all selectors are centralized and
  prefer the stable `qa-id` attribute over generated CSS classes.
- **Fixtures** (`fixtures/dso.json`): listing name, pricing percentage, base price, and
  invalid values used across tests.

## Setup

```bash
npm install
```

## Run

```bash
npm run cy:open    # interactive runner
npm run cy:run     # headless
```
