import HomePage from "../../../support/pageObjects/homePage";
import Search from "../../../support/pageObjects/searchPage";

describe("What can you find cases", () => {
  const home = new HomePage();
  const search = new Search();
  const searchTerm = "*";

  beforeEach(() => {
    cy.visit(`${Cypress.env("baseUrl")}`);
  });

  it("TCM-563 HP What can be found on Zendy: Visible in all regions for the logged out user", () => {
    home.getWhatCanYouFind().should("be.visible");
    cy.loginAdmin();
    cy.wait(4000);
    home.getWhatCanYouFind().should("not.exist");
  });

  it.skip("TCM-567 HP What can be found on Zendy: Start researching with Zendy button - possible bug", () => {
    //needs fixes
    home.getStartRecerchingBtn().click();
    cy.wait(4000);
    search.getSearchField().should("have.value", searchTerm);
  });
});
