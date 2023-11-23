import Permalink from "../../support/pageObjects/permalink";
import LoginAndRegistration from "../../support/pageObjects/loginRegistration";

describe("Search Page › Permalink page", function () {
  const permalink = new Permalink();
  const login = new LoginAndRegistration();
  const fixture = "appPages/permalinkStrings";

  beforeEach(() => {
    cy.visit(`${Cypress.env("baseUrl")}`);
  });

  it.skip("TCM-747 Permalink details @SOLR", () => {
    cy.fixture(fixture).then((data) => {
      cy.loginAdminApi();
      cy.wait(5000);
      cy.visit(`${Cypress.env("baseUrl")}` + data.SOLRLink);
      cy.wait(2000);
      //Verify the url
      cy.url().should("include", data.SOLRLink);

      //Verify the title displayed
      permalink.getPermalinkItemTitle().contains(data.solr[0]);

      //Verify the author details displayed
      permalink.getPermalinkItem().contains(data.lables[0]);
      permalink.getPermalinkItem().contains(data.solr[1]);

      //Verify the Publication year displayed
      permalink.getPermalinkItem().contains(data.lables[1]);
      permalink.getPermalinkItem().contains(data.solr[2]);

      //Verify the Publication title displayed
      permalink.getPermalinkItem().contains(data.lables[2]);
      permalink.getPermalinkItem().contains(data.solr[3]);

      //Verify the Resource type displayed
      permalink.getPermalinkItem().contains(data.lables[3]);
      permalink.getPermalinkItem().contains(data.solr[4]);

      //Verify the Subject(s) displayed
      permalink.getPermalinkItem().contains(data.lables[4]);
      permalink.getPermalinkItem().contains(data.solr[5]);

      //Verify the Language(s) displayed
      permalink.getPermalinkItem().contains(data.lables[5]);
      permalink.getPermalinkItem().contains(data.solr[6]);

      //Verify the eISSN dispalyed
      permalink.getPermalinkItem().contains(data.lables[6]);
      permalink.getPermalinkItem().contains(data.solr[7]);

      //Verify the pISSN dispalyed
      permalink.getPermalinkItem().contains(data.lables[7]);
      permalink.getPermalinkItem().contains(data.solr[8]);

      //Verify the DOI dispalyed
      permalink.getPermalinkItem().contains(data.lables[8]);
      permalink.getPermalinkItem().contains(data.solr[9]);

      //Verify the Read button is present
      permalink.getReadButtonPermalink().contains("Read");
    });
  });
  it.skip("TCM-448	Cite and export functionality working on the permalink page for the logged in user @SOLR", () => {
    cy.fixture(fixture).then((data) => {
      cy.loginAdminApi();
      cy.wait(5000);
      cy.visit(`${Cypress.env("baseUrl")}` + data.SOLRLink);
      //check cite button is present an clicking the button opens popup with details
      permalink
        .getCiteButtonPermalink()
        .find("span")
        .contains("Cite")
        .click({ force: true });
      permalink.getHeaderPopup().contains("Cite");
      permalink.getCiteContent().contains(data.citeTextSOLR);
      permalink.getCloseBtn().click();
      cy.wait(2000);

      //check export button is present an clicking the button opens popup with details
      permalink
        .getExportButtonPermalink()
        .find("span")
        .contains("Export")
        .click({ force: true });
      permalink.getHeaderPopup().contains("Export");
      permalink.getCiteContent().contains(data.exportTextSOLR);
      permalink.getCloseBtn().click();
    });
  });
  it.skip("TCM-324	Permalink: check the design for logged out user @SOLR", () => {
    cy.fixture(fixture).then((data) => {
      cy.visit(`${Cypress.env("baseUrl")}` + data.SOLRLink);

      // check url include id or not
      cy.url().should("include", data.SOLRLink);
      cy.wait(3000);

      //check Read, cite and export buttons are displayed
      permalink.getReadButtonPermalink().contains("Read");
      permalink.getCiteButtonPermalink().find("span").contains("Cite");
      permalink.getExportButtonPermalink().find("span").contains("Export");

      //Check the info message and signup button text
      permalink
        .getInfoMessage()
        .invoke("text")
        .should("be.eql", data.infoMessageGuestSOLR[0]);
      permalink.getPermaSignupButton().contains("Sign up to Zendy");
    });
  });
  it.skip("TCM-449	Cite and export functionality not available for the logged out user @SOLR", () => {
    cy.visit(`${Cypress.env("baseUrl")}logout`);
    cy.wait(2000);

    cy.fixture(fixture).then((data) => {
      cy.visit(`${Cypress.env("baseUrl")}` + data.SOLRLink);
    });
    //when logged out user clicks on Export button, he sees the login form
    permalink
      .getExportButtonPermalink()
      .find("span")
      .contains("Export")
      .click({ force: true });
    login.getLoginFormHeader().should("be.visible");
  });
  it.skip("TCM-765 Perma link page should redirect to pdf viewer page if pdf is available", () => {
    cy.fixture(fixture).then((data) => {
      cy.visit(`${Cypress.env("baseUrl")}` + data.urlWithPdf);
      cy.wait(3000);
      // check url include title
      cy.url().should("include", "pdf-viewer");
    });
  });
  it.skip("TCM-766 PDF viewer link should redirect to perma link page if the article doesn't have pdf", () => {
    cy.fixture(fixture).then((data) => {
      cy.visit(`${Cypress.env("baseUrl")}` + data.urlWithoutPDF);
      cy.wait(3000);
      // check url include title
      cy.url().should("include", "title");
    });
  });
  it.skip("TCM-747 Permalink details @EDS", () => {
    cy.fixture(fixture).then((data) => {
      cy.loginAdminApi();
      cy.wait(5000);
      cy.visit(`${Cypress.env("baseUrl")}` + data.EDSLink);
      cy.wait(2000);
      //Verify the url
      cy.url().should("include", data.EDSLink);

      //Verify the title displayed
      permalink.getPermalinkItemTitle().contains(data.eds[0]);

      //Verify the author details displayed
      permalink.getPermalinkItem().contains(data.lables[0]);
      permalink.getPermalinkItem().contains(data.eds[1]);

      //Verify the Publication year displayed
      permalink.getPermalinkItem().contains(data.lables[1]);
      permalink.getPermalinkItem().contains(data.eds[2]);

      //Verify the Resource type displayed
      permalink.getPermalinkItem().contains(data.lables[3]);
      permalink.getPermalinkItem().contains(data.eds[3]);

      //Verify the Languages(s) displayed
      permalink.getPermalinkItem().contains(data.lables[5]);
      permalink.getPermalinkItem().contains(data.eds[5]);

      //Verify the ISBN displayed
      permalink.getPermalinkItem().contains(data.lables[9]);
      permalink.getPermalinkItem().contains(data.eds[6]);

      //Verify the Read button is present
      permalink.getReadButtonPermalink().contains("Read");
    });
  });
  it.skip("TCM-448	Cite and export functionality working on the permalink page for the logged in user @EDS", () => {
    cy.fixture(fixture).then((data) => {
      cy.loginAdminApi();
      cy.wait(5000);
      cy.visit(`${Cypress.env("baseUrl")}` + data.EDSLink);

      //check cite button is present an clicking the button opens popup with details
      permalink
        .getCiteButtonPermalink()
        .find("span")
        .contains("Cite")
        .click({ force: true });
      permalink.getHeaderPopup().contains("Cite");
      permalink.getCiteContent().contains(data.citeTextEDS);
      permalink.getCloseBtn().click();
      cy.wait(2000);

      //check export button is present an clicking the button opens popup with details
      permalink
        .getExportButtonPermalink()
        .find("span")
        .contains("Export")
        .click({ force: true });
      permalink.getHeaderPopup().contains("Export");
      permalink.getCiteContent().contains(data.exportTextEDS);
      permalink.getCloseBtn().click();
    });
  });
  it.skip("TCM-324	Permalink: check the design for logged out user @EDS", () => {
    cy.fixture(fixture).then((data) => {
      cy.visit(`${Cypress.env("baseUrl")}` + data.EDSLink);

      // check url include id or not
      cy.url().should("include", data.EDSLink);
      cy.wait(3000);
      permalink.getReadButtonPermalink().contains("Read");

      //check Read, cite and export buttons are displayed
      permalink.getReadButtonPermalink().contains("Read");
      permalink.getCiteButtonPermalink().find("span").contains("Cite");
      permalink.getExportButtonPermalink().find("span").contains("Export");

      //Check the info message and signup button text
      permalink
        .getInfoMessage()
        .invoke("text")
        .should("be.eql", data.infoMessageGuestEDS);
      permalink.getPermaSignupButton().contains("Start your free trial!");
    });
  });
  it.skip("TCM-449	Cite and export functionality not available for the logged out user @EDS", () => {
    cy.fixture(fixture).then((data) => {
      cy.visit(`${Cypress.env("baseUrl")}` + data.EDSLink);
    });
    //when logged out user clicks on Export button, he sees the login form
    permalink
      .getExportButtonPermalink()
      .find("span")
      .contains("Export")
      .click({ force: true });
    login.getLoginFormHeader().should("be.visible");
  });
  it.skip("TCM-116 Permalink: User is logged in and trial/subscription finished @EDS", () => {
    cy.visit(`${Cypress.env("baseUrl")}logout`);
    cy.loginNoTrialUser();
    cy.fixture(fixture).then((data) => {
      cy.visit(`${Cypress.env("baseUrl")}` + data.EDSLink);

      permalink
        .getInfoMessage()
        .invoke("text")
        .should("be.eql", data.infoMessageGuestEDSTrailEnd);
      permalink.getPermaSignupButton().contains("Subscribe now!");
    });
  });
});
