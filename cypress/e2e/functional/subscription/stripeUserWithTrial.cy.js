import Subscription from "../../../support/pageObjects/subscriptionPage";

describe("Stripe user with trial@EDS", function () {
  const sub = new Subscription();
  var url =
    "users?filter=%7B%22email%22%3A%7B%22clause%22%3A%22like%22%2C%22value%22%3A%22%25autotest11%25%22%7D%7D&limit=10&offset=0&sort=%5B%22id%22%2C%22DESC%22%5D";
  var path = "./cypress/fixtures/createUsers/stripeTrial.json";
  var fixture = "createUsers/stripeTrial";
  const userEmail = "autotest11@gmail.com";

  function checkChangeLink() {
    sub.getChangeLink().should("be.visible");
    sub.getChangeLink().click();
    sub.getHeader().invoke("text").should("include", "Change payment details");
  }

  beforeEach(() => {
    cy.visit(`${Cypress.env("baseUrl")}`);
  });

  it("get user ID @EDS", () => {
    cy.login(userEmail, "Password1234");
    cy.wait(1500);
    cy.visit(`${Cypress.env("baseUrl")}logout`);

    cy.userId(url, path).then(() => {
      cy.wait(500);
      cy.fixture(fixture).then(() => {
        cy.createTrial(fixture);
      });
    });
  });
  it("TCM-168 Next payment date: subscription with trial @EDS", () => {
    cy.login(userEmail, "Password1234");

    cy.visit(`${Cypress.env("baseUrl")}subscriptions`);

    cy.subscribe(`${Cypress.env("TEST_CARD_NUMBER")}`);

    var date = new Date();
    var day = date.getDate();
    sub
      .getPaymentDateTrial()
      .invoke("text")
      .then(parseInt)
      .then((text) => {
        var dateText = text;
        cy.log(dateText);

        expect(dateText).to.be.greaterThan(day);
      });
  });
  it("TCM-493 View purchase history: subscription with trial @EDS", () => {
    cy.login(userEmail, "Password1234");
    cy.wait(500);
    cy.visit(`${Cypress.env("baseUrl")}/subscriptions`);

    cy.subscribe(`${Cypress.env("TEST_CARD_NUMBER")}`);

    sub.getviewpurchasehistory().should("not.exist");
  });

  it("TCM-495 Change payment method link: subscription with trial/without trial @EDS", () => {
    cy.login(userEmail, "Password1234");
    cy.wait(500);
    cy.visit(`${Cypress.env("baseUrl")}/subscriptions`);
    cy.subscribe(`${Cypress.env("TEST_CARD_NUMBER")}`);
    checkChangeLink();
  });
});
