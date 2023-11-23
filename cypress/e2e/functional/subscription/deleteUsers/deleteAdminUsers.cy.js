describe("Delete admin users", () => {
  const url1 = `${Cypress.env("API_BASE_URL")}users/`;
  const path = "createUsers/createUsers1";
  const path2 = "./cypress/fixtures/createUsers/createUsers1.json";

  beforeEach(() => {
    cy.visit(`${Cypress.env("baseUrl")}`);
    cy.request("POST", `${Cypress.env("API_BASE_URL")}auth/auth`, {
      email: `${Cypress.env("ADMIN_USER_EMAIL")}`,
      password: `${Cypress.env("DEMO_USER_PASSWORD")}`,
      reCaptcha: "test",
    });
  });

  it("EDS user delete", () => {
    cy.fixture(path).then((data) => {
      cy.request("DELETE", url1 + data[0].edsUserId);
    });
  });
  it("SOLR user delete", () => {
    cy.fixture(path).then((data) => {
      cy.request("DELETE", url1 + data[1].solrUserId);
    });
  });
  it("non-premium user delete", () => {
    cy.fixture(path).then((data) => {
      cy.request("DELETE", url1 + data[2].nonPremiumUserId);
    });
  });

  it("clear the fixture file", () => {
    cy.writeFile(path2, "[]");
  });
});
