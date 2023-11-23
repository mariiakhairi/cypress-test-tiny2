import Subscription from "../../../support/pageObjects/subscriptionPage";

describe("Resubscribe @EDS", function () {
  const sub = new Subscription();
  var url =
    "users?filter=%7B%22email%22%3A%7B%22clause%22%3A%22like%22%2C%22value%22%3A%22%25autotest9%25%22%7D%7D&limit=10&offset=0&sort=%5B%22id%22%2C%22DESC%22%5D";
  var path = "./cypress/fixtures/createUsers/resubscribe.json";
  const fixture = "createUsers/resubscribe";
  const userEmail = "autotest9@gmail.com";
  const userPassword = "Password1234";

  beforeEach(() => {
    cy.visit(`${Cypress.env("baseUrl")}`);
  });
  it("get user ID @EDS", () => {
    cy.login(userEmail, userPassword);
    cy.wait(1500);
    cy.visit(`${Cypress.env("baseUrl")}logout`);
    cy.userId(url, path);
  });

  it("End trial @EDS", () => {
    cy.visit(`${Cypress.env("baseUrl")}`);
    cy.wait(500);
    cy.endTrial(fixture);
  });
  it("TCM-750 Stripe: Subscription without trial @EDS @SMOKE", () => {
    cy.login(userEmail, userPassword);

    cy.visit(`${Cypress.env("baseUrl")}subscriptions`);

    cy.subscribe(`${Cypress.env("AMER_EXPRESS_CARD_NUMBER")}`);

    sub.getCurrentSubscriptionName().contains("Zendy Plus");
    //check card detail
    sub.getUserCardNo().contains("0005");
    //check change payment link visible or not
    sub.getChangelink().contains("Change").should("be.visible");
    //TCM-491 Cancel subscription button: User subscribed no trial/ with trial
    sub
      .getCancelsubscriptionbutton()
      .contains("Cancel subscription")
      .should("be.visible");
    //TCM-490 View purchase history: User subscribed no trial
    sub.getviewpurchasehistory().contains("My Receipts").should("be.visible");
    //check paymnet status text
    sub
      .getPaymentstatus()
      .invoke("text")
      .should("include", "Subscription renewal date");

    // TCM-169 Payment date: User subscribed no trial
    //comapring date from receipt
    var regex = /(st|nd|rd|th)/;
    sub
      .getPaymentDate()
      .invoke("text")
      .then((text) => {
        var dateText = new Date(text.replace(regex, ","));
        cy.log(dateText);
        sub
          .getReceiptDate()
          .invoke("text")
          .then((text2) => {
            var dateText2 = new Date(text2.replace(regex, ","));
            cy.log(dateText2);
            expect(dateText).to.be.greaterThan(dateText2);
          });
      });
  });

  it("TCM-485 Change payment method link: no trial - cancel plan @EDS", () => {
    cy.login(userEmail, userPassword);

    cy.visit(`${Cypress.env("baseUrl")}subscriptions`);
    sub.getCancelsubscriptionbutton().click();

    sub.getCancelpopupyesbutton().click();
    cy.contains("Reason for cancelling").should("not.be.empty");

    cy.contains("Please tell us why you are cancelling").click();
    cy.contains("I didn’t find what I was looking for").click();
    sub.getCancelpopupbutton().click();
    sub.getChangeLink().should("not.exist");
  });

  it("TCM-171 View purchase history: No trial - cancel plan @EDS", () => {
    cy.login(userEmail, userPassword);

    cy.visit(`${Cypress.env("baseUrl")}subscriptions`);

    //user without trial can see view purchase history with the right amount charged after cancelling plan
    sub.getviewpurchasehistorybutton().should("be.visible");
    sub.getViewPurchaseHistoryAmount().invoke("text").should("eql", "AED  75");
  });

  it("TCM-489 Resubscribe button: Trial active->cancel plan & no trial -> cancel plan@EDS", () => {
    cy.login(userEmail, userPassword);

    cy.visit(`${Cypress.env("baseUrl")}subscriptions`);

    sub.getResubscribebutton().click();
    cy.get("[class$='dialog-title'] > span").contains("Confirm resubscription");
    cy.get("[class*='MuiDialogActions'] > :nth-child(2)").eq(1).click();
    cy.wait(5000);
    //check paymnet status text
    cy.contains("You’re now subscribed");

    //check view purchase history visible or not
    sub.getviewpurchasehistorybutton().should("be.visible");

    //check change payment link visible or not
    sub.getChangelink().contains("Change").should("be.visible");
    //check cancel subscription link visible or not
    sub
      .getCancelsubscriptionbutton()
      .contains("Cancel subscription")
      .should("be.visible");
  });
});
