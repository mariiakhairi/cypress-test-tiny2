import MyLibrary from "../../support/pageObjects/myLibrary";
import Search from "../../support/pageObjects/searchPage";
import HomePage from "../../support/pageObjects/homePage";

describe("My Library", function () {
  const library = new MyLibrary();
  const search = new Search();
  const home = new HomePage();
  const fixture = "appPages/searchStrings";

  beforeEach(() => {
    cy.visit(`${Cypress.env("baseUrl")}`);
    cy.loginAdminApi();
    cy.visit(`${Cypress.env("baseUrl")}my-library`);
    cy.wait(5000);
  });

  it("TCM-647 MyLibrary is having search bar, ReadHistory and Favourites @SMOKE", () => {
    // To verify that user can click the MyLibrary link from the menu
    library.getAvatar().click();
    cy.wait(5000);
    library.getMyLibrary().click();
    cy.wait(5000);

    library.getReadHistory().contains("Read History");
    library.getFavourites().contains("Favourites");

    // To verify that user is able to switch between Read History and Favourites Tabs
    library.getFavourites().click();
    library.getReadHistory().click({ force: true });

    // To verify that search bar is present and user is able to perform search
    library.getSearchBar().should("be.visible");
    library.getSearchBar().type("test");
    library.getSearchButton().click();
  });

  it.skip("TCM-648 Read History displays articles read by the user", () => {
    // user first search for an article from the homepage

    library.getSearchBar().type("PLANT");
    library.getSearchButton().click();

    var searchTerm = ["Plant", "water", "test", "sun", "electicity"];
    var value = searchTerm[Math.floor(Math.random() * searchTerm.length)];
    cy.fixture(fixture).then(() => {
      search.getSearchField().type(value).should("have.value", value);

      home.getSearchButtonHero().click();

      cy.wait(2000);

      // user read the first item form the search result
      library.getReadButton().click({ multiple: true });
      cy.wait(5000);

      // verify that the read history displays the read article
      cy.visit(`${Cypress.env("baseUrl")}my-library`);

      library.getFirstReadHistory().contains("PLANT", { matchCase: false });

      library.getFirstReadHistory().contains(value, { matchCase: false });
    });

    it.only("TCM-649 Favourites displays articles liked by the user", () => {
      // user first search for an article from the homepage
      library.getSearchBar().type("PLANT");
      library.getSearchButton().click();
      cy.wait(2000);

      // user read the first item form the search result
      library.getReadButton().click({ multiple: true });
      cy.wait(5000);

      //user clcik on the favourite button
      library.getFavouritesButton().click({ force: true });
      cy.wait(5000);

      //user can view the liked articles in my library-favourites
      cy.visit(`${Cypress.env("baseUrl")}my-library`);
      library.getFavourites().click({ force: true });
      cy.wait(5000);
      library.getFirstFavourites().contains("PLANT", { matchCase: false });

      // To verify that the favourites button border is highlighted
      library
        .getFavouritesButton()
        .should("have.css", "border-color", "rgb(234, 170, 0)");

      //user clicks the favourite button from the favourites page to remove the item from favourites
      library.getFavouritesButton().click({ multiple: true });
      cy.wait(5000);
      cy.visit(`${Cypress.env("baseUrl")}my-library`);
      library.getFavourites().click({ force: true });
      library.getFirstFavourites().should("not.exist");
    });
  });
});
