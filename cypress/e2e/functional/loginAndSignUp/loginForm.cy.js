import LoginAndRegistration from "../../../support/pageObjects/loginRegistration";
import Header from "../../../support/pageObjects/header";

describe("Log in form", function () {
  const login = new LoginAndRegistration();
  const header = new Header();
  const fixture = "appPages/loginRegisterStrings";

  const appPages = [
    `${Cypress.env("baseUrl")}?signIn=true`,
    `${Cypress.env("baseUrl")}search/?signIn=true`,
    `${Cypress.env("baseUrl")}profile/?signIn=true`,
    `${Cypress.env("baseUrl")}about/?signIn=true`,
    `${Cypress.env("baseUrl")}faqs/?signIn=true`,
    `${Cypress.env("baseUrl")}title/10.1108/qae-06-2016-0027/?signIn=true`,
  ];

  it("TCM-60 Login form: Verify the form fields. @EDS", () => {
    cy.fixture(fixture).then((data) => {
      //go to login form
      login.openLoginForm(appPages[0]);
      //check header text - different for SOLR and EDS
      login.checkPopUpTextOne().contains(data.signInHeaderEDS[0]);
      login.checkPopUpTextTwo().contains(data.signInHeaderEDS[1]);
      //check Google and FB buttons
      login.getGoogleSignInBtn().should("be.visible");
      login.getFacebookSignInBtn().should("be.visible");
      //Check all other form texts and links
      login.getSignInFormDeviderText().contains("or");
      login
        .getLableTextLoginformEmaillabel()
        .scrollIntoView()
        .contains(data.emailLabelText);
      login.getLableTextLoginformPasswordlabel().contains(data.passLabelText);
      login.getForgotPasswordLink().contains(data.changePassLinkText);
      login.getSigninButton().contains(data.signInBtnText);
      // login.getSignupMsgText().contains(data.singUpMsgText);
      // login.getSignUpLinkText().contains(data.signUpLinkText);
    });
  });
  it.skip("TCM-60 Login form: Verify the form fields. @SOLR - needs data test", () => {
    cy.fixture(fixture).then((data) => {
      //go to login form
      login.openLoginForm(appPages[0]);
      //check header text - different for SOLR and EDS
      login.getLoginFormHeader().contains(data.signInHeaderSolr);
      //check Google and FB buttons
      login.getGoogleSignInBtn().should("be.visible");
      login.getFacebookSignInBtn().should("be.visible");
      //Check all other form texts and links
      login.getSignInFormDeviderText().contains("or");
      login.getLabelText().eq(0).scrollIntoView().contains(data.emailLabelText);
      login.getLabelText().eq(1).contains(data.passLabelText);
      login.getForgotPasswordLink().contains(data.changePassLinkText);
      login.getSigninButton().contains(data.signInBtnText);
    });
  });
  it("TCM-264 User can login with email. @SMOKE", () => {
    cy.fixture(fixture).then((data) => {
      cy.visit(`${Cypress.env("baseUrl")}`);
      //Enter valid email and invalid password and check that user is redirected to Homa Page
      header.getHeaderBtn(data.loginHeaderBtnText).click();
      cy.wait(2000);
      cy.login(data.userEmail, data.userPass2);
      cy.url().should("eql", `${Cypress.env("baseUrl")}`);
    });
  });

  it.skip("TCM-63 Invalid Password", () => {
    //not stable
    cy.fixture(fixture).then((data) => {
      // Go to login form
      login.openLoginForm(appPages[0]);

      //Enter valid email and invalid password
      login.getEmailField().type(data.userEmail);
      login.getLoginPasswordField().type(data.userInvalidPass);

      //Click 'sign in'
      login.getSigninButton().click();

      //check error message text
      login.getErrorMsg().contains(data.incorrectPassError);
    });
  });
  it.skip("TCM-55 Forgot password functionality @SMOKE", () => {
    cy.fixture(fixture).then((data) => {
      // Go to login form
      login.openLoginForm(appPages[0]);

      //Enter valid email
      login.getEmailField().type(data.userEmailForgotPass);

      //click Forgot Password
      login
        .getForgotPasswordLink()
        //.invoke("text")
        .contains(data.changePassLinkText)
        .click({ force: true });
      login.getForgotPassFormHeader().contains(data.forgotPassPopupHeader);
      login.checkPopUpText().contains(data.checkYourEmailText1);

      cy.get(":nth-child(3) > div > .text-md").then((text) => {
        expect(text == data.checkYourEmailText2);
      });
      cy.get(
        ".max-w-none > :nth-child(1) > :nth-child(1) > :nth-child(3) > div > :nth-child(2)"
      ).contains(data.checkYourEmailText3);
      cy.get(":nth-child(3) > div > .mt-2").then((text) => {
        expect(text == data.forgotPassSupprtMsgText);
      });

      //check UI after opening the reset password link
      cy.visit(
        `${Cypress.env(
          "baseUrl"
        )}?reset-password=bS5raGFpcmlAemVuZHkuaW98NTY1NA==`
      );
      login.getResetPassFormHeader().contains(data.resetPassHeaderText);
      cy.get(".mt-8 > :nth-child(2) > :nth-child(1) > .block").then((text) => {
        expect(text == data.resetPassLabelText1);
      });

      login.passwordValidationRulesText().should("be.visible");
      login.resetPassBnt().should("be.disabled");

      //Type new password, click save
      login.getPasswordFieldResetPass().type(data.userPass2);

      login.resetPassBnt().should("be.disabled");
      //type diff pass
      login.getConfPassfield().type(data.userInvalidPass);
      //https://knowledgee.atlassian.net/browse/ZD-1466
      //login.getValidationMessage().contains(data.matchText);
      login.resetPassBnt().should("be.disabled");

      //type same pass
      login.getConfPassfield().clear();
      login.getConfPassfield().type(data.userPass2);
      //https://knowledgee.atlassian.net/browse/ZD-1466
      //login.getValidationMessage().contains(data.matchText).should("not.exist");
      login.resetPassBnt().should("be.enabled");

      // stub api response
      cy.intercept("POST", "/auth/reset-password", {
        status: true,
        error: "",
        isCaptchaValid: true,
      }).as("reset");
      login.resetPassBnt().click();
      cy.wait("@reset");

      //check success pop-up text
      login.getReturnToLoginBtn().click();
      login.getSigninButton().should("be.visible");
    });
  });

  it("TCM-105 Login/logout work from Search Page @SMOKE", () => {
    cy.fixture(fixture).then((data) => {
      // Open login form for the search page
      cy.visit(`${Cypress.env("baseUrl")}search?signIn=true`);

      //login
      cy.login(data.userEmail, data.userPass2);

      //check url
      cy.url().should("include", "search?signIn=true");

      //open user menu and logout
      header.getUserMenu().eq(0).click({ force: true });
      header.getLogoutButtonDescktop().click({ force: true });
      cy.url().should("include", "search?signIn=true");
      header.getHeaderBtn(data.loginHeaderBtnText);
    });
  });
  it.skip("TCM-675 User can login after entering wrong email", () => {
    //needs fixes
    cy.fixture(fixture).then((data) => {
      // Open login form for the search page
      login.openLoginForm(appPages[1]);

      //login
      login.getEmailField().type(data.newUserEmail);
      login.getEmailField().clear();
      login.getEmailField().type(data.userEmail);
      login.getLoginPasswordField().type(data.userPass2);
      login.getSigninButton().click();
    });
  });
  it.skip("TCM-697 Login with email address which doesn't exists in DB", () => {
    //needs fixes
    cy.fixture(fixture).then((data) => {
      // Open login form for the search page
      login.openLoginForm(appPages[1]);

      //login
      login.getEmailField().type(data.newUserEmail);
      login.getLoginPasswordField().type(data.userPass2);

      //Click 'sign in'
      login.getSigninButton().click();

      //check error message text
      login.getErrorMsg().contains(data.newEmailError);
    });
  });
  it.skip("TCM-472 Login Form-Invalid email : Error message", () => {
    //needs fixes
    cy.fixture(fixture).then((data) => {
      // Open login form
      login.openLoginForm(appPages[0]);

      //Type invalid email formats
      for (let i = 0; i < data.invalidEmail.length; i++) {
        login.getEmailidField().clear();
        login.getLoginPasswordField().clear();
        login.getEmailField().type(data.invalidEmail[i]);
        login.getLoginPasswordField().type(data.userPass2);

        //Verify the sign in button is not enabled
        login.getSigninButton().should("not.be.enabled");
      }
    });
  });

  it("TCM-69 Account disabled", () => {
    cy.fixture(fixture).then((data) => {
      login.openLoginForm(appPages[0]);
      cy.login("disabled@zendy.io", "Password1234");
      cy.log(data.disabledError);
      login.getErrorMsg().contains(data.disabledError);
    });
  });
});
