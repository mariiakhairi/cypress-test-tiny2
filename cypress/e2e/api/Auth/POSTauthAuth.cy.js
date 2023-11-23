describe("POST auth/auth", function () {
  const method = "POST";
  const url = `${Cypress.env("API_BASE_URL")}` + "auth/auth";

  it("login as admin", () => {
    cy.request({
      method: method,
      url: url,
      body: {
        email: "user10@zendy.io",
        password: "Password1234",
        reCaptcha: "test",
      },
    }).then((resoponse) => {
      expect(resoponse.status).to.eq(200);
      expect(resoponse.body.status).to.eq(true);
      expect(resoponse.body.error).to.eq("");
    });
  });
});
