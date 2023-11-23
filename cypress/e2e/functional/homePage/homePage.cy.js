import HomePage from "../../../support/pageObjects/homePage";
import Search from "../../../support/pageObjects/searchPage";

describe("HomePage", () => {
  const home = new HomePage();
  const search = new Search();
  const fixture = "appPages/homeStrings";

  beforeEach(() => {
    cy.visit(`${Cypress.env("baseUrl")}`);
  });
  it("TCM-539 UI Homepage: Hero Banner and search section", () => {
    home.getHeroBannerSection().should("exist");
    home.getBannerSearch().should("exist");
    cy.fixture(fixture).then((homeData) => {
      home.getHeroBannerSection().contains(homeData.bannerText);
      home.getHeroBannerSection().contains(homeData.searchbarBottomText);
    });
  });

  it("TCM-703 UI Homepage: Hero Banner and search section after login", () => {
    cy.loginAdmin();
    home.getHeroBannerSection().should("exist");
    home.getBannerSearch().should("exist");
    cy.fixture(fixture).then((homeData) => {
      home.getHeroBannerSection().contains(homeData.bannerText);
      home.getHeroBannerSection().contains(homeData.searchbarBottomText);
    });
    cy.logout();
  });

  it("TCM-528 Images on mobile should have .webp format @SMOKE", () => {
    cy.wait(3000);
    cy.viewport("iphone-se2");
    home.getFeaturedContentMobileImage().should("exist");
    home.getFeaturedContentMobileImage().should("have.length", 3);
    home
      .getFeaturedContentMobileImage()
      .eq(0)
      .invoke("attr", "srcSet")
      .should("match", /.webp*/gm);
    home
      .getFeaturedContentMobileImage()
      .eq(1)
      .invoke("attr", "srcSet")
      .should("match", /.webp*/gm);
    home
      .getFeaturedContentMobileImage()
      .eq(2)
      .invoke("attr", "srcSet")
      .should("match", /.webp*/gm);
  });
  it("TCM-84 Logged in user can search from the home page @SMOKE", () => {
    cy.loginAdmin();
    cy.wait(3000);
    home.getBannerSearch().type("water").should("have.value", "water");
    home.getSearchButtonHero().click();
    cy.wait(5000);
    search.getResultNo().should("not.be", "0");
    cy.logout();
  });

  it("TCM-705 Logged out user can search from the home page", () => {
    home.getBannerSearch().type("water").should("have.value", "water");
    home.getSearchButtonHero().click();
    cy.wait(5000);
    search.getResultNo().should("not.be", "0");
  });
  it("TCM-550 HP Payments section: Compare plans button @EDS", () => {
    home.getTryZendyButton().invoke("text").should("eql", "Compare Plans");
    home.getTryZendyButton().eq(0).click();
    cy.url().should("include", "pricing");
  });

  it.skip("TCM-549 HP Payments section: Only premium region user sees the payment section @EDS", () => {
    cy.fixture(fixture).then((homeData) => {
      home
        .getTryZendyTitle()
        .invoke("text")
        .should("eql", "Try Zendy for Free");
      home
        .getTryZendyText()
        .eq(0)
        .invoke("text")
        .should("eql", homeData.tryZendyText[0]);
      home
        .getTryZendyText()
        .eq(1)
        .invoke("text")
        .should("eql", homeData.tryZendyText[1]);
      home
        .getTryZendyText()
        .eq(2)
        .invoke("text")
        .should("eql", homeData.tryZendyText[2]);
    });
  });
  it("TCM-320 Home Page icons", () => {
    home.getIcons().should("be.visible");
    cy.loginAdmin();
    cy.wait(4000);
    home.getIcons().should("not.exist");
  });
});
