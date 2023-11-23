import Footer from "../../support/pageObjects/footer";

describe("Footer links", () => {
  const footer = new Footer();
  beforeEach(() => {
    cy.visit(`${Cypress.env("baseUrl")}`);
  });

  const fixture = "appPages/footer";
  const fixtureHome = "appPages/homeStrings";

  it("TCM-40 Zendy links @SMOKE", () => {
    footer.getZendyLinkTitle().should("have.text", "Zendy");
    footer.getLearnLinkTitle().should("have.text", "Learn");
    cy.fixture(fixture).then((footerData) => {
      for (let i = 0; i < footerData.usefulUrl.length; i++) {
        footer
          .getZendyLink()
          .eq(i)
          .should("have.attr", "href")
          .and("include", footerData.usefulUrl[i]);
      }
    });
  });

  it("TCM-38 Social Media links @SMOKE", () => {
    cy.fixture(fixture).then((footerData) => {
      for (let i = 0; i < footerData.SmURL.length; i++) {
        footer
          .getSmlink()
          .eq(i)
          .should("have.attr", "href")
          .and("include", footerData.SmURL[i]);
      }
    });
  });

  it("TCM-37 Discover links", () => {
    cy.fixture(fixture).then((footerData) => {
      for (let i = 0; i < footerData.discoverlinkText.length; i++) {
        footer
          .getDiscoverLinkText()
          .eq(i)
          .contains(footerData.discoverlinkText[i]);
      }
    });
  });

  it("TCM-34 Explore links", () => {
    cy.fixture(fixture).then((footerData) => {
      for (let i = 0; i < footerData.explorelinkText.length; i++) {
        footer.getExploreLinkText().contains(footerData.explorelinkText[i], {
          matchCase: false,
        });
      }
    });
  });

  it("TCM-33 Copyright", () => {
    // Copyright link to Knowledge E website
    cy.fixture(fixture).then((footerData) => {
      footer
        .getCopyrightsLink()
        .should("have.attr", "href")
        .and("include", footerData.KnowledgeEUrl);
    });
  });

  it.skip("TCM-707 Join link in footer: text check", () => {
    //needs data-test
    // https://knowledgee.atlassian.net/wiki/spaces/SCIC/pages/2657648645/Data+test+attributes+for+the+NextJS
    cy.fixture(fixtureHome).then((homeData) => {
      footer.getJoinText().should("include.text", homeData.joinText[0]);
      footer.getJoinText().should("include.text", homeData.joinText[1]);
    });
  });
});
