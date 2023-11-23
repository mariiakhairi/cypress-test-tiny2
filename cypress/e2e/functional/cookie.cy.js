import Cookie from "../../support/pageObjects/cookie";

describe("Cockpit tests", () => {
  const cookie = new Cookie();

  beforeEach(() => {
    cy.visit(`${Cypress.env("baseUrl")}`);
  });

  it("TCM-336 Verify that when user click on 'More details...' It will open privacy-policy", () => {
    cookie.getMoreDetails().invoke("removeAttr", "target").click();
    cy.url().should("include", "privacy-policy");
  });

  it("TCM-334 Cookies popup should be visible until user click on OK button. @SMOKE", () => {
    cookie.getPopUp().should("be.visible");
    cookie.getOk().click();
    cookie.getPopUp().should("not.exist");
  });
});
