describe("FAQ page tests", () => {
  //will be tested only for SOLR as functionality is same

  beforeEach(() => {
    cy.visit(`${Cypress.env("baseUrl")}faqs`);
    cy.wait(1000);
  });

  it("TCM-829 FAQ Page: Navigation @SOLR @SMOKE", () => {
    cy.url().should("include", "faqs");
    cy.loginAdmin();
    cy.url().should("include", "faqs");
  });

  it("TCM-830FAQ Page: Structure and main elements check @SOLR", () => {
    cy.get("#faq-header")
      .should("be.visible")
      .invoke("text")
      .should("include", "How can we help you?");

    cy.get("#faq-search-text-input")
      .should("be.visible")
      .should("have.attr", "placeholder");
    cy.get('[data-test="faq-topics"]').should("be.visible");
  });
});
