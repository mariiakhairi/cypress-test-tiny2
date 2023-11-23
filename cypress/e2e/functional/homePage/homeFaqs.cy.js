import HomePage from "../../../support/pageObjects/homePage";

describe("Check Home page FAQ", () => {
  const home = new HomePage();

  beforeEach(() => {
    cy.visit(`${Cypress.env("baseUrl")}`);
  });

  it("TCM-541 Home Page FAQ: Only logged out user from any region can see the Home Page FAQ @SMOKE", () => {
    cy.scrollTo("bottom");
    home.getFaqs().should("be.visible");
    // skipped till add data-test https://knowledgee.atlassian.net/wiki/spaces/SCIC/pages/edit-v2/2657648645
    // cy.loginAdmin();
    // cy.wait(4000);
    // cy.scrollTo("bottom");
    // home.getFaqs().should("not.be.visible");
  });
});
