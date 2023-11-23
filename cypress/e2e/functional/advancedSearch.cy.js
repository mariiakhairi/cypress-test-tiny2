import Addsearchbar from "../../support/pageObjects/addsearchbar";
import Search from "../../support/pageObjects/searchPage";
import UserMenu from "../../support/pageObjects/userMenu";

describe("Search and filters > Advanced search", function () {
  const search = new Search();
  const addsearchbar = new Addsearchbar();
  const menu = new UserMenu();

  beforeEach(() => {
    cy.visit(`${Cypress.env("baseUrl")}search?q=water`);
  });
  const searchTerm = ["water", "war"];

  function compareResults(value) {
    cy.get('[data-test="result-number"]')
      .invoke("text")
      .then(($btn) => {
        const beforeResult = parseFloat($btn.replaceAll(",", ""));

        //boolian
        addsearchbar.getBoolianDropdown().click({ force: true });
        addsearchbar.getBoolianValue(value).click({ force: true });
        addsearchbar.getSearchButton().click({ force: true });
        cy.wait(5000);

        return cy
          .get('[data-test="result-number"]')
          .invoke("text")
          .then(($btn2) => {
            const afterResult = parseFloat($btn2.replaceAll(",", ""));
            //get filtered result and confirm no.of result is less than before filter result
            expect(afterResult).not.to.eql(beforeResult);
          });
      });
  }
  it("TCM-120 Advanced search mobile", () => {
    cy.wait(3000);
    cy.viewport("iphone-8");

    menu.getUserMenuMobile().click();
    menu.selectSearchInUserMenuMobile().click();
    cy.wait(3000);
    menu.openSearchMobile().click();

    addsearchbar.getAdvancedSearchMobileBtn().click({ force: true });

    cy.wait(2000);

    addsearchbar.getSearchField().last().type(searchTerm[1]);

    cy.wait(1000);

    search.getSearchBtnMobile().click({ force: true });

    // check first result's title contain search tearm or not
    search.getFirstResult().contains(searchTerm[0], {
      matchCase: false,
    });

    // check first search result contains author name
    search.getFirstResult().contains(searchTerm[1], {
      matchCase: false,
    });
  });

  it("TCM-120 Advanced search desktop @SMOKE", () => {
    cy.wait(3000);

    addsearchbar.addAdvancedSearch().click({ force: true });

    cy.wait(2000);

    addsearchbar
      .getSearchField()
      .last()
      .type(searchTerm[1])
      .should("have.value", searchTerm[1]);

    cy.wait(1000);

    addsearchbar.getSearchButton().click({ force: true });

    cy.wait(2000);

    // check first result's title contain search terrm or not
    search.getFirstResult().contains(searchTerm[0], {
      matchCase: false,
    });

    // check first search result contains author name
    search.getFirstResult().contains(searchTerm[1], {
      matchCase: false,
    });
  });

  it.skip("TCM-111 Advanced search using Boolean Logic - or", () => {
    cy.wait(3000);

    addsearchbar.addAdvancedSearch().click({ force: true });

    cy.wait(2000);

    addsearchbar
      .getSearchField()
      .last()
      .type(searchTerm[1])
      .should("have.value", searchTerm[1]);

    cy.wait(1000);

    compareResults("OR");
  });

  it.skip("TCM-111 Advanced search using Boolean Logic - not", () => {
    cy.wait(3000);

    addsearchbar.addAdvancedSearch().click({ force: true });

    cy.wait(2000);

    addsearchbar
      .getSearchField()
      .last()
      .type(searchTerm[1])
      .should("have.value", searchTerm[1]);

    cy.wait(1000);

    compareResults("NOT");
  });
});
