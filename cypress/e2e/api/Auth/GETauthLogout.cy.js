describe("GET auth/logout", function () {
  const method = "GET";
  const url = `${Cypress.env("API_BASE_URL")}` + "auth/logout";

  it("user is logged in", () => {
    cy.loginAdminApi().then(() => {
      cy.request({
        method: method,
        url: url,
      }).then((resoponse) => {
        expect(resoponse.status).to.eq(200);
        expect(resoponse.body.status).to.eq(true);
        expect(resoponse.body.error).to.eq("");
      });
    });
  });

  it("user is logged out", () => {
    cy.request({
      method: method,
      url: url,
      failOnStatusCode: false,
    }).then((resoponse) => {
      expect(resoponse.status).to.eq(401);
      expect(resoponse.body.error).to.eq("You must log in");
    });
  });
});
