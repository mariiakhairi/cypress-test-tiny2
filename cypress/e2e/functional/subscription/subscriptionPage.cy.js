import Subscription from "../../../support/pageObjects/subscriptionPage";
describe("Subscription page @EDS", function () {
  const sub = new Subscription();

  it.skip("Only logged in user can see the plan page @EDS", () => {
    // this test is done to pass on staging on prod the sanity check is done to check the coming soon for this page
    // the goal is to see that plan page is opened
    cy.visit(`${Cypress.env("baseUrl")}`);
    cy.loginAdmin();
    cy.wait(4000);

    cy.visit(`${Cypress.env("baseUrl")}subscriptions`);
    sub.getSelectYourPlan();
  });
});
