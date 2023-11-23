describe("POST auth/auth - naughty strings", function () {
  const method = "POST";
  const url = `${Cypress.env("API_BASE_URL")}` + "auth/auth";
  const fixture = "blns";
  const path = "./cypress/fixtures/blns_result.json";
  it("login with wierd email - check naughty strings", () => {
    cy.fixture(fixture).then((data) => {
      for (let i = 0; i < data.length; i++) {
        let email = data[i] + "@zendy.io";
        cy.request({
          method: method,
          url: url,
          body: {
            email: email,
            password: "Password1234",
            reCaptcha: "test",
          },
          failOnStatusCode: false,
        }).then((response) => {
          if (response.status == 400) {
            expect(response.status).to.eq(400);
            expect(response.body.status).to.eq(400);
            expect(response.body.message).to.eq(
              '"email" must be a valid email'
            );
          } else {
            expect(response.status).to.eq(200);
            expect(response.body.status).to.eq(200);
            expect(response.body.message).to.eq("ERR_AUTH_INCORRECT_EMAIL");
          }
        });
      }
    });
  });

  it("login with invalid email - check naughty strings", () => {
    cy.fixture(fixture).then((data) => {
      for (let i = 0; i < data.length; i++) {
        let email = data[i];
        cy.request({
          method: method,
          url: url,
          body: {
            email: email,
            password: "Password1234",
            reCaptcha: "test",
          },
          failOnStatusCode: false,
        }).then((response) => {
          if (response.body.message == '"email" is not allowed to be empty') {
            expect(response.status).to.eq(400);
            expect(response.body.status).to.eq(400);
            expect(response.body.message).to.eq(
              '"email" is not allowed to be empty'
            );
          } else {
            expect(response.status).to.eq(400);
            expect(response.body.status).to.eq(400);
            expect(response.body.message).to.eq(
              '"email" must be a valid email'
            );
          }
        });
      }
    });
  });

  it("login with wierd email and wierd password - check naughty strings", () => {
    cy.fixture(fixture).then((data) => {
      for (let i = 0; i < data.length; i++) {
        let email = data[i] + "@zendy.io";
        cy.request({
          method: method,
          url: url,
          body: {
            email: email,
            password: data[i],
            reCaptcha: "test",
          },
          failOnStatusCode: false,
        }).then((response) => {
          if (response.status == 400) {
            expect(response.status).to.eq(400);
            expect(response.body.status).to.eq(400);
            expect(response.body.message).to.eq(
              '"email" must be a valid email'
            );
          } else {
            expect(response.status).to.eq(200);
            expect(response.body.status).to.eq(false);
            expect(response.body.error).to.eq("ERR_AUTH_INCORRECT_EMAIL");
          }
        });
      }
    });
  });

  it("login with wierd password - check naughty strings", () => {
    cy.fixture(fixture).then((data) => {
      for (let i = 0; i < data.length; i++) {
        let email = "user2@zendy.io";
        cy.request({
          method: method,
          url: url,
          body: {
            email: email,
            password: data[i],
            reCaptcha: "test",
          },
          failOnStatusCode: false,
        }).then((response) => {
          if (response.status == 400) {
            expect(response.status).to.eq(400);
            expect(response.body.status).to.eq(400);
            expect(response.body.message).to.eq(
              '"password" is not allowed to be empty'
            );
          } else {
            expect(response.status).to.eq(200);
            expect(response.body.status).to.eq(false);
            expect(response.body.error).to.eq("ERR_AUTH_INCORRECT_PASSWORD");
          }
        });
      }
    });
  });
});
