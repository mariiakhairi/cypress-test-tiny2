import Subscription from "../../../support/pageObjects/subscriptionPage";

describe("Subscription without trial @EDS", function () {
  const sub = new Subscription();
  var url =
    "users?filter=%7B%22email%22%3A%7B%22clause%22%3A%22like%22%2C%22value%22%3A%22%25autotest10%25%22%7D%7D&limit=10&offset=0&sort=%5B%22id%22%2C%22DESC%22%5D";
  var path = "./cypress/fixtures/createUsers/noTrial2.json";
  const userEmail = "autotest10@gmail.com";
  const userPassword = "Password1234";
  const fixture = "createUsers/noTrial2";

  beforeEach(() => {
    cy.visit(`${Cypress.env("baseUrl")}`);
  });
  it("get user ID @EDS", () => {
    cy.login(userEmail, userPassword);
    cy.wait(1500);
    cy.visit(`${Cypress.env("baseUrl")}logout`);
    cy.userId(url, path);
  });
  it("End trial for the user @EDS", () => {
    cy.endTrial(fixture);
  });
  it.skip("TCM-173 Stripe: Subscription without trial @EDS", () => {
    cy.login(userEmail, userPassword);

    cy.visit(`${Cypress.env("baseUrl")}subscriptions`);

    cy.subscribe("4242424242424242");
    // Ensure Subscription for Monthly/yearly plan without trial
    sub.getCurrentSubscriptionName().contains("Zendy Plus");
    // Ensure card number display
    sub.getUserCardNo().contains("4242");
    // Make sure next is visible
    sub
      .getPaymentstatus()
      .invoke("text")
      .should("include", "Subscription renewal date");
    // check view purchase history is there with correct invoice
    sub.getviewpurchasehistory().contains("My Receipts").should("be.visible");
    // check cancel subscription link is there
    sub
      .getCancelsubscriptionbutton()
      .contains("Cancel subscription")
      .should("be.visible");
    // check change payment method link is there
    sub.getChangelink().contains("Change").should("be.visible");
  });
});
