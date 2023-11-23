describe("POST /auth/send-reset-password", function () {
  const method = "POST";
  const url = `${Cypress.env("API_BASE_URL")}` + "auth/send-reset-password";

  it("Sends reset password email successfully", () => {
    cy.request({
      method: method,
      url: url,
      body: {
        email: `${Cypress.env("API_TEST_ADMIN")}`,
        reCaptcha: `${Cypress.env("RECAPTCHA")}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq(true);
      expect(response.body.error).to.eq("");
    });
  });

  it("Sends reset password email with error", () => {
    cy.request({
      failOnStatusCode: false,
      method: method,
      url: url,
      body: {
        email: "invalid_email",
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.name).to.eq("ValidationError");
      expect(response.body.status).to.eq(400);
      expect(response.body.message).to.eq('"email" must be a valid email');
    });
  });

  it("Sends reset password email with error", () => {
    cy.request({
      failOnStatusCode: false,
      method: method,
      url: url,
      body: {
        email: "example@example.com",
        reCaptcha: `${Cypress.env("RECAPTCHA")}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq(false);
      expect(response.body.retryIn).to.eq(0);
      expect(response.body.error).to.eq("ERR_AUTH_USER_NOT_FOUND");
    });
  });
});
