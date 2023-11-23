import Leftbar from "../../support/pageObjects/leftbar";
import Search from "../../support/pageObjects/searchPage";
import Permalink from "../../support/pageObjects/permalink";

describe("Search results Fields tests", function () {
  const search = new Search();
  const permalink = new Permalink();
  const leftbar = new Leftbar();
  const fixture = "appPages/searchStrings";
  const fixtureResult = "appPages/searchResult";

  beforeEach(() => {
    cy.visit(`${Cypress.env("baseUrl")}`);
    cy.loginAdminApi();
    cy.wait(4000);
  });

  it.skip("TCM-604 License type is not required field on UI @SOLR", () => {
    cy.visit(`${Cypress.env("baseUrl")}title/10.1186/1471-2164-10-1`);
    leftbar.getDetailsButton().click();
    cy.wait(3000);
    leftbar.getDetails().invoke("text").should("not.include", "License");
    search.getLicenseType().should("not.exist");
  });

  it.skip("TCM-128 Download button is always visible on Mobile @SOLR", () => {
    cy.wait(3000);
    cy.viewport("iphone-8");
    cy.wait(3000);
    cy.fixture(fixture).then((searchData) => {
      cy.visit(
        `${Cypress.env(
          "baseUrl"
        )}search?id=XQAAAAIHAQAAAAAAAABCqspmUysK7ZVlp7Y_vrIrxpWRUGr1fZwDHn7JhWGPf80u__FmOkp498zLoPnF7xG-0s4QNcfsekNNQTeOHUj9VQcDoN7C9xuxPAR9tGi0h2eZj034JPtbPE12utQIhSd9YmscsKgDctCrPOYn6aljfnpSAs_KVpMRqvQwnHf0zBSvoShc8KQpTbVDFDkr3h0qh9y0S6ZQc762S7NmbeSTI90Rz3aIbE6UK1J1z1WrQw9GwZXGoKeyHoAyXI2LHoBHy08VR1fKC4BkYBE9MnuAsU1imFpah__e-ggA`
      );
      //user can see download button
      search
        .getFirstResultReadOrDowloadButton()
        .contains(searchData.readDownloadButtonText[1]);
    });
  });

  it.skip("TCM-123, TCM-133 Card inside  @SOLR", () => {
    cy.fixture(fixtureResult).then((searchData) => {
      cy.visit(
        `${Cypress.env(
          "baseUrl"
        )}search?id=XQAAAALfAAAAAAAAAABCqspmUysK7ZVlp7Y_vrIrpKORUGry0ArmUATKRmqTf44_wlApFAEzLo5gitMMAJV8bF1S8FzrhKN1D0gogOG1jN0nSVKo0xj3KgcYTzDIc8tDdu715j4706MKLV-caofB1gMn2r7YtqiCXarE0M1pmmU7Mq7dfF78IXO4D93oGGptqL5Nbhyt58KnQfA7LGeGQo2ng9BfgOki3TfbVVDQD-trFCn0-wM5_cZpAA`
      );
      search.getFirstResult().should("be.visible");
      search.getMoredetailsButton().click({ force: true });

      // check the card details for the first result
      search
        .getFirstResultTitle()
        .invoke("text")
        .should("match", /\w+\.|\w+/gm);
      search
        .getAuthorName()
        .invoke("text")
        .should("match", /\w+\.|\w+/gm);
      search
        .getPublicationYear()
        .invoke("text")
        .should("match", /Publication year [0-9]{4}/gm);
      search.getPublicationTitle().contains(searchData.publicationNameSOLR);
      search.getResourceType().contains(searchData.resourceTypeSOLR);
      search.getKeyword().contains(searchData.subjectSOLR);
      search.getLanguage().contains(searchData.languageSOLR);
      search
        .getSjr()
        .invoke("text")
        .should("match", /[0-9]\.[0-9]{3}/gm);
      search
        .getEissn()
        .invoke("text")
        .should("match", /[0-9]{4}-[0-9]{4}/gm);
      search
        .getPissn()
        .invoke("text")
        .should("match", /[0-9]{4}-[0-9]{4}/gm);
      search
        .getDoi()
        .invoke("text")
        .should("match", /10\.[0-9]{4}\/\w+/gm);
      search
        .getAbstract()
        .contains(searchData.abstractSolr, { matchCase: false });
      search.getCloseDeatilsButton().should("be.visible");
      search.getCloseDeatilsButton().click();
    });
  });

  it.skip("TCM-112 Phrase searching @SOLR", () => {
    cy.fixture(fixtureResult).then(() => {
      cy.visit(`${Cypress.env("baseUrl")}search?q="Carbon footprint"`);
      search.getFirstResultTitle().find("span").contains("carbon footprint", {
        matchCase: false,
      });
    });
  });

  it.skip("TCM-685 & TCM-686	Read/Download by clicking title -Logged in", () => {
    cy.visit(`${Cypress.env("baseUrl")}search?q=test`);
    search.getFirstResultTitle().find("span").eq(0).click();
    cy.wait(3000);
  });

  it.skip("TCM-691	Mobile - Check clickable title", () => {
    cy.viewport("iphone-8");
    cy.visit(`${Cypress.env("baseUrl")}search?q=test`);
    search.getFirstResultTitle().find("span").eq(0).click();
    cy.wait(3000);
  });
  it.skip("TCM-128 Read button is always visible on Mobile @EDS", () => {
    cy.wait(3000);
    cy.viewport("iphone-8");
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
  it.skip("TCM-123, TCM-133 Card inside  @EDS", () => {
    cy.visit(
      `${Cypress.env(
        "baseUrl"
      )}search?id=XQAAAAITAQAAAAAAAABCqspmUysK7ZVlp7Y_vrIrxpWRUGr1fYQy6AGQGNnRLyIbXr7nmwXFxszasLwr6Ya-HijHaYi_QQAGesZiShSw6dqyOoj1O6aZk_Ue8ZkV3-i9jkP3aijdOI_XrrkwXbx_0WL3b5Xkw6nP8QTc3DSs21-EtRcTKOJWJNGhxDk9oXmsT4jD5L730ZTpRfM-40ktYHCA3aP70X4AgRfQTZG3xA-KGlFsX4m2dXS1TQYMmc3uNbH6Lg5lId8HqmFEdg5_t7GYeR36N7Ns8lyXFMjRb3yq0wNacU2OxFIhkJFRfr__-h7yFg`
    );
    search.getFirstResult().should("be.visible");
    search.getMoredetailsButton().click({ force: true });

    // check the card details for the first result

    search.getFirstResultTitle().should("be.visible");
    search.getFirstResultTitle().scrollIntoView();
    search.getAuthor().should("be.visible");
    search.getPublicationYear().should("be.visible");
    search.getPublicationTitle().should("be.visible");
    search.getResourceType().should("be.visible");
    search.getAbstract().scrollIntoView();
    search.getAbstract().should("be.visible");
    search.getKeyword().should("be.visible");
    search.getLanguage().should("be.visible");
    search.getEissn().should("be.visible");
    search.getDoi().should("be.visible");
    search.getCloseDeatilsButton().click();
  });
  it.skip("TCM-112 Phrase searching @EDS", () => {
    cy.visit(`${Cypress.env("baseUrl")}search?q="Global%20warming"`);
    search
      .getFirstResultTitle()
      .find("span")
      .invoke("text")
      .should("match", /Global warming/gim);
  });
  it.skip("TCM-112 Truncation only for EDS @EDS", () => {
    cy.visit(`${Cypress.env("baseUrl")}search?q=child*`);
    search
      .getFirstResultTitle()
      .find("span")
      .invoke("text")
      .should("match", /child.*/gim);
    search
      .getSecondResultTitle()
      .find("span")
      .invoke("text")
      .should("match", /child.*/gim);
    search
      .getFourthResultTitle()
      .find("span")
      .invoke("text")
      .should("match", /child.*/gim);
  });
  it.skip("TCM-114 Wildcard only for EDS @EDS", () => {
    cy.visit(`${Cypress.env("baseUrl")}search?q=defen%3Fe`);
    search
      .getFirstResultTitle()
      .find("span")
      .invoke("text")
      .should("match", /defen.e/gim);
    search
      .getThirdResultTitle()
      .find("span")
      .invoke("text")
      .should("match", /defen.e/gim);
  });

  it.skip("TCM-134 Closed card mobile @EDS", () => {
    cy.viewport("iphone-8");

    cy.visit(
      `${Cypress.env(
        "baseUrl"
      )}search?id=XQAAAAITAQAAAAAAAABCqspmUysK7ZVlp7Y_vrIrxpWRUGr1fYQy6AGQGNnRLyIbXr7nmwXFxszasLwr6Ya-HijHaYi_QQAGesZiShSw6dqyOoj1O6aZk_Ue8ZkV3-i9jkP3aijdOI_XrrkwXbx_0WL3b5Xkw6nP8QTc3DSs21-EtRcTKOJWJNGhxDk9oXmsT4jD5L730ZTpRfM-40ktYHCA3aP70X4AgRfQTZG3xA-KGlFsX4m2dXS1TQYMmc3uNbH6Lg5lId8HqmFEdg5_t7GYeR36N7Ns8lyXFMjRb3yq0wNacU2OxFIhkJFRfr__-h7yFg`
    );
    search.getFirstResult().should("be.visible");
    search.getMoredetailsButton().click();

    //check the card details for the first result
    search.getFirstResultTitle().should("be.visible");
    search.getAuthor().should("be.visible");
    search.getPublicationYear().should("be.visible");
    search.getPublicationTitle().should("be.visible");
    search.getResourceType().should("be.visible");
    search.getAbstract().scrollIntoView();
    search.getAbstract().should("be.visible");
    search.getKeyword().scrollIntoView();
    search.getKeyword().should("be.visible");
    search.getLanguage().should("be.visible");
    search.getEissn().should("be.visible");
    search.getDoi().should("be.visible");
    search.getShareIcon().scrollIntoView();
    search.getShareIcon().should("be.visible");
    search.getCloseDeatilsButton().click();
  });

  it.skip("TCM-134 Closed card Desktop @EDS", () => {
    cy.visit(
      `${Cypress.env(
        "baseUrl"
      )}search?id=XQAAAAJAAQAAAAAAAABCqspmUysK7ZVlp7Y_vrIrpKORUGryPpgdkBACo2havfWErMEF0fyN8U-KnoC42UzEsMxtPmeFxDajrVUgk6MU3s4ZLI5tXQQqN_59w1bQTggHkaJXFc9itEvRk7U0oUHgnzKMWgnwvExI5RGSQ17ySm9WMdwcOquoVWC7sfz09H6pkClaJTHzMcBvl1cTg0QCIA72FLliR8F8FLhfVSrK2qvjE9tUmz4QZPGdCFcfyUShEnehrSeKw-lcsa7SJPD2selXP8KKTXBLf_--Q4NA`
    );
    search.getFirstResult().should("be.visible");

    //check the card details for the first result
    search.getFirstResultTitle().should("be.visible");
    search.getAuthor().should("be.visible");
    search.getPublicationYear().should("be.visible");
    search.getPublicationTitle().should("be.visible");
    search.getResourceType().should("be.visible");
    search.getShareIcon().should("be.visible");
  });

  it.skip("TCM-676 Mobile - Close details button in the expanded search result @EDS", () => {
    cy.viewport("iphone-8");

    cy.visit(
      `${Cypress.env(
        "baseUrl"
      )}search?id=XQAAAAJAAQAAAAAAAABCqspmUysK7ZVlp7Y_vrIrpKORUGryPpgdkBACo2havfWErMEF0fyN8U-KnoC42UzEsMxtPmeFxDajrVUgk6MU3s4ZLI5tXQQqN_59w1bQTggHkaJXFc9itEvRk7U0oUHgnzKMWgnwvExI5RGSQ17ySm9WMdwcOquoVWC7sfz09H6pkClaJTHzMcBvl1cTg0QCIA72FLliR8F8FLhfVSrK2qvjE9tUmz4QZPGdCFcfyUShEnehrSeKw-lcsa7SJPD2selXP8KKTXBLf_--Q4NA`
    );
    search.getMoredetailsButton().click();
    search.getCloseDeatilsButton().should("be.visible");
    search.getCloseDeatilsButton().click();
    search.getResultNumber().scrollIntoView().should("be.visible");
    search.getSortOptions().scrollIntoView().should("be.visible");
    search.getResultNo().should("exist");
    search.getSortOptions().should("have.text", "RELEVANCE");

    search.getSortOptions().click();
    search.getSortOptionsLatest().type("DATE-LATEST");
    search.getSortOptions().should("have.text", "DATE-LATEST");
    cy.wait(2000);
    search.getMoredetailsButton().click();
    search.getCloseDeatilsButton().should("be.visible");
    search.getCloseDeatilsButton().click();
    search.getResultNumber().scrollIntoView().should("be.visible");
    search.getSortOptions().scrollIntoView().should("be.visible");
    search.getResultNo().should("exist");
    search.getSortOptions().should("have.text", "DATE-LATEST");

    search.getSortOptions().click();
    search.getSortOptionsOldest().type("DATE-OLDEST");
    search.getSortOptions().should("have.text", "DATE-OLDEST");
    cy.wait(2000);
    search.getMoredetailsButton().click();
    search.getCloseDeatilsButton().should("be.visible");
    search.getCloseDeatilsButton().click();
    search.getResultNumber().scrollIntoView().should("be.visible");
    search.getSortOptions().scrollIntoView().should("be.visible");
    search.getResultNo().should("exist");
    search.getSortOptions().should("have.text", "DATE-OLDEST");

    search.getSortOptions().click();
    search.getSortOptionsAuthor().type("AUTHOR");
    search.getSortOptions().should("have.text", "AUTHOR");
    cy.wait(2000);
    search.getMoredetailsButton().click();
    search.getCloseDeatilsButton().should("be.visible");
    search.getCloseDeatilsButton().click();
    search.getResultNumber().scrollIntoView().should("be.visible");
    search.getSortOptions().scrollIntoView().should("be.visible");
    search.getResultNo().should("exist");
    search.getSortOptions().should("have.text", "AUTHOR");
  });
});
