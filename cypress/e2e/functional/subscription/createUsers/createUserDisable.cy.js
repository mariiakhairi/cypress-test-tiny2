describe("Create user without trial", () => {
  const url = `${Cypress.env("API_BASE_URL")}users`;
  const path = "createUsers/createUsers";

  const path2 = "./cypress/fixtures/createUsers/createUsersDisable.json";

  function write($object) {
    cy.readFile(path2).then((array) => {
      array.push($object);
      cy.writeFile(path2, array);
    });
  }

  beforeEach(() => {
    cy.visit(`${Cypress.env("baseUrl")}`);

    cy.request("POST", `${Cypress.env("API_BASE_URL")}auth/auth`, {
      email: `${Cypress.env("ADMIN_USER_EMAIL")}`,
      password: `${Cypress.env("DEMO_USER_PASSWORD")}`,
      reCaptcha: "test",
    });
  });
  if (path2 == false) {
    it("empty file", () => {
      cy.writeFile(path2, "[]");
    });
  }

  if (path2) {
    it("create user for disable", () => {
      cy.fixture(path).then((data) => {
        cy.request("POST", url, {
          phoneNumber: data.disabledPhone,
          role: data.user,
          password: data.password,
          isPhoneVerified: true,
          isRegistrationCompleted: true,
          isEmailVerified: true,
          firstName: data.firstNameLastName,
          lastName: data.firstNameLastName,
          email: data.disabledEmail,
          enabled: true,
          regionName: data.edsRegion,
          metaDataUserRole: data.userRole,
        }).then((Response) => {
          write({
            disabledUserId: Response.body.data.id,
          });
        });
      });
    });
  } else {
    cy.log("Create file" + path2);
  }
  it("disable", () => {
    const path3 = "/createUsers/createUsersDisable";
    cy.fixture(path3).then((data) => {
      const url2 =
        `${Cypress.env("API_BASE_URL")}users/` +
        data[0].disabledUserId +
        "/disable";
      cy.request("PUT", url2);
    });
  });
});
