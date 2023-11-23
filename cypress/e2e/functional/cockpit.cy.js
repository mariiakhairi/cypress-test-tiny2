import Cockpit from "../../support/pageObjects/cockpit";
// tests are splitted between SOLR and EDS to reduce the run time as they are n ot region dependant

describe("Cockpit tests", () => {
  const cockpit = new Cockpit();
  const uuid = () => Cypress._.random(0, 1e6);
  const id = uuid();
  const testname = `testname${id}`;

  beforeEach(() => {
    cy.visit(`${Cypress.env("baseUrl")}`);
    cy.loginAdminApi();
    cy.visit(`${Cypress.env("baseUrl")}admin`);
  });

  it("TCM-343 Manage Users @SOLR", () => {
    cockpit.getTotalUsers().contains("Total Users");
    cockpit.getTableHeader().contains("Details");
    cockpit.getTableHeader().contains("Email");
    cockpit.getTableHeader().contains("Role");
    cockpit.getTableHeader().contains("Subscriptions");
    cockpit.getTableHeader().contains("Region");
    cockpit.getTableHeader().contains("Language");
    cockpit.getTableHeader().contains("Created at");
    cockpit.getTableHeader().contains("Updated at");
    cockpit.getTableHeader().contains("Actions");
    cockpit.getAddFilterButton().should("exist");
    cockpit.getCreateButton().should("exist");
  });

  it("TCM-353 Demo Accounts @SOLR", () => {
    cockpit.getMenuItem().eq(2).click();
    cockpit.getPageTitle().contains("Manage Demo Users");
    cockpit.getTableHeader().contains("Details");
    cockpit.getTableHeader().contains("Email");
    cockpit.getTableHeader().contains("Region");
    cockpit.getTableHeader().contains("Updated at");
    cockpit.getAddFilterButton().should("not.exist");
    cockpit.getCreateButton().should("exist");
  });

  it("TCM-359 Manage Regions @SOLR", () => {
    cockpit.getMenuItem().eq(3).click();
    cockpit.getPageTitle().contains("Manage Regions");
    cockpit.getTableHeader().contains("Name");
    cockpit.getTableHeader().contains("Default");
    cockpit.getTableHeader().contains("Is preview");
    cockpit.getTableHeader().contains("Region Manage Actions");
    cockpit.getAddFilterButton().should("not.exist");
    cockpit.getCreateButton().should("exist");
  });
  it("TCM-386 Manage Search Providers @SOLR", () => {
    cockpit.getMenuItem().eq(4).click();
    cockpit.getPageTitle().contains("Manage Search Providers");
    cockpit.getTableHeader().contains("Name");
    cockpit.getTableHeader().contains("Show Statistics Numbers");
    cockpit.getTableHeader().contains("Show Magazines");
    cockpit.getTableHeader().contains("External Links Rate Limiter");
    cockpit.getTableHeader().contains("Trial Creation Flow");

    cockpit.getAddFilterButton().should("not.exist");
    cockpit.getCreateButton().should("exist");
  });

  it("TCM-368 Premium Subscriptions @EDS", () => {
    cockpit.getMenuItem().eq(10).click({ force: true });
    cockpit.getListWithPaymentGateway().click();
    cockpit
      .getPageTitle()
      .contains("List Premium Subscription Payment Gateways");
    cockpit.getListWithDiscounts().click();
    cockpit.getPageTitle().contains("List Premium Subscription with Discounts");
    cockpit.getListPremiumSubscriptions().click();
    cockpit.getPageTitle().contains("List Premium Subscription Plan");
  });

  it("TCM-390 List with Discount @EDS", () => {
    cockpit.getMenuItem().eq(10).click();
    cockpit.getListWithDiscounts().click();
    cockpit.getPageTitle().contains("List Premium Subscription with Discounts");
  });

  it("TCM-456 Add language in Manage languages @SOLR", () => {
    cockpit.getMenuItem().eq(5).click();
    cockpit.getCreateButton().click();
    cockpit.getPageTitle().contains("Create Language");

    //fill the fields with random values

    cockpit.getLanguageNameInput().type(testname);
    cockpit.getLanguageCodeInput().type(testname);
    cockpit.getLanguageFontFamilyInput().type(testname);

    //click save
    cockpit.getSaveButton().click();
    cy.wait(2000);
    cockpit.getPageTitle().contains("Manage Languages");
  });

  it("TCM-658 Manage Currencies For Plans @EDS", () => {
    cockpit.getMenuItem().eq(9).click();
    cockpit.getPageTitle().contains("Manage Currencies For Plans");
    cockpit.getNumberOfRows().should("have.length", 7);
  });
  it("TCM-659 Manage Premium Subscription Invoices @EDS", () => {
    cockpit.getMenuItem().eq(8).click();
    cockpit.getPageTitle().contains("Manage Premium Subscription Invoices");
    cockpit.getTableHeader().contains("Invoice Number");
    cockpit.getTableHeader().contains("Paid Status");
    cockpit.getTableHeader().contains("User Email");
    cockpit.getTableHeader().contains("Interval");
    cockpit.getTableHeader().contains("Start Date");
    cockpit.getTableHeader().contains("Expiry Date");
    cockpit.getTableHeader().contains("PDF Exist");
    cockpit.getTableHeader().contains("Invoice Preview");

    cockpit.getAddFilterButton().click({ force: true });
    cockpit.getSmallMenu().contains("User email");
  });

  it("TCM-391 Manage Payment Gateways @EDS", () => {
    cockpit.getMenuItem().eq(6).click();
    cockpit.getPageTitle().contains("Manage Payment Gateways");
    cockpit.getTableHeader().contains("Name");
    cockpit.getTableHeader().contains("Code identifier");
    cockpit.getCreateButton().should("exist");
    cockpit.getCreateButton().click();
    cockpit.getPageTitle().contains("Create Payment Gateway");

    cockpit.getGatewayNameInput().type(testname);
    cockpit.getGatewayCodeMapNameInput().type(testname);
    cockpit.getSaveButton().click();
    cockpit.getEditPGButton().eq(1).click();
    cockpit.getPageTitle().contains("Edit Payment Gateway");
    cockpit.getDeleteButton().should("exist");
  });

  it("TCM-379 Manage subscription discounts table: Columns @EDS", () => {
    cy.viewport(1024, 768);
    cockpit.getMenuItem().eq(7).click();
    cockpit.getPageTitle().contains("Manage Subscription Discounts");
    cockpit.getTableHeader().contains("Code");
    cockpit.getTableHeader().contains("Active");
    cockpit.getTableHeader().contains("URL Applicable");
    cockpit.getTableHeader().contains("Percentage");
    cockpit.getTableHeader().contains("Redeemed Counter");
    cockpit.getTableHeader().contains("Max Redemptions");
    cockpit.getTableHeader().contains("Start date");
    cockpit.getTableHeader().contains("Expiry date");
    cockpit.getTableHeader().contains("Discount Details");
    cockpit.getCreateButton().click();
    cockpit.getPageTitle().contains("Create Discount");
  });

  it("TCM-370 Create plan button @EDS", () => {
    cockpit.getMenuItem().eq(3).click();
    cockpit.getPageTitle().contains("Manage Regions");
    cockpit.getActionMenu().eq(1).click();
    cockpit.getManageSubscriptionPlans().click();
    cockpit.getPageTitle().contains("Manage Subscription Plans");
    cockpit.getCreateButton().click();
    cockpit.getPageTitle().contains("Create Subscription Plan");
  });
  it("TCM-362 Create a region button @SOLR", () => {
    cockpit.getMenuItem().eq(3).click();
    cockpit.getPageTitle().contains("Manage Regions");
    cockpit.getCreateButton().click();
    cockpit.getPageTitle().contains("Create Region");
  });
});
