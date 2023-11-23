import Subscription from "../../../support/pageObjects/subscriptionPage";

describe("Test Incomplete @EDS", function () {
  const sub = new Subscription();
  const userEmail = "autotest3@gmail.com";
  var url =
    "users?filter=%7B%22email%22%3A%7B%22clause%22%3A%22like%22%2C%22value%22%3A%22%25autotest2%25%22%7D%7D&limit=10&offset=0&sort=%5B%22id%22%2C%22DESC%22%5D";
  var path = "./cypress/fixtures/createUsers/incomplete.json";
  var fixture = "createUsers/incomplete";

  beforeEach(() => {
    cy.visit(`${Cypress.env("baseUrl")}`);
  });
  it("get user ID @EDS", () => {
    cy.login(userEmail, "Password1234");
    cy.wait(1500);
    cy.visit(`${Cypress.env("baseUrl")}logout`);
    cy.userId(url, path);
  });

  it("End trial @EDS", () => {
    cy.endTrial(fixture);
  });
  it("TCM-177	Plan without trial/Incomplete @EDS", () => {
    cy.login(userEmail, "Password1234");
    cy.wait(500);
    cy.visit(`${Cypress.env("baseUrl")}subscriptions`);
    cy.wait(500);

    cy.subscribeIncomplete(`${Cypress.env("INCOMPLETE_CARD_NUMBER")}`);

    sub
      .getHeaderTextIncomplete()
      .contains("There is an issue with your subscription payment")
      .should("not.be.empty");

    // cy.get('div[data-test= "profile-form"]')
    sub
      .getIncompeteerror()
      .contains(
        "Your payment was unsuccessful. Please ensure you have entered the correct card details or contact your bank for further clarifications."
      );
    sub.getIncompleteerror2().contains("Send us an email at ");
    //check change payment link visible or not
    sub.getChangelink().contains("Change").should("be.visible");
  });
});
