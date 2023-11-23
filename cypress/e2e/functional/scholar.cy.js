import Scholar from "../../support/pageObjects/scholar";

describe("Google scholar link tests", () => {
  const scholar = new Scholar();

  beforeEach(() => {
    cy.visit(`${Cypress.env("baseUrl")}scholar`);
  });

  it.skip("TCM-516 - Page is opened and results are displayed", () => {
    cy.url().should("include", "scholar");
    scholar.getLink().then((rows) => {
      const number = rows.length;
      expect(number).to.eq(100);
    });
  });

  it.skip("TCM-516 - Permalink has tags in PDF Viewer page", () => {
    cy.url().should("include", "scholar");

    scholar
      .getLink()
      .eq(0)
      .invoke("text")
      .then((text) => {
        var title = text;
        scholar.getLink().eq(0).click();

        cy.get('meta[name="citation_title"]').should(
          "have.attr",
          "content",
          title + " | Zendy"
        );

        cy.request({
          method: "POST",
          url: `${Cypress.env("API_BASE_URL")}search/search`,
          headers: {
            "custom-country-header": "NG",
            "access-key": "ze0knxn2do4wry2le7bfg1le",
          },
          body: {
            searchQuery: [{ term: title, fieldFilter: "title" }],
            sortFilters: "relevance",
            filters: [],
            dateFilters: {
              start: "1000-1",
              end: "2050-12",
              appliedFromDate: false,
              appliedToDate: false,
            },
            facetFilters: [],
            pageNumber: 1,
          },
        }).as("search");
        cy.get("@search").then((response) => {
          const permalink =
            response.body.data.searchResults.results[0].permanentLink;
          cy.log(permalink);
          cy.visit(permalink);
          cy.get('meta[name="citation_title"]').should(
            "have.attr",
            "content",
            title + "\n            | Zendy"
          );
        });
      });
  });
});
