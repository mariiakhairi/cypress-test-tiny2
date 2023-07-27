describe("homePage", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env("baseUrl")}`);
  });

  it("check url", () => {
    cy.url().should("not.include", "publishers");
  });
});
