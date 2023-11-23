import HomePage from "../../../support/pageObjects/homePage";
describe("HomePage - Discover - needs data-test", () => {
  const home = new HomePage();
  const fixture = "appPages/homeStrings";

  beforeEach(() => {
    cy.visit(`${Cypress.env("baseUrl")}`, {
      onBeforeLoad(win) {
        cy.stub(win, "open").as("winOpen");
      },
    });
  });

  it("TCM-706 Featured articles text @EDS", () => {
    cy.fixture(fixture).then((homeData) => {
      for (let i = 0; i < homeData.featuredContentTitleEDS.length; i++) {
        home
          .getFeaturedContentCardTitle()
          .contains(homeData.featuredContentTitleEDS[i]);
      }
      for (let i = 0; i < homeData.featuredContentAbstractEDS.length; i++) {
        home
          .getFeaturedContentCardAbstract()
          .contains(homeData.featuredContentAbstractEDS[i]);
      }
      home
        .getFeaturedContentHeader()
        .contains(homeData.BrowseourcollectionofArticlestext);
      for (let i = 0; i < homeData.featuredcontenttagsEDS.length; i++) {
        home
          .getFeaturedContentCardTags()
          .contains(homeData.featuredcontenttagsEDS[i]);
      }
    });
  });
  it("TCM-706 Featured articles text @SOLR", () => {
    cy.fixture(fixture).then((homeData) => {
      for (let i = 0; i < homeData.featuredContentTitleSOLR.length; i++) {
        home
          .getFeaturedContentCardTitle()
          .contains(homeData.featuredContentTitleSOLR[i]);
      }
      for (let i = 0; i < homeData.featuredContentAbstractSOLR.length; i++) {
        home
          .getFeaturedContentCardAbstract()
          .contains(homeData.featuredContentAbstractSOLR[i]);
      }
      home
        .getFeaturedContentHeader()
        .contains(homeData.BrowseourcollectionofArticlestext);
      for (let i = 0; i < homeData.featuredcontenttagsSOLR.length; i++) {
        home
          .getFeaturedContentCardTags()
          .contains(homeData.featuredcontenttagsSOLR[i]);
      }
    });
  });

  it.skip("TCM-311 Home page Discover Zendy: featured articles @EDS", () => {
    cy.fixture(fixture).then((homeData) => {
      home.getFeaturedContentCardTitle().eq(0).click();
      cy.get("@winOpen").should(
        "be.calledWith",
        homeData.permaLinkDiscoverEDS[0],
        "_blank"
      );

      home.getFeaturedContentCardTitle().eq(1).click();
      cy.get("@winOpen").should(
        "be.calledWith",
        homeData.permaLinkDiscoverEDS[1],
        "_blank"
      );

      home.getFeaturedContentCardTitle().eq(2).click();
      cy.get("@winOpen").should(
        "be.calledWith",
        homeData.permaLinkDiscoverEDS[2],
        "_blank"
      );
    });
  });

  it("TCM-311 Home page Discover Zendy: featured articles logged in user @SOLR", () => {
    cy.fixture(fixture).then((homeData) => {
      home.getFeaturedContentCardTitle().eq(0).click();
      cy.get("@winOpen").should(
        "be.calledWith",
        homeData.permaLinkDiscoverSOLR[0],
        "_blank"
      );

      home.getFeaturedContentCardTitle().eq(1).click();
      cy.get("@winOpen").should(
        "be.calledWith",
        homeData.permaLinkDiscoverSOLR[1],
        "_blank"
      );

      home.getFeaturedContentCardTitle().eq(2).click();
      cy.get("@winOpen").should(
        "be.calledWith",
        homeData.permaLinkDiscoverSOLR[2],
        "_blank"
      );
    });
  });

  it("TCM-87 Home page Discover Zendy: featured articles @EDS", () => {
    cy.loginAdmin();
    cy.wait(5000);
    cy.fixture(fixture).then((homeData) => {
      home.getFeaturedContentCardTitle().eq(0).click();
      cy.get("@winOpen").should(
        "be.calledWith",
        homeData.permaLinkDiscoverEDS[0],
        "_blank"
      );

      home.getFeaturedContentCardTitle().eq(1).click();
      cy.get("@winOpen").should(
        "be.calledWith",
        homeData.permaLinkDiscoverEDS[1],
        "_blank"
      );

      home.getFeaturedContentCardTitle().eq(2).click();
      cy.get("@winOpen").should(
        "be.calledWith",
        homeData.permaLinkDiscoverEDS[2],
        "_blank"
      );
    });
  });

  it("TCM-87 Home page Discover Zendy: featured articles logged out user @SOLR", () => {
    cy.loginAdmin();
    cy.wait(5000);
    cy.fixture(fixture).then((homeData) => {
      home.getFeaturedContentCardTitle().eq(0).click();
      cy.get("@winOpen").should(
        "be.calledWith",
        homeData.permaLinkDiscoverSOLR[0],
        "_blank"
      );

      home.getFeaturedContentCardTitle().eq(1).click();
      cy.get("@winOpen").should(
        "be.calledWith",
        homeData.permaLinkDiscoverSOLR[1],
        "_blank"
      );

      home.getFeaturedContentCardTitle().eq(2).click();
      cy.get("@winOpen").should(
        "be.calledWith",
        homeData.permaLinkDiscoverSOLR[2],
        "_blank"
      );
    });
  });
});
