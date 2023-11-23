import Publishers from "../../support/pageObjects/publishers";

describe("Publishers Partners", () => {
  const pub = new Publishers();
  beforeEach(() => {
    cy.visit(`${Cypress.env("baseUrl")}publishers`);
  });
  const fixture = "appPages/publishers";

  it.skip("TCM-608 PP - text check - needs PO update, hero button text needs change", () => {
    cy.fixture(fixture).then((publishersData) => {
      //cy.get("h1").contains(publishersData.header);
      //pub.getHeroText().contains(publishersData.heroText);
      // pub.getButton().contains(publishersData.button);
      // cy.get("h2").contains(publishersData.h2);
      // for (let i = 0; i < publishersData.uspItems.length; i++) {
      //   pub.getItemUsp().eq(i).contains(publishersData.uspItems[i]);
      // }
      // cy.get("h2").eq(1).contains(publishersData.h3);
      pub.getWhyPartnerTitle().contains(publishersData.h4);
      pub.getWhyPartner().contains(publishersData.whyText);
      //cy.get("h2").eq(3).contains(publishersData.h5);
      pub.getContactText().contains(publishersData.contact);
      //pub.getOptionIcon().should("have.length", 3);
    });
  });
});
