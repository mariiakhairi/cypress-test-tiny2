import HomePage from "../../../support/pageObjects/homePage";

describe("Check publishers section tests", () => {
  const home = new HomePage();

  beforeEach(() => {
    cy.visit(`${Cypress.env("baseUrl")}`);
  });

  it("TCM-553 HP Publishers: user sees before after login @SMOKE", () => {
    home.getPublishers().should("be.visible");
    cy.loginAdmin();
    cy.wait(4000);
    home.getPublishers().should("be.visible");
  });
});
