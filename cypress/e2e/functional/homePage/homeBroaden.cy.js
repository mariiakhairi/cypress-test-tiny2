import HomePage from "../../../support/pageObjects/homePage";

describe("Home Page - Broaden your research section", () => {
  const home = new HomePage();
  const fixture = "appPages/homeStrings";

  beforeEach(() => {
    cy.visit(`${Cypress.env("baseUrl")}`);
  });

  it("TCM-568 Broaden your research section", () => {
    home.getBrodenSearchTitles().should("have.length", 12);
    cy.fixture(fixture).then((homeData) => {
      home.getBroadenSectionTitle().contains(homeData.broadenYourResearchText);
      for (let i = 0; i < homeData.broadenSearchTopicsTitle.length; i++) {
        home
          .getBrodenSearchTitles()
          .contains(homeData.broadenSearchTopicsTitle[i]);
      }
    });
    home.getBrodenSearchTitles().eq(1).click();
    cy.wait(2000);
    cy.url().should("include", "/search?");
  });
});
