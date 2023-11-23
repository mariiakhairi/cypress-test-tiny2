describe("POST /auth/registration-complete", function () {
  const method = "POST";
  const url = `${Cypress.env("API_BASE_URL")}` + "auth/registration-complete";

  it("Completes user registration successfully", () => {
    cy.loginAdminApi().then(() => {
      cy.request({
        method: method,
        url: url,
        body: {
          metaDataUserRole: `${Cypress.env("META_ROLE")}`,
        },
      }).then((resoponse) => {
        expect(resoponse.status).to.eq(200);
        expect(resoponse.body.status).to.eq(true);
        expect(resoponse.body.error).to.eq("");
      });
    });
  });

  it("Completes user registration Error", () => {
    cy.loginAdminApi().then(() => {
      cy.request({
        failOnStatusCode: false,
        method: method,
        url: url,
        body: {
          metaDataUserRole: `${Cypress.env("META_ROLE")}`,
          metaDataUserPrimaryInterest: "app.metadata.roles.arts_and_humanities",
        },
      }).then((resoponse) => {
        expect(resoponse.status).to.eq(400);
        expect(resoponse.body.name).to.eq("ValidationError");
        expect(resoponse.body.status).to.eq(400);
        expect(resoponse.body.message).to.eq(
          '"metaDataUserPrimaryInterest" is not allowed'
        );
      });
    });
  });
});
