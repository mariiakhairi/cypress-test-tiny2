describe("Delete disable user", () => {
  const url1 = `${Cypress.env("API_BASE_URL")}users/`;
  const path = "createUsers/createUsersDisable";
  const path2 = "./cypress/fixtures/createUsers/createUsersDisable.json";

  beforeEach(() => {
    cy.visit(`${Cypress.env("baseUrl")}`);
    cy.request("POST", `${Cypress.env("API_BASE_URL")}auth/auth`, {
      email: `${Cypress.env("ADMIN_USER_EMAIL")}`,
      password: `${Cypress.env("DEMO_USER_PASSWORD")}`,
      reCaptcha: "test",
    });
  });

  it("disabledUser user delete", () => {
    cy.fixture(path).then((data) => {
      cy.request("DELETE", url1 + data[0].disabledUserId);
    });
  });

  it("clear the fixture file", () => {
    cy.writeFile(path2, "[]");
  });
});
