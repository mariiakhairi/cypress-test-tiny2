import Subscription from "../../../support/pageObjects/subscriptionPage";
describe(
  "Subscription Page - Stripe - user with out trial @EDS",
  { execTimeout: 90000 },
  function () {
    const sub = new Subscription();
    const userEmail = "autotest5@gmail.com";
    const userPassword = "Password1234";
    const fixture = "createUsers/noTrial";
    var url =
      "users?filter=%7B%22email%22%3A%7B%22clause%22%3A%22like%22%2C%22value%22%3A%22%25autotest5%25%22%7D%7D&limit=10&offset=0&sort=%5B%22id%22%2C%22DESC%22%5D";
    var path = "./cypress/fixtures/createUsers/noTrial.json";

    function checkChangeLink() {
      sub.getChangeLink().should("be.visible");
      sub.getChangeLink().click();
      sub
        .getHeader()
        .invoke("text")
        .should("include", "Change payment details");
    }
    beforeEach(() => {
      cy.visit(`${Cypress.env("baseUrl")}`);
      cy.wait(500);
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

    it("TCM-491 Cancel subscription button: User subscribed no trial @EDS", () => {
      cy.login(userEmail, userPassword);
      cy.wait(500);
      cy.visit(`${Cypress.env("baseUrl")}/subscriptions`);

      cy.subscribe(`${Cypress.env("TEST_CARD_NUMBER")}`);

      sub.getCancelsubscriptionbutton().should("be.visible");
    });

    it("TCM-495 Change payment method link: subscription without trial @EDS", () => {
      cy.visit(`${Cypress.env("baseUrl")}`);
      cy.wait(500);
      cy.login(userEmail, userPassword);
      cy.wait(500);
      cy.visit(`${Cypress.env("baseUrl")}/subscriptions`);
      checkChangeLink();
    });
  }
);
