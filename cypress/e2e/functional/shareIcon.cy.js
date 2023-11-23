import Search from "../../support/pageObjects/searchPage";
import Permalink from "../../support/pageObjects/permalink";

describe("Share Icon > Search Page and Permalink page", function () {
  const search = new Search();
  const permalink = new Permalink();
  const fixture = "appPages/permalinkStrings";

  function checkShare() {
    //check share icon is visible
    permalink.getShareIcon().should("be.visible").click({ force: true });
    //click on share icon
    cy.wait(3000);

    //check facebook,likendin,twitter,copy option availble
    permalink.getShareFacbookIcon().should("be.visible");
    permalink.getShareLinkedInIcon().should("be.visible");
    permalink.getShareTwitterIcon().should("be.visible");
    permalink.getCopyIcon().should("be.visible");
  }

  function checkArabicShare() {
    search.getMoredetailsButton().click({ force: true });
    search.getLanguage().contains("Arabic");
    //check the share icon is displayed in the left
    permalink.getShareIcon().should("have.css", "direction", "rtl");
  }

  beforeEach(() => {
    cy.visit(`${Cypress.env("baseUrl")}`);
    cy.loginAdmin();
    cy.wait(5000);
    cy.visit(`${Cypress.env("baseUrl")}search`);
  });

  it("TCM-124 The share icon is always visible in search results @SMOKE", () => {
    // find and type Plant search term on search field
    search
      .getSearchField()
      .type("Plant", { force: true })
      .should("have.value", "Plant");
    search.getSearchField().click({ force: true });
    search.getSearchButton().click();
    checkShare();
  });

  it("TCM-689 The share icon is visible in the permalink Page @SOLR", () => {
    cy.fixture(fixture).then((data) => {
      cy.visit(`${Cypress.env("baseUrl")}` + data.SOLRLink);
      checkShare();
    });
  });

  it.skip("TCM-126 The share icon is located in the left side for the Arabic language articles @SOLR", () => {
    cy.visit(
      `${Cypress.env(
        "baseUrl"
      )}search?id=XQAAAALmAAAAAAAAAABCqspmUysK7ZVlp7Y_vrIrx4PusK3ARAXLrcUfuXXePKMVnipmmHAH-K1ZQAuvA0j1w2AX7shbPUx69CwaQl9aC-e3-YYXPA8AfeXhmv00srP6_ZgvDUEDW3lN50S_B7cPKu7DAL6gO3TIOqa26IC1xxBG-meDiJHEt8iwuuqF3g8xDIDkByRhhFpajukWgn2zTqVjwDtzadmn8_od32HM-W1mS71e2mJsI_FEcHlvER_-uQmA`
    );
    checkArabicShare();
  });

  it.skip("TCM-764 The share icon has permalink page link if pdf not available @SOLR", () => {
    cy.fixture(fixture).then((data) => {
      cy.visit(`${Cypress.env("baseUrl")}` + data.SOLRLink);
      permalink.getShareIcon().should("be.visible").click({ force: true });
      //check facebook,likendin,twitter,copy are linked to perma link page
      permalink
        .getShareFacbookIcon()
        .find("a")
        .should("have.attr", "href")
        .and("include", "title");
      permalink
        .getShareLinkedInIcon()
        .find("a")
        .should("have.attr", "href")
        .and("include", "title");
      permalink
        .getShareTwitterIcon()
        .find("a")
        .should("have.attr", "href")
        .and("include", "title");
      //permalink.getCopyIcon().find('a').should('have.attr', 'href').and('include', 'title');
    });
  });

  it.skip("TCM-763 The share icon has pdf viewer link if pdf is available @SOLR", () => {
    // search for zookeeper to get pdf articles in the results
    search
      .getSearchField()
      .type("zookeeper", { force: true })
      .should("have.value", "zookeeper");
    search.getSearchField().click({ force: true });
    search.getSearchButton().click();
    permalink.getShareIcon().should("be.visible").click({ force: true });
    //check facebook,likendin,twitter,copy are linked to pdf viewer page
    permalink
      .getShareFacbookIcon()
      .find("a")
      .should("have.attr", "href")
      .and("include", "pdf-viewer");
    permalink
      .getShareLinkedInIcon()
      .find("a")
      .should("have.attr", "href")
      .and("include", "pdf-viewer");
    permalink
      .getShareTwitterIcon()
      .find("a")
      .should("have.attr", "href")
      .and("include", "pdf-viewer");
  });
  it("TCM-689 The share icon is visible in the permalink Page @EDS", () => {
    cy.fixture(fixture).then((data) => {
      cy.visit(`${Cypress.env("baseUrl")}` + data.EDSLink);
      checkShare();
    });
  });
  it.skip("TCM-126 The share icon is located in the left side for the Arabic language articles @EDS", () => {
    cy.visit(
      `${Cypress.env(
        "baseUrl"
      )}search?id=XQAAAALhAAAAAAAAAABCqspmUysK7ZVlp7Y_vrIrpKORUGryLiXucFp7r0OY3kcloIorCrtvoZ3V6TMbtALr3ypldbQZ1IhKCfzWeySCH29a6KB7_eYXFg8ARxZKajbnIaEpUQ74RPTUX3bgc_btxyIEz1rLVcOTPA_llza9ytEmga8ttc5PLvPw9ybMFlTxTcrICPwBxy5W1dvwE3oLQijRp-CRqf0qU3vSZLhASsYxCHjrxcLG1_1ue2A`
    );
    checkArabicShare();
  });
  it.skip("TCM-763 The share icon has pdf viewer link if pdf is available @EDS", () => {
    // search for zookeeper to get pdf articles in the results
    search
      .getSearchField()
      .type("zookeeper", { force: true })
      .should("have.value", "zookeeper");
    search.getSearchField().click({ force: true });
    search.getSearchButton().click();
    permalink.getShareIcon().should("be.visible").click({ force: true });
    //check facebook,likendin,twitter,copy are linked to pdf viewer page
    permalink
      .getShareFacbookIcon()
      .find("a")
      .should("have.attr", "href")
      .and("include", "pdf-viewer");
    permalink
      .getShareLinkedInIcon()
      .find("a")
      .should("have.attr", "href")
      .and("include", "pdf-viewer");
    permalink
      .getShareTwitterIcon()
      .find("a")
      .should("have.attr", "href")
      .and("include", "pdf-viewer");
  });
  it.skip("TCM-764 The share icon has permalink page link if pdf not available @EDS", () => {
    cy.fixture(fixture).then((data) => {
      cy.visit(`${Cypress.env("baseUrl")}` + data.EDSLink);
      permalink.getShareIcon().should("be.visible").click({ force: true });
      //check facebook,likendin,twitter,copy options are linked to perma link page
      permalink
        .getShareFacbookIcon()
        .find("a")
        .should("have.attr", "href")
        .and("include", "title");
      permalink
        .getShareLinkedInIcon()
        .find("a")
        .should("have.attr", "href")
        .and("include", "title");
      permalink
        .getShareTwitterIcon()
        .find("a")
        .should("have.attr", "href")
        .and("include", "title");
    });
  });

  it("TCM-859 OA and Premium icon @EDS", () => {
    cy.fixture(fixture).then((data) => {
      cy.visit(`${Cypress.env("baseUrl")}` + data.EDSLink);
      permalink.getPremiumIcon().should("be.visible");

      cy.visit(`${Cypress.env("baseUrl")}search?q=test`);

      permalink.getPremiumIcon().should("be.visible");
    });
  });
});
