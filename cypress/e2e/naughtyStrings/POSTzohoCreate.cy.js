describe("POST /zoho/create - naughty stings", function () {
  const method = "POST";
  const url = `${Cypress.env("API_BASE_URL")}` + "zoho/create";
  const randomFullName = "Random";
  const fixture = "blns";
  const path = "./cypress/fixtures/blns_result_zoho.json";

  it("Fist_Name naughty string", () => {
    cy.writeCreate(path);
    cy.loginAdminApi().then(() => {
      cy.fixture(fixture).then((data) => {
        for (let i = 0; i < data.length; i++) {
          cy.request({
            method: method,
            url: url,
            failOnStatusCode: false,
            body: {
              First_Name: data[i],
              Email: "admin22@zendy.io",
              full_url: null,
            },
          }).then((response) => {
            cy.writeAdd(
              {
                naughtyStringInFirstName: data[i],
                status: response.body.status,
                message: response.body.message,
                requestBody: response.requestBody,
              },
              path
            );
          });
        }
      });
    });
  });

  it("Last_Name naughty string", () => {
    cy.writeCreate(path);
    cy.loginAdminApi().then(() => {
      cy.fixture(fixture).then((data) => {
        for (let i = 0; i < data.length; i++) {
          cy.request({
            method: method,
            url: url,
            failOnStatusCode: false,
            body: {
              First_Name: randomFullName,
              Last_Name: data[i],
              Email: "admin22@zendy.io",
              full_url: null,
            },
          }).then((response) => {
            cy.writeAdd(
              {
                naughtyStringInLastName: data[i],
                status: response.body.status,
                message: response.body.message,
                requestBody: response.requestBody,
              },
              path
            );
          });
        }
      });
    });
  });

  it("email naughty string", () => {
    cy.writeCreate(path);
    cy.loginAdminApi().then(() => {
      cy.fixture(fixture).then((data) => {
        for (let i = 0; i < data.length; i++) {
          var naughtyEmail = data[i] + "@zendy.io";
          cy.request({
            method: method,
            url: url,
            failOnStatusCode: false,
            body: {
              First_Name: randomFullName,
              Last_Name: "Smith",
              Email: naughtyEmail,
              full_url: null,
            },
          }).then((response) => {
            cy.writeAdd(
              {
                naughtyEmail: naughtyEmail,
                status: response.body.status,
                message: response.body.message,
                requestBody: response.requestBody,
              },
              path
            );
          });
        }
      });
    });
  });
});
