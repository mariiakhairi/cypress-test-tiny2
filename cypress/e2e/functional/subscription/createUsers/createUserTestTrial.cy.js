describe("Create user without trial", () => {
  const url = `${Cypress.env("API_BASE_URL")}users`;
  const path = "createUsers/createUsers";
  const path2 = "./cypress/fixtures/createUsers/createUsers2.json";

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

  it("EDS", () => {
    cy.fixture(path).then((data) => {
      cy.request("POST", url, {
        phoneNumber: data.noTrialEdsPhone,
        role: data.adminRole,
        password: data.password,
        isPhoneVerified: true,
        isRegistrationCompleted: true,
        isEmailVerified: true,
        firstName: data.firstNameLastName,
        lastName: data.firstNameLastName,
        email: data.noTrialEdsEmail,
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

  it("EDS cansel trial", () => {
    cy.fixture(path).then((data) => {
      cy.request("POST", url, {
        phoneNumber: data.noTrialEds1Phone,
        role: data.adminRole,
        password: data.password,
        isPhoneVerified: true,
        isRegistrationCompleted: true,
        isEmailVerified: true,
        firstName: data.firstNameLastName,
        lastName: data.firstNameLastName,
        email: data.noTrialEds1Email,
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
  it("SOLR no trial", () => {
    cy.fixture(path).then((data) => {
      cy.request("POST", url, {
        phoneNumber: data.noTrialSolrPhone,
        role: data.adminRole,
        password: data.password,
        isPhoneVerified: true,
        isRegistrationCompleted: true,
        isEmailVerified: true,
        firstName: data.firstNameLastName,
        lastName: data.firstNameLastName,
        email: data.noTrialSolrEmail,
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
});
