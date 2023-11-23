import About from "../../support/pageObjects/about";
import LoginAndRegistration from "../../support/pageObjects/loginRegistration";
import HomePage from "../../support/pageObjects/homePage";
import Header from "../../support/pageObjects/header";

describe("About us tests", () => {
  const header = new Header();
  const about = new About();
  const login = new LoginAndRegistration();
  const home = new HomePage();

  const fixture = "appPages/about";

  it("TCM-610 About us: text check @SMOKE", () => {
    cy.fixture(fixture).then((aboutData) => {
      cy.visit(`${Cypress.env("baseUrl")}about`);
      about.getHeroTitle().contains(aboutData.header);
      for (let i = 0; i < aboutData.paragraphAbout.length; i++) {
        about.getHeroText().contains(aboutData.paragraphAbout[i]);
      }
      about.getButton().contains(aboutData.button);
      about.getBoxTitle().contains(aboutData.whereHeader);
      // https://knowledgee-team.monday.com/boards/673964798/pulses/5251656007
      //about.getBoxText().contains(aboutData.whereText);
      for (let i = 1; i < aboutData.whereParagraph.length; i++) {
        about.getWhereText().contains(aboutData.whereParagraph[i]);
      }
      about.getFeaturedSection().should("be.visible");
      about.getWhyHeader().contains(aboutData.whyHeader);
      about.getWhyParagraph().contains(aboutData.whyParagraph);
      about.getWhyParagraph().contains(aboutData.whyParagraph2);
    });
  });

  it("TCM-827 About us: navigation desktop @EDS", () => {
    cy.visit(`${Cypress.env("baseUrl")}`);
    home.getAboutLink().click();
    cy.url().should("include", "about");
  });

  it("TCM-828 About us: navigation mobile @EDS", () => {
    cy.viewport(`${Cypress.env("screen")}`);
    cy.visit(`${Cypress.env("baseUrl")}`);
    header.getUserMenuMobile().click();
    home.getAboutLinkMobile().click();
    cy.url().should("include", "about");
  });

  it("TCM-578 About us: Sign up button opens the sign up form", () => {
    cy.visit(`${Cypress.env("baseUrl")}about`);
    about.getButton().click();
    login.getSignUpButton().should("be.visible");
  });
});
