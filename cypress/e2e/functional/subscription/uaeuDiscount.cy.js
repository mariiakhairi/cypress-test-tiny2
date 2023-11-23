import UaeuDisc from "../../../support/pageObjects/uaeuDiscount";

describe("TCM-212 100% url @EDS", function () {
  const uaeu = new UaeuDisc();
  const uuid = () => Cypress._.random(0, 1e6);
  const id = uuid();
  var discountCodeName = `UAEU${id}`;
  var email = `UAEU${id}@mailinator.com`;
  var email2 = `UAEU${id}@zendy.com`;

  beforeEach(() => {
    cy.visit(`${Cypress.env("baseUrl")}`);
    cy.wait(500);
  });
  it("1. create UAEU discount and new user @EDS", () => {
    //login with admin user
    cy.loginAdminApi();
    cy.wait(500);

    //create new user
    cy.createNewUser(email);

    //create 100% discount
    cy.request(
      "POST",
      `${Cypress.env("API_BASE_URL")}subscriptions/discounts`,
      {
        active: true,
        urlApplicable: true,
        discountCode: discountCodeName,
        discountPercentage: 100,
        maximumRedemptions: 1,
        startDate: "2022-08-10 06:50:29.711+00",
        expiryDate: "2026-08-10 06:50:29.711+00",
        metadata: {
          customErrorMessage:
            "Unfortunately, the quota of 100 alumni users has reached its limit. Please contact your provider. We will also get in contact with UAEU to inform them and urge them to extend the quota.",
          paymentGateways: [
            {
              discount: "promo_1HTljMD9sYh65PYtUydp5bTE",
              type: "stripe",
            },
          ],
        },
      }
    ).then((response) => {
      expect(response.body).to.have.property("status", true); // true
    });
    cy.visit(`${Cypress.env("baseUrl")}admin/discounts`);
    cy.wait(2000);

    //find the UAE code in the table and click "Edit"
    cy.get("table >tbody >tr td:nth-child(1) span").each(
      ($e1, index, $list) => {
        if ($e1.text() === discountCodeName) {
          cy.get("table >tbody >tr td:nth-child(10) >a >span span")
            .eq(index)
            .click();
        } else {
          cy.log("Not found");
        }
      }
    );
    cy.wait(2000);
    cy.get('[name="discountCode"]').should("have.value", discountCodeName);

    //select region
    cy.get('[data-testid="selectArray"]').eq(0).click();
    cy.get("ul >li").each(($e1, index, $list) => {
      if ($e1.text().includes("AE")) {
        cy.get("ul > li").eq(index).click();
      } else {
        cy.log("Not found");
      }
    });

    //close region drop-down
    cy.get("body").trigger("keydown", { keyCode: 27 });
    cy.wait(500);
    cy.get("body").trigger("keyup", { keyCode: 27 });

    //select plan
    cy.get('[data-testid="selectArray"]').eq(1).click();
    cy.get("ul >li").each(($e1, index, $list) => {
      if ($e1.text().includes("AE: Zendy Plus")) {
        cy.get("ul > li").eq(index).click();
      } else {
        cy.log("Not found");
      }
    });

    //close plan drop-down
    cy.get("body").trigger("keydown", { keyCode: 27 });
    cy.wait(500);
    cy.get("body").trigger("keyup", { keyCode: 27 });

    //save
    cy.get('[type="submit"]').click();
    cy.logout();
  });
  it("2. when you apply org discount it should work @EDS", () => {
    //login with new user
    cy.request("POST", `${Cypress.env("API_BASE_URL")}auth/auth`, {
      email: email,
      password: "Password1234",
      reCaptcha: "test",
    });
    cy.wait(500);
    cy.visit(`${Cypress.env("baseUrl")}`);
    cy.wait(500);

    //apply 100% Url
    cy.visit(`${Cypress.env("baseUrl")}discount/` + discountCodeName);
    cy.wait(3000);

    //check confirmation popup
    uaeu.getConfirmationPopup().click({ force: true });
    cy.wait(3000);

    //check plan name
    cy.visit(`${Cypress.env("baseUrl")}subscriptions`);
    uaeu.getCurrentPaymentPlanTxt().contains("Current payment plan");
  });

  it("3. check custom error msg when user limit is reached @EDS", () => {
    //login with user that doesn't have subsciption
    cy.loginAdminApi();
    cy.wait(500);
    cy.createNewUser(email2);
    cy.logout();
    cy.login(email2, "Password1234");

    //Subsctibe with expired code url
    cy.visit(`${Cypress.env("baseUrl")}discount/` + discountCodeName);
    cy.wait(3000);

    //check the custom error msg
    uaeu
      .getCustomErrorMsg()
      .contains(
        "Unfortunately, the quota of 100 alumni users has reached its limit. Please contact your provider. We will also get in contact with UAEU to inform them and urge them to extend the quota."
      );
  });
  it("4. Delete UAEU disount @EDS", () => {
    cy.login("user2@zendy.io", "Password1234");
    cy.visit(`${Cypress.env("baseUrl")}admin/discounts`);
    cy.wait(2000);

    //find the UAE code in the table and click "Edit"
    cy.get("table >tbody >tr td:nth-child(1) span").each(
      ($e1, index, $list) => {
        if ($e1.text() === discountCodeName) {
          cy.get("table >tbody >tr td:nth-child(10) >a >span span")
            .eq(index)
            .click();
        } else {
          cy.log("Not found");
        }
      }
    );

    //delete
    cy.get('[aria-label="Delete"]').click();
    cy.get(".ra-confirm").click();
  });
});
