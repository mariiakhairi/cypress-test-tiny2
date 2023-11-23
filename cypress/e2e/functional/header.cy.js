import Header from "../../support/pageObjects/header";
import HomePage from "../../support/pageObjects/homePage";

describe("header checks", () => {
  const header = new Header();
  const home = new HomePage();
  const fileName = "logo.svg";

  describe("Check header elements with logged out", () => {
    const appPages = [
      `${Cypress.env("baseUrl")}`,
      `${Cypress.env("baseUrl")}search`,
      `${Cypress.env("baseUrl")}about`,
      `${Cypress.env("baseUrl")}faqs`,
      `${Cypress.env("baseUrl")}publishers`,
      `${Cypress.env("baseUrl")}blog/page/1`,
      `${Cypress.env("baseUrl")}title/10.1108/qae-06-2016-0027`,
    ];
    it("TCM-708 Links in the header home page  @EDS", function () {
      cy.visit(appPages[0]);
      home.getPricingLink().should("exist");
      home.getAboutLink().should("exist");
      home.getContactLink().should("exist");
    });
    it("TCM-708 Links in the header home page  @SOLR", function () {
      cy.visit(appPages[0]);
      // home.getPricingLink().should("not.be.visible");
      home.getAboutLink().should("exist");
      home.getContactLink().should("exist");
    });

    it.only("TCM-464 Logo is visible in the header for logged out user", () => {
      for (let i = 0; i < appPages.length; i++) {
        cy.visit(appPages[i]);

        header.getlogo().should("be.visible");
        header.getlogo().should("have.attr", "href").and("include", "/");
      }
    });

    it("TCM-466 Clicking on Logo redirects user to the home page", () => {
      for (let i = 0; i < appPages.length; i++) {
        cy.visit(appPages[i]);
        header.getlogo().eq(0).click({ force: true });
        home.getHeroImage().should("be.visible");
      }
    });
  });

  describe("Check header elements with logged in user", () => {
    const appPages = [
      `${Cypress.env("baseUrl")}`,
      `${Cypress.env("baseUrl")}search`,
      `${Cypress.env("baseUrl")}profile`,
      `${Cypress.env("baseUrl")}about`,
      `${Cypress.env("baseUrl")}subscriptions`,
      `${Cypress.env("baseUrl")}title/10.1108/qae-06-2016-0027`,
    ];

    beforeEach(() => {
      cy.visit(`${Cypress.env("baseUrl")}`);
      cy.login("autotest1@gmail.com", "Password1234");
    });

    it("TCM-464 Logo is visible in the header for logged in user", () => {
      for (let i = 0; i < appPages.length; i++) {
        cy.visit(appPages[i]);
        header.getlogo().should("be.visible");
        header.getlogo().should("have.attr", "src").and("include", fileName);
      }
    });

    it("TCM-466 Clicking on Logo redirects user to the home page", () => {
      for (let i = 0; i < appPages.length; i++) {
        cy.visit(appPages[i]);
        header.getlogo().eq(0).click({ force: true });
        home.getHeroImage().should("be.visible");
      }
    });

    it("TCM-465 User Menu is visible in the header for logged in user", () => {
      for (let i = 0; i < appPages.length; i++) {
        cy.visit(appPages[i]);
        header.getUserMenu().should("be.visible");
      }
    });
  });
});
