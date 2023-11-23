import Search from "../../support/pageObjects/searchPage";
import HomePage from "../../support/pageObjects/homePage";
import LoginAndRegistration from "../../support/pageObjects/loginRegistration";
import Permalink from "../../support/pageObjects/permalink";

describe("Logged out user search", function () {
  const search = new Search();
  const home = new HomePage();
  const login = new LoginAndRegistration();
  const permalink = new Permalink();
  const fixture = "appPages/searchStrings";

  beforeEach(() => {
    cy.visit(`${Cypress.env("baseUrl")}`);
    cy.viewport(1024, 768);
  });

  it("TCM-85 Dropdown Search @SOLR", () => {
    cy.fixture(fixture).then((searchData) => {
      cy.visit(`${Cypress.env("baseUrl")}search`);

      // open search dropdown
      search.getSearchDropdown().click();

      // check values in the search dropdown
      search.getKeywordDropdown().contains(searchData.searchDropDownValues[0]);
      search.getTitleDropdown().contains(searchData.searchDropDownValues[1]);
      search.getAbstractDropdown().contains(searchData.searchDropDownValues[2]);
      search.getAuthorDropdown().contains(searchData.searchDropDownValues[3]);
      search.getJournalDropdown().contains(searchData.searchDropDownValues[4]);
      search.getISBNSearch().contains(searchData.searchDropDownValues[5]);
      search.getISSNSearch().contains(searchData.searchDropDownValues[6]);
      search.getDOISearch().contains("DOI");
    });
  });
  it("TCM-562 SOLR: Remove All articles where publication date is not in current year @SOLR", () => {
    cy.visit(
      `${Cypress.env(
        "baseUrl"
      )}search?id=XQAAAAKEAAAAAAAAAABCqspmUysK7ZVlp7Y_vrIrpKORUGrx-w1PngXGjaTVIYLRr52EMlrmDGrjbZgzenZ49uDRDA1mZFrkOmlRfv2zH5eOsrfKzyaalKo6LiPVoc5vJaDnIn8X87-fqxYi50vV4xSsu0cU_EEJ__-YyoAA`
    );
    cy.wait(2000);
    search.getSortDropdown().click();
    search.getDateLatest().click();
    cy.wait(5000);
    search.getFirstResult().should("be.visible");
    var date = new Date();

    // sort by latest date check that first result is current year
    search
      .getPublicationYear()
      .invoke("text")
      .should("eql", "Publication year" + date.getFullYear());
  });
  it.skip("TCM-106 Sorting Dropdown @SOLR", () => {
    cy.fixture(fixture).then((searchData) => {
      cy.visit(`${Cypress.env("baseUrl")}search?q=test`);
      cy.wait(2000);
      search.getSortDropdown().click();
      search
        .getRelevence()
        .contains(searchData.sortDropdownValuesSORL[0], { matchCase: false });
      search
        .getDateLatest()
        .contains(searchData.sortDropdownValuesSORL[1], { matchCase: false });
      search
        .getDateOldest()
        .contains(searchData.sortDropdownValuesSORL[2], { matchCase: false });
      search
        .getSJR()
        .contains(searchData.sortDropdownValuesSORL[3], { matchCase: false });
      search
        .getHIndex()
        .contains(searchData.sortDropdownValuesSORL[4], { matchCase: false });
    });
  });

  it("TCM-468 Logged out user can search by keyword and title @SOLR @SMOKE", () => {
    cy.fixture(fixture).then((searchData) => {
      search
        .getSearchField()
        .type(searchData.searchTerm1)
        .should("have.value", searchData.searchTerm1);
      home.getSearchButtonHero().click();

      // find and click on keyword dropdown
      search
        .getSearchDropdown()
        .contains(searchData.searchDropDownValues[0])
        .click({ force: true });

      // find and check list contains title or not and click
      search.getTitleDropdown().click();

      // click on search button
      search.getSearchButton().click();

      // check first result's title contain search tearm or not
      cy.get('[data-test="search-result-0"] > .mb-6').contains(
        searchData.searchTerm1,
        { matchCase: false }
      );
    });
  });

  it.skip("TCM-280 Logged out user can search by abstract @SOLR", () => {
    cy.fixture(fixture).then((searchData) => {
      search
        .getSearchField()
        .type(searchData.abstractTextSolr)
        .should("have.value", searchData.abstractTextSolr);
      home.getSearchButtonHero().click();

      // find and check list contains abstract or not and click
      search.getSearchDropdown().click();
      search.getAbstractDropdown().click();

      // click on search button
      search.getSearchButton().click();

      // check first result's abstract contain search tearm or not
      cy.get(
        '[data-test="search-result-0"] > [class*="MuiCardContent"] > [class$="summary-space"]'
      ).contains(searchData.abstractTextSolr);
    });
  });

  it.skip("TCM-284 Search with pISSN or eISSN @SOLR", () => {
    cy.fixture(fixture).then((searchData) => {
      search
        .getSearchField()
        .type(searchData.ISSN)
        .should("have.value", searchData.ISSN);
      home.getSearchButtonHero().click();

      // find and check list contains abstract or not and click
      search.getSearchDropdown().click();
      search.getISSNSearch().click();

      // click on search button
      search.getSearchButton().click();
      search.getMoredetailsButton().click();

      // check first result's abstract contain search tearm or not
      search.getEissn().contains(searchData.ISSN);
    });
  });

  it.skip("TCM-469 Logged out user can search by author @SOLR @SMOKE", () => {
    cy.fixture(fixture).then((searchData) => {
      search
        .getSearchField()
        .type(searchData.authorName)
        .should("have.value", searchData.authorName);
      home.getSearchButtonHero().click();

      // Select Author and click search
      search.getSearchDropdown().click();
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

  it("TCM-297 If there is no publication year in data we hide this field in the search results on UI @SOLR", () => {
    cy.fixture(fixture).then((searchData) => {
      search
        .getSearchField()
        .type(searchData.titleNoPublicationYearSOLR)
        .should("have.value", searchData.titleNoPublicationYearSOLR);
      home.getSearchButtonHero().click();

      // Select Author and click search
      search.getSearchDropdown().click();
      search.getTitleDropdown().click();

      // click on search button
      search.getSearchButton().click();
      cy.wait(5000);
      //check the result is there
      search.getFirstResult().should("be.visible");

      // check search result has no Publication year
      search.getPublicationYear().should("not.exist");
    });
  });

  it.skip("TCM-300 The download button should be available for articles that have url_pdf @SOLR", () => {
    cy.wait(3000);
    cy.visit(
      `${Cypress.env(
        "baseUrl"
      )}search?id=XQAAAAIHAQAAAAAAAABCqspmUysK7ZVlp7Y_vrIrxpWRUGr1fZwDHn7JhWGPf80u__FmOkp498zLoPnF7xG-0s4QNcfsekNNQTeOHUj9VQcDoN7C9xuxPAR9tGi0h2eZj034JPtbPE12utQIhSd9YmscsKgDctCrPOYn6aljfnpSAs_KVpMRqvQwnHf0zBSvoShc8KQpTbVDFDkr3h0qh9y0S6ZQc762S7NmbeSTI90Rz3aIbE6UK1J1z1WrQw9GwZXGoKeyHoAyXI2LHoBHy08VR1fKC4BkYBE9MnuAsU1imFpah__e-ggA`
    );
    cy.wait(3000);
    cy.fixture(fixture).then((searchData) => {
      //user can see download button
      search
        .getFirstResultReadOrDowloadButton()
        .contains(searchData.readDownloadButtonText[1]);
    });
  });

  it.skip("TCM-288 Journal search is not case sensitive", () => {
    cy.fixture(fixture).then((searchData) => {
      search
        .getSearchField()
        .type(searchData.Journal)
        .should("have.value", searchData.Journal);
      home.getSearchButtonHero().click();

      // find and check list contains abstract or not and click
      search.getSearchDropdown().click();
      search.getJournalDropdown().click();

      // click on search button
      search.getSearchButton().click();
      search.getFirstResult().should("be.visible");

      search.clearSearchField();

      search
        .getSearchField()
        .type(searchData.JournalBig)
        .should("have.value", searchData.JournalBig);
      search.getSearchButton().click();
      search.getFirstResult().should("be.visible");
    });
  });
  it.skip("TCM-286 User can search with ISBN   @SOLR", () => {
    cy.fixture(fixture).then((searchData) => {
      search
        .getSearchField()
        .type(searchData.isbnText)
        .should("have.value", searchData.isbnText);
      home.getSearchButtonHero().click();

      // find and check list contains abstract or not and click
      search.getSearchDropdown().click();
      search.getISBNSearch().click();

      // click on search button

      search.getSearchButton().click();
      search.getMoredetailsButton().click();

      // check first result's abstract contain search tearm or not

      search.getIsbnAttribute().contains(searchData.isbnText);
    });
  });

  it.skip("TCM-477	Clear search input field button", () => {
    cy.fixture(fixture).then((searchData) => {
      cy.visit(`${Cypress.env("baseUrl")}search`);
      //user types in search and clicks clear search - input field is empty
      search.getSearchField().type(searchData.titleNoPublicationYear);

      search.clearSearchField().click();

      search.getSearchField().should("be.empty");
    });
  });

  it.skip("TCM-476	Empty search", () => {
    cy.fixture(fixture).then((searchData) => {
      cy.visit(`${Cypress.env("baseUrl")}search`);
      //user searches and gets empty search results
      search.getSearchField().type(searchData.emptySearch);

      search.getSearchButton().click();

      search.getEmptyText().contains(searchData.emptyText);

      search.getResultNo().contains(searchData.emptyResultNumber);
    });
  });

  it.skip("TCM-307	Cite is available only for logged in user", () => {
    cy.visit(`${Cypress.env("baseUrl")}search?q=test`);
    //when logged out user clicks on cite he sees the registration form

    search.getCiteButton().click();

    login.getLoginFormHeader().should("be.visible");
  });

  it.skip("TCM-522	Clickable subjects UI check @SOLR", () => {
    cy.visit(`${Cypress.env("baseUrl")}search?q=test`);

    search.getMoredetailsButton().click();
    cy.wait(2000);
    search.getclickablesubject().contains("biology").click();
    cy.wait(2000);
    search.getIndicator();
    search.getMoredetailsButton().click();
    search
      .getclickablesubject()
      .contains("biology")
      .should("have.css", "color", "rgb(234, 170, 0)");
  });

  it.skip("TCM-121 Verify search placeholder text", () => {
    // Verify the place holder text as expected
    cy.fixture(fixture).then((searchData) => {
      search
        .getSearchField()
        .invoke("attr", "placeholder")
        .should("contain", searchData.placeholderText);
    });
  });

  it.skip("TCM-298 Seeing content that should not be on Zendy? Contact us.", () => {
    cy.fixture(fixture).then((searchData) => {
      cy.visit(`${Cypress.env("baseUrl")}search?q=test`);
      //verify that user can see the content and contactus link
      search.getMoredetailsButton().click();
      search.getContactUsContent().should("contain", searchData.contactUsText);
      search
        .getContactUsLink()
        .should("be.visible")
        .should("have.text", "Contact us.");
    });
  });

  it("TCM-119 Keyword search should not work for ISSN", () => {
    // user types text in the search input
    cy.fixture(fixture).then((searchData) => {
      search
        .getSearchField()
        .type(searchData.keyword)
        .should("have.value", searchData.keyword);
      home.getSearchButtonHero().click();

      // select ISSn from the dropdown
      search.getSearchDropdown().click();
      search.getISSNSearch().click();

      // click on search button
      search.getSearchButton().click();

      //Verify that empty string is displayed
      search.getEmptyText().contains(searchData.emptyText);

      // Verify that there are no search results
      search.getFirstResult().should("not.exist");
    });
  });

  it.skip("TCM-125	Cards content: Export is available for the logged-in user", () => {
    cy.visit(`${Cypress.env("baseUrl")}search?q=test`);

    //when logged out user clicks on Export button, he sees the login form
    search.getExportButton().click();
    login.getLoginFormHeader().should("be.visible");
  });

  it.skip("TCM-684 Read by clicking title - Not logged in @SOLR", () => {
    cy.visit(
      `${Cypress.env(
        "baseUrl"
      )}search?id=XQAAAALbAAAAAAAAAABCqspmUysK7ZVlp7Y_vrIrxpWRUGr1fEH1FyR5RxGAtmfSBM5vgZIZhMDO7J27KuTy2djWpDVttaPr8htE1InV8RUuM7KUKJXhhhQBszqmpkb2_ZT0ZjEQgMWGSVVa8rmQvG5PvGLAFcrxB3dMSKnKpvHLuL0O7we9aOa6Z4pxTL_CU9sbYZigQ_0oFACLRVLeqB_RCRJUQwCeSa6D5AB4NrnT-k2S-pwu_c773k7Vr_k__bHhQA`
    );
    //when logged out user clicks on article title, he sees the login form and after login sees permalink page
    search.getFirstResultTitle().click();
    login.getLoginFormHeader().should("be.visible");
    cy.get("#mainDialogDiv")
      .find("#email-field")
      .type(`${Cypress.env("ADMIN_USER_EMAIL")}`);
    cy.get("#mainDialogDiv")
      .find("#password-field")
      .type(`${Cypress.env("ADMIN_USER_PASSWORD")}`);
    cy.get("#mainDialogDiv").find("#sign_in_btn").click();
    cy.wait(4000);
    permalink.getPermalinkItemTitle().find("span").eq(0).click();
    cy.wait(3000);
  });

  it.skip("TCM-758 Search with html tags is not returning results", () => {
    cy.visit(`${Cypress.env("baseUrl")}search`);

    cy.fixture(fixture).then((searchData) => {
      for (let i = 0; i < searchData.tags.length; i++) {
        search.getSearchField().type(searchData.tags[i]);
        // click on search button
        search.getSearchButton().click();
        cy.wait(1000);
        search.getSearchField().should("be.empty");
        cy.get("#wrapper")
          .find("span")
          .contains("Sorry, we couldn't find any results for this search");
      }
    });
  });
  it.skip("TCM-106 Sorting Dropdown @EDS", () => {
    cy.fixture(fixture).then((searchData) => {
      cy.visit(`${Cypress.env("baseUrl")}search?q=test`);
      cy.wait(2000);
      search.getSortDropdown().click();
      search
        .getRelevence()
        .contains(searchData.sortDropdownValuesEDS[0], { matchCase: false });
      search
        .getDateLatest()
        .contains(searchData.sortDropdownValuesEDS[1], { matchCase: false });
      search
        .getDateOldest()
        .contains(searchData.sortDropdownValuesEDS[2], { matchCase: false });
      search
        .geAuthor()
        .contains(searchData.sortDropdownValuesEDS[3], { matchCase: false });
    });
  });
});
