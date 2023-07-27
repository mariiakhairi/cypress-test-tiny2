describe("Publishers Partners", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env("baseUrl")}publishers`);
  });

  it("check url", () => {
    cy.url().should("include", "publishers");
  });
});
