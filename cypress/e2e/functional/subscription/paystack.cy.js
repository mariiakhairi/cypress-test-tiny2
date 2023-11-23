describe.skip("Create admin users", () => {
    const url = `${Cypress.env("API_BASE_URL")}users`;
    const fixture = "createUsers/createUsers";
    const userfixture = "createUsers/createUsers1"
    const path = "./cypress/fixtures/createUsers/createUsers1.json";
    const url1 = `${Cypress.env("API_BASE_URL")}auth/auth`;
    let randomEmail;
  //  const userEmail
  
    function write($object) {
      cy.readFile(path).then((array) => {
        array.push($object);
        cy.writeFile(path, array);
      });
    }
    function generateRandomEmail() {
        const randomString = Math.random().toString(36).substring(7);
        return `test${randomString}@example.com`;
    }
     // Define the request body with your login credentials
     const requestBody = {
        email: "user99@zendy.io",
        password: 'Password1234',
        reCaptcha: "test"
      };
  
      // Define request headers
      const requestHeaders = {
        "custom-country-header": "NG",
        "access-key": "ze0knxn2do4wry2le7bfg1le"
        // You can add any other headers as needed
      };
  
   
  beforeEach(() => {
    cy.visit(`${Cypress.env("baseUrl")}`);
  });   
        
    
    
 it("SOLR premium", () => {
    cy.request({
        method: 'POST', // Specify the HTTP method (e.g., POST for login)
        url: url1, // Replace with the actual login endpoint URL
        headers: requestHeaders, // Pass the headers
        body: {
            email: "user99@zendy.io",
            password: "Password1234",
            reCaptcha: "test",
          }, // Convert the request body to JSON
      }).then((response) => {
        console.log(response)
        // Assertions or further actions based on the response
        expect(response.status).to.equal(200); // Assuming a successful login returns a 200 status code
        // Add more assertions as needed
      });
       // Generate a random email address
      
      cy.fixture(fixture).then((data) => {
        randomEmail = generateRandomEmail();
        cy.request("POST", url, {
          
          role: "2",
          password: data.password,
          isRegistrationCompleted: true,
          isEmailVerified: true,
          firstName: data.firstNameLastName,
          lastName: data.firstNameLastName,
          email: randomEmail,
          enabled: true,
          metaDataUserRole: data.userRole,
        }).then((Response) => {
            expect(Response.status).to.equal(200);

            

        });
      });
    });

    it("Login in SOLR region and subscribe to paystack ", () => {
       // cy.login(userEmail, "Password1234");
       const newUserCredentials = {
        username: randomEmail, // Use the randomly generated email
        password: 'Password1234', // Use the password specified during user creation
      };
      cy.get('[data-test="guestHeader"]')
      .find("button")
      .contains("log in", {
        matchCase: false,
      })
      .click({ force: true });
    cy.wait(2000);
    cy.get('[data-test="email-field"]').type(newUserCredentials.username);
    cy.get('[data-test="password-field"]').type(newUserCredentials.password);
    cy.get('[data-test="sign_in_btn"]').click({ force: true });
    cy.wait(2000);

    cy.visit(`${Cypress.env("baseUrl")}subscriptions`);
    cy.wait(500);
    cy.get(':nth-child(1) > .mt-10 > :nth-child(1) > :nth-child(1) > .bg-primary').click()
    cy.wait(10000)

        })



    })
