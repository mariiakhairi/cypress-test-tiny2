import Search from "../../support/pageObjects/searchPage";
import HomePage from "../../support/pageObjects/homePage";

describe("Search with logged in user", function () {
  //ZAT-94 Update search cases
  const search = new Search();
  const home = new HomePage();
  const fixture = "appPages/searchStrings";

  beforeEach(() => {
    cy.visit(`${Cypress.env("baseUrl")}`);
    cy.loginAdminApi();
    cy.wait(4000);
  });

  afterEach(() => {
    cy.logout();
  });

  it("TCM-468 Logged in User can search by keyword and title @SMOKE", () => {
    cy.fixture(fixture).then((searchData) => {
      search
        .getSearchField()
        .type(searchData.searchTerm1)
        .should("have.value", searchData.searchTerm1);
      home.getSearchButtonHero().click();

      cy.log("find and click on keyword dropdown");
      search
        .getSearchDropdown()
        .contains(searchData.searchDropDownValues[0])
        .click({ force: true });

      cy.log("find and check list contains title or not and click");
      search.getTitleDropdown().click();

      cy.log("click on search button");
      search.getSearchButton().click();

      // check first result's title contain search tearm or not

      cy.get('[data-test="search-result-0"] > .mb-6').contains(
        searchData.searchTerm1,
        { matchCase: false }
      );
    });
  });
  it.skip("TCM-280 Logged in user can search by abstract @EDS", () => {
    cy.fixture(fixture).then((searchData) => {
      search
        .getSearchField()
        .type(searchData.abstractTextEDS)
        .should("have.value", searchData.abstractTextEDS);
      home.getSearchButtonHero().click();

      cy.log("find and check list contains abstract or not and click");
      search.getSearchDropdown().click({ force: true });
      search.getAbstractDropdown().click();

      cy.log("click on search button");
      search.getSearchButton().click();
      search.getMoredetailsButton().click({ force: true });

      cy.log("check first result's abstract contain search tearm or not");
      search.getFirstResultAbstract().contains(searchData.abstractTextEDS);
    });
  });
  it.skip("TCM-280 Logged in user can search by abstract @SOLR", () => {
    cy.fixture(fixture).then((searchData) => {
      search
        .getSearchField()
        .type(searchData.abstractTextSolr)
        .should("have.value", searchData.abstractTextSolr);
      home.getSearchButtonHero().click();

      // find and check list contains abstract or not and click
      search.getSearchDropdown().click({ force: true });
      search.getAbstractDropdown().click();

      // click on search button
      search.getSearchButton().click();
      search.getMoredetailsButton().click();

      // check first result's abstract contain search tearm or not
      search.getFirstResultAbstract().contains(searchData.abstractTextSolr);
    });
  });

  it.skip("TCM-469 Logged in user can search by author @EDS", () => {
    cy.fixture(fixture).then((searchData) => {
      search
        .getSearchField()
        .type(searchData.authorName)
        .should("have.value", searchData.authorName);
      home.getSearchButtonHero().click();

      // Select Author and click search
      search.getSearchDropdown().click({ force: true });
      search.getAuthorDropdown().click();

      // click on search button
      search.getSearchButton().click();

      // check first result's abstract contain search tearm or not
      search
        .getFirstResult()
        .find('div[data-test="pubAttributeAuthor"]')
        .find("span")
        .contains(searchData.authorName);
    });
  });
  it.skip('TCM-301 User can see "View PDF" button @SOLR', () => {
    cy.fixture(fixture).then((searchData) => {
      cy.visit(
        `${Cypress.env(
          "baseUrl"
        )}search?q=Augmented%20Reality%20is%20a%20new%20technology%20which%20can%20combine%20the%20real%20world%20information%20with%20the%20virtual%20world%20information%20seamless.%20In%20order%20to%20increase%20the%20sense%20of%20immersion%20and%20interactivity%2C`
      );
      //user can see View PDF button
      search
        .getFirstResultViewPDFButton()
        .contains(searchData.readDownloadButtonText[1]);
    });
  });
  it.skip('TCM-301 User can see "read" button @EDS', () => {
    cy.fixture(fixture).then((searchData) => {
      cy.visit(
        `${Cypress.env(
          "baseUrl"
        )}search?id=XQAAAALUAAAAAAAAAABCqspmUysK7ZVlp7Y_vrIrxpWRUGr1e4TT707zTLdlRu84beDNAn6-6Z5UUp7CHb__FX7jPlsiaVC9LXzk7hvptRy3yJxFCJWn-T9UoilHA085ykO2AMS7ukhpv4zPdJkWjQH8f13QWF_f8Qs60-jZskVDkT8x1RORewNgiqu_MGU_Tq2zl7orLHAm3qDWLCH61wYxWbdMci0cH6LTEGCAUxIUKtrZFZtzV4_pzUz_Z6pAAA`
      );
      //user can see read button
      search
        .getFirstResultReadButton()
        .contains(searchData.readDownloadButtonText[0]);
    });
  });

  it.skip("TCM-307	Cite is available only for logged in user", () => {
    cy.fixture(fixture).then((searchData) => {
      cy.visit(`${Cypress.env("baseUrl")}search?q=test`);
      //when logged out user clicks on cite he sees the registration form

      search.getCiteButton().click({ force: true });
      search.getCiteCopyButton().should("be.visible");
      search.getPopUpTitle().contains(searchData.citePopUpTitle);
    });
  });

  it.skip("TCM-125	Cards content: Export is available for the logged-in user", () => {
    cy.fixture(fixture).then((searchData) => {
      cy.visit(`${Cypress.env("baseUrl")}search?q=test`);
      search.getExportButton().click({ force: true });
      search.getCiteCopyButton().should("be.visible");
      search.getPopUpTitle().contains(searchData.exportPopUpTitle);
    });
  });

  it.skip("TCM-690	Trail end user clicking article title to read @EDS", () => {
    cy.visit(`${Cypress.env("baseUrl")}logout`);
    cy.wait(3000);
    cy.login("autotest8@gmail.com", "Password1234");
    cy.visit(`${Cypress.env("baseUrl")}search?q=test`);
    search.getFirstResultTitle().find("span").eq(0).click();
    cy.wait(3000);
    cy.url().should("include", "subscriptions");
  });
});
