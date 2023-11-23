import Journal from "../../support/pageObjects/journals";
describe("Logged out user search", function () {
  const journal = new Journal();

  beforeEach(() => {
    cy.visit(
      `${Cypress.env(
        "baseUrl"
      )}search?id=XQAAAAKmAAAAAAAAAABCqspmUysK7ZVlp7Y_vrIrxpWRUGryjd1bqV4DwN7BSupfAZMWxivjP2zQnBp8d81vurwMvq2zSj5a5Orq9GHJT15TXy4SuWLv5XYdpZSeVpxVF4BL6t2lchkG1-t1VfQpeqgudHTCrnfuthhWt8r3nhzBddm-6CEmlAvUtix3k0YbJtTuv_8kogAA`
    );
  });
  const fixture = "appPages/searchStrings";

  it.skip("TCM-446 Logged out user can see journal details in journal drawer @SOLR", () => {
    //needs fixes
    cy.fixture(fixture).then((searchData) => {
      cy.wait(2000);

      journal.getJournalLink().contains(searchData.journalLink).click();
      journal.drawerHeader().contains(searchData.drawerHeader);
      journal.journalTitle().contains(searchData.journalTitle);
      journal.issnNoTxt().contains(searchData.issnNoTxt);
      journal.impactFactor().contains(searchData.impactFactor);
      journal.language().contains(searchData.language);
      journal.history().contains(searchData.history);
      journal.editors().contains(searchData.editors);
      journal.descriptionHeader().contains(searchData.descriptionHeader);
      journal.description().contains(searchData.description);
      journal.publisherHeader().contains(searchData.publisherHeader);
      journal.publisherTxt().contains(searchData.publisherTxt);
      journal.disiplinHeader().contains(searchData.disiplinHeader);
      journal.disiplinTxt().contains(searchData.disiplinTxt);
      journal.journalButton().contains(searchData.journalButton);
      journal.closeButton().should("be.visible").click();
    });
  });
});
