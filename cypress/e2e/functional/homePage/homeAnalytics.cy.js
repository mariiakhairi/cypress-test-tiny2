import HomePage from "../../../support/pageObjects/homePage";

describe("Check analytics - statistic numbers section visibility", () => {
  const home = new HomePage();

  beforeEach(() => {
    cy.visit(`${Cypress.env("baseUrl")}`);
  });

  it("TCM-598 HP Analytics: visible only for the logged out user", () => {
    home.getAnalytics().should("have.length", 1);
    home.getAnalytics().should("be.visible");
    cy.loginAdmin();
    cy.wait(4000);
    home.getAnalytics().should("not.exist");
  });
});
