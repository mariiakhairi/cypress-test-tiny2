import Search from "../../../support/pageObjects/searchPage";
import Subscription from "../../../support/pageObjects/subscriptionPage";

beforeEach(() => {
  cy.visit(`${Cypress.env("baseUrl")}`);
});

describe("User with without trial @EDS", function () {
  const sub = new Subscription();
  const userEmail = "autotest13@gmail.com";
  const userPassword = "Password1234";
  const search = new Search();
  const path = "./cypress/fixtures/createUsers/noTrial.json";
  const fixture = "createUsers/noTrial";
  const url =
    "users?filter=%7B%22email%22%3A%7B%22clause%22%3A%22like%22%2C%22value%22%3A%22%25autotest13%25%22%7D%7D&limit=10&offset=0&sort=%5B%22id%22%2C%22DESC%22%5D";
  it("get user13 user ID @EDS", () => {
    cy.userId(url, path);
  });
  it("End trial for the user13 @EDS", () => {
    cy.endTrial(fixture);
  });

  it("TCM-79 Info message for end of trial user @EDS", () => {
    cy.login(userEmail, userPassword);

    sub
      .getHeaderText()
      .contains(
        "Your trial/subscription to Zendy has ended, to subscribe click here."
      )
      .should("be.visible");

    sub
      .getSubscribeLink()
      .should("have.css", "text-decoration-line", "underline");
  });

  it("TCM-180	When user's trial is ended user is able to perform search @EDS", () => {
    cy.login(userEmail, userPassword);
    cy.visit(`${Cypress.env("baseUrl")}search?q=waters`);
    cy.wait(6000);
    search.getResultNo().should("not.be.empty");
  });

  it("TCM-181 Premium region: without trial / user should be redirected to the plan page when they click on action button @EDS", () => {
    cy.login(userEmail, userPassword);

    cy.visit(
      `${Cypress.env(
        "baseUrl"
      )}search?searchQuery%5B0%5D%5Bterm%5D=Water%20%3A%20Abundance%2C%20Scarcity%2C%20and%20Security%20in%20the%20Age%20of%20Humanity&searchQuery%5B0%5D%5BfieldFilter%5D=title&sortFilters=relevance&filters%5B0%5D%5Bid%5D=FT&filters%5B0%5D%5Bactive%5D=true&dateFilters%5Bstart%5D=1000-1&dateFilters%5Bend%5D=2050-12&dateFilters%5BappliedFromDate%5D=false&dateFilters%5BappliedToDate%5D=false&facetFilters%5B0%5D=__EMPTY_ARRAY__`
    );
    cy.wait(6000);
    search.getFirstResultReadOrDowloadButtonEDS().click();

    cy.contains("Subscribe to continue reading");
    cy.contains("Zendy Plus").should("not.be.empty");
  });
});
