describe("POST /auth/resend-email-confirmation", function () {
  const method = "POST";
  const url =
    `${Cypress.env("API_BASE_URL")}` + "auth/resend-email-confirmation";

  it("Resends email confirmation successfully", () => {
    cy.loginAdminApi().then(() => {
      cy.request({
        method: method,
        url: url,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.status).to.eq(true);
        expect(response.body.error).to.eq("");
      });
    });
  });

  it("Resends email confirmation with error", () => {
    cy.loginAdminApi().then(() => {
      cy.request({
        failOnStatusCode: false,
        method: method,
        url: url,
        body: {
          metaDataUserRole: `${Cypress.env("META_ROLE")}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.name).to.eq("ValidationError");
        expect(response.body.status).to.eq(400);
        expect(response.body.message).to.eq(
          '"metaDataUserRole" is not allowed'
        );
      });
    });
  });
});
