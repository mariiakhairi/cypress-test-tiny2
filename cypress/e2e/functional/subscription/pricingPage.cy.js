describe("Pricing Page @SOLR", function () {
  beforeEach(() => {
    cy.visit(`${Cypress.env("baseUrl")}pricing`);
  });

  it("TCM-229 Pricing page should available for EDS and solar based region where premium contents are there.@SOLR", () => {
    cy.get('[data-test="pricing-tryZendy_title"]')
      .eq(0)
      .invoke("text")
      .should("eql", "Try Zendy for Free");
  });

  it("TCM-230 After plan selection, the user is able to sign-up/log in and should be redirected to the “Subscription” page", () => {
    cy.login(
      `${Cypress.env("ADMIN_USER_EMAIL")}`,
      `${Cypress.env("ADMIN_USER_PASSWORD")}`
    );
  });
});
