describe("POST auth/register", function () {
  const method = "POST";
  const url = `${Cypress.env("API_BASE_URL")}` + "auth/register";
  const uuid = () => Cypress._.random(0, 1e6);
  const id = uuid();
  const email = `testApi${id}@zendy.io`;
  const firstName = `testApiName${id}`;
  const lastName = `testApiLastName${id}`;

  it("Register new user success", () => {
    cy.log(email);
    cy.request({
      method: method,
      url: url,
      body: {
        email: email,
        password: `${Cypress.env("DEMO_USER_PASSWORD")}`,
        firstName: firstName,
        lastName: lastName,
        languageCode: `${Cypress.env("LANG_CODE")}`,
        metaDataUserRole: `${Cypress.env("META_ROLE")}`,
        reCaptcha: `${Cypress.env("RECAPTCHA")}`,
      },
    }).then((resoponse) => {
      expect(resoponse.status).to.eq(200);
      expect(resoponse.body.status).to.eq(true);
      expect(resoponse.body.error).to.eq("");
      expect(resoponse.body.user.id).to.exist;
      expect(resoponse.body.user.isRegistrationCompleted).to.eql(true);
      expect(resoponse.body.user.firstName).to.eql(firstName);
      expect(resoponse.body.user.lastName).to.eql(lastName);
      expect(resoponse.body.user.email).to.eql(email);
    });
  });
});
