describe("DSO API", () => {
  // DSO / custom pricing override endpoint (POST), confirmed via DevTools > Network.
  const dsoEndpoint = "https://app.pricelabs.co/api/add_custom_pricing";

  // add_custom_pricing payload, captured from the real UI request.
  // The server needs the full body; trimming fields makes the override no-op.
  const dsoPayload = {
    actualStartDate: "2026-06-01",
    actualEndDate: "2026-06-01",
    basePrice: "",
    cacheBuster: Date.now(),
    checkIn: "0000000",
    checkInCheckOutEnabled: false,
    checkOut: "1111111",
    currency: "USD",
    currentRowIndex: 0,
    endDate: "Jun 01 2026",
    hasChildren: false,
    isParentListing: true,
    isPricingPage: false,
    leadTimeExpiry: "",
    listingId: "VRMREALTY___239",
    maxPrice: "",
    maxPriceType: "percent_max",
    minPrice: "",
    minPriceType: "percent_min",
    minStay: "",
    page: "1",
    parentKey: 2102222,
    pmsName: "vrm",
    price: "10", // 10% change
    priceType: "percent",
    reason: "",
    snoozeDso: false,
    startDate: "Jun 01 2026",
    syncChildren: true,
  };

  beforeEach(() => {
    cy.login();
  });

  describe("Functional", () => {
    it("updates a DSO price by 10% and returns success", () => {
      cy.request({
        method: "POST",
        url: dsoEndpoint,
        body: dsoPayload,
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.response.success).to.eq(
          "Your custom prices have been updated."
        );
      });
    });
  });

  describe("Negative", () => {
    it("rejects the request when the session is invalid/expired", () => {
      cy.clearAllCookies();

      cy.request({
        method: "POST",
        url: dsoEndpoint,
        failOnStatusCode: false,
        body: dsoPayload,
      }).then((res) => {
        cy.log(`status: ${res.status}`);
        cy.log(`body: ${JSON.stringify(res.body)}`);
        expect(res.body).to.not.have.nested.property(
          "response.success",
          "Your custom prices have been updated."
        );
      });
    });

       it("rejects an invalid payload", () => {
      cy.request({
        method: "POST",
        url: dsoEndpoint,
        failOnStatusCode: false,
        body: {}, 
      }).then((res) => {
        cy.log(`status: ${res.status}`);
        cy.log(`body: ${JSON.stringify(res.body)}`);
        expect(res.body).to.not.have.nested.property(
          "response.success",
          "Your custom prices have been updated."
        );
      });
    });
  });
});
