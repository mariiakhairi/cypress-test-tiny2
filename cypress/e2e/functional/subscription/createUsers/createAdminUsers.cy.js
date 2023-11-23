describe("Create admin users", () => {
  const url = `${Cypress.env("API_BASE_URL")}users`;
  const fixture = "createUsers/createUsers";
  const path = "./cypress/fixtures/createUsers/createUsers1.json";

  function write($object) {
    cy.readFile(path).then((array) => {
      array.push($object);
      cy.writeFile(path, array);
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

  it("EDS", () => {
    cy.fixture(fixture).then((data) => {
      cy.request("POST", url, {
        phoneNumber: data.edsPhone,
        role: data.adminRole,
        password: data.password,
        isPhoneVerified: true,
        isRegistrationCompleted: true,
        isEmailVerified: true,
        firstName: data.firstNameLastName,
        lastName: data.firstNameLastName,
        email: data.edsEmail,
        enabled: true,
        regionName: data.edsRegion,
        metaDataUserRole: data.userRole,
      }).then((Response) => {
        write({
          edsUserId: Response.body.data.id,
        });
      });
    });
  });
  it("SOLR premium", () => {
    cy.fixture(fixture).then((data) => {
      cy.request("POST", url, {
        phoneNumber: data.solrPhone,
        role: data.adminRole,
        password: data.password,
        isPhoneVerified: true,
        isRegistrationCompleted: true,
        isEmailVerified: true,
        firstName: data.firstNameLastName,
        lastName: data.firstNameLastName,
        email: data.solrEmail,
        enabled: true,
        regionName: data.solrRegion,
        metaDataUserRole: data.userRole,
      }).then((Response) => {
        write({
          solrUserId: Response.body.data.id,
        });
      });
    });
  });
  it("non-premium", () => {
    cy.fixture(fixture).then((data) => {
      cy.request("POST", url, {
        phoneNumber: data.nonPremiumPhone,
        role: data.adminRole,
        password: data.password,
        isPhoneVerified: true,
        isRegistrationCompleted: true,
        isEmailVerified: true,
        firstName: data.firstNameLastName,
        lastName: data.firstNameLastName,
        email: data.nonPremiumEmail,
        enabled: true,
        regionName: data.nonPremiumRegion,
        metaDataUserRole: data.userRole,
      }).then((Response) => {
        write({
          nonPremiumUserId: Response.body.data.id,
        });
      });
    });
  });
});
