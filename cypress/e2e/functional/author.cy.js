import Author from "../../support/pageObjects/author";

describe("Clickable authors", function () {
  const author = new Author();
  const fixture = "appPages/searchStrings";

  //ZAT-89 Update authors test to pass in both SORL and EDS regions
  it.skip("TCM-337 Author Details - only SOLR @SOLR", () => {
    cy.visit(
      `${Cypress.env(
        "baseUrl"
      )}search?id=XQAAAAK7AAAAAAAAAABCqspmUysK7ZVlp7Y_vrIr6XXusK3ARAXLrcUfuXXePKMVnipmmHAH-K18D0iyc6JCseSH34_R10SQb_Ar4rnjniiT-iIJ0pwTZrDYXI1ELSGy8EmTfKj97zTTOxeTqxa9HPw9SdZauxOYf0jmF8hTfZ5fB9sf5glN9aZOpM1arCNONx7JVvkiKinp60gDlLmMBdAeB5n37dZi_xt-AAA`
    );
    cy.fixture(fixture).then((searchData) => {
      author.getauthorlink().contains(searchData.clickableAuthorName).click();
      //https://knowledgee.atlassian.net/browse/ZD-1525
      //author.drawerheader().should("have.text", searchData.sideBarHeader);
      cy.contains(searchData.clickableAuthorName);
      cy.contains(searchData.sideBarCitations);
      cy.contains(searchData.sideBarPublications);
      cy.contains(searchData.sideBarH_index);
      cy.contains(searchData.sideBarORCID);
      cy.contains(searchData.sideBarBiography);
      cy.contains(searchData.authorInfo);
      //cy.contains(searchData.sideBarOrganizations);
      cy.contains(searchData.sideBarOrg);
      for (let i = 0; i < searchData.sideBarOtherInfo.length; i++) {
        cy.contains(searchData.sideBarOtherInfo[i]);
      }
      author.authorbutton().contains(searchData.authorbutton);
      author.closebutton().should("be.visible").click();
      author.getauthorlink().contains(searchData.clickableAuthorName).click();
      author.authorbutton().click();
      cy.url().should(
        "include",
        "?searchQuery%5B0%5D%5BfieldFilter%5D=author&searchQuery%5B0%5D%5Bterm%5D=George&searchQuery%5B1%5D%5BfieldFilter%5D=author&searchQuery%5B1%5D%5Bterm%5D=Perry&searchQuery%5B1%5D%5BbooleanOperator%5D=AND&sortFilters=relevance&filters%5B0%5D=__EMPTY_ARRAY__&dateFilters%5Bstart%5D=1000-1&dateFilters%5Bend%5D=2050-12&dateFilters%5BappliedFromDate%5D=false&dateFilters%5BappliedToDate%5D=false&facetFilters%5B0%5D=__EMPTY_ARRAY__"
      );
    });
  });
});
