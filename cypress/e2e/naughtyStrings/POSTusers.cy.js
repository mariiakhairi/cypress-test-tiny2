describe("POST /users - naughty stings", function () {
  const method = "POST";
  const url = `${Cypress.env("API_BASE_URL")}` + "users";
  const randomFullName = "Random User";
  const fixture = "blns";
  const path = "./cypress/fixtures/blns_result.json";

  it("Creates a new user with naughty stings", () => {
    cy.writeCreate(path);
    cy.loginAdminApi().then(() => {
      cy.fixture(fixture).then((data) => {
        for (let i = 0; i < data.length; i++) {
          let email = data[i] + "@example.com";
          cy.request({
            method: method,
            url: url,
            failOnStatusCode: false,
            body: {
              email: email,
              enabled: true,
              firstName: randomFullName,
              isRegistrationCompleted: true,
              lastName: "",
              metaDataUserRole: `${Cypress.env("META_ROLE")}`,
              password: "Password1234",
              role: 2,
            },
          }).then((response) => {
            if (response.body.message == "'email' email must be unique") {
              expect(response.status).to.eq(400);
              expect(response.body.status).to.eq(400);
              expect(response.body.message).to.eq(
                "'email' email must be unique"
              );
            } else if (
              response.body.message == '"email" must be a valid email'
            ) {
              expect(response.status).to.eq(400);
              expect(response.body.status).to.eq(400);
              expect(response.body.message).to.eq(
                '"email" must be a valid email'
              );
            } else {
              cy.writeAdd(
                {
                  email: email,
                  status: response.status,
                  status_body: response.body.status,
                  message: response.body.message,
                },
                path
              );
            }
          });
        }
      });
    });
  });

  it("Creates a new user invalid email", () => {
    cy.writeCreate(path);
    cy.loginAdminApi().then(() => {
      cy.fixture(fixture).then((data) => {
        for (let i = 0; i < data.length; i++) {
          let email = data[i];
          cy.request({
            method: method,
            url: url,
            failOnStatusCode: false,
            body: {
              email: email,
              enabled: true,
              firstName: randomFullName,
              isRegistrationCompleted: true,
              lastName: "",
              metaDataUserRole: `${Cypress.env("META_ROLE")}`,
              password: "Password1234",
              role: 2,
            },
          }).then((response) => {
            if (response.body.message == "'email' email must be unique") {
              expect(response.status).to.eq(400);
              expect(response.body.status).to.eq(400);
              expect(response.body.message).to.eq(
                "'email' email must be unique"
              );
            } else if (
              response.body.message == '"email" must be a valid email'
            ) {
              expect(response.status).to.eq(400);
              expect(response.body.status).to.eq(400);
              expect(response.body.message).to.eq(
                '"email" must be a valid email'
              );
            } else if (
              response.body.message == '"email" is not allowed to be empty'
            ) {
              expect(response.status).to.eq(400);
              expect(response.body.status).to.eq(400);
              expect(response.body.message).to.eq(
                '"email" is not allowed to be empty'
              );
            } else {
              cy.writeAdd(
                {
                  email: email,
                  status: response.status,
                  status_body: response.body.status,
                  message: response.body.message,
                },
                path
              );
            }
          });
        }
      });
    });
  });
});
