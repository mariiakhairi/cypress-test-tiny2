import LoginAndRegistration from "../../../support/pageObjects/loginRegistration";
import Header from "../../../support/pageObjects/header";
import ProfilePage from "../../../support/pageObjects/profile";

describe("Sign up form", function () {
  const signup = new LoginAndRegistration();
  const header = new Header();
  const profile = new ProfilePage();
  const fixture = "appPages/loginRegisterStrings";

  function singUp() {
    var uuid = () => Cypress._.random(0, 1e6);
    var id = uuid();
    var email = `new${id}@mailinator.com`;
    var name = `newtest${id}`;
    signup.getFullNameField().type(name);
    signup.getRoleDropDown().click({ force: true });
    signup.getRoleOption("Academic researcher").click();
    signup.getEmailField().type(email);
    signup.getPasswordField().type("Password1234");
    signup.getSignUpButton().click();
    cy.wait(2000);
  }
  beforeEach(() => {
    cy.visit(`${Cypress.env("baseUrl")}`);
    cy.wait(500);
    header.getSignUpButton().click();
  });

  it("TCM-514 Sign up with email", () => {
    singUp();
    signup.getInterestPopUpHeader().then((text) => {
      expect(text == "Get started");
    });
    signup.getSubmitInterestButton().then((text) => {
      expect(text == "Submit");
    });
    signup
      .getInterestPopupSkip()
      .should("be.visible")
      .should("have.text", "Skip for now");
  });

  it("TCM-463 Verify the Sign Up form fields.", () => {
    cy.fixture(fixture).then((data) => {
      signup.getLoginFormHeader().contains(data.signUpHeaderEDS);
      //check Google and FB buttons
      signup.getGoogleSignInBtn().should("be.visible");
      signup.getFacebookSignInBtn().should("be.visible");
      //Check all other form texts and links
      signup.getSignInFormDeviderText().contains("or");
      signup
        .getLabelText()
        .eq(0)
        .scrollIntoView()
        .contains(data.fullNameLabelText);
      signup.getEmailtext().contains(data.emailLabelText);
      signup.getLabelText().eq(2).contains(data.passLabelText);

      signup.getPasswordRulesTextTitle().contains(data.passwordRulesText);
      signup.getPasswordRulesTextRule().eq(0).contains(data.passwordRule1);
      signup
        .getPasswordRulesTextRule()
        .find('[data-test="password-validation-rules-list-upperCase"]')
        .contains(data.passwordRule2);
      signup
        .getPasswordRulesTextRule()
        .find('[data-test="password-validation-rules-list-lowerCase"]')
        .contains(data.passwordRule3);
      signup
        .getPasswordRulesTextRule()
        .find('[data-test="password-validation-rules-list-oneNumber"]')
        .contains(data.passwordRule4);

      signup.getSignupButtton().scrollIntoView().contains(data.signUpBtnText);
      // signup.getSigninMsgText().contains(data.singInMsgText);
      signup.getSigninMsgText().contains(data.loginLinkText);
      //signup.getSignupTermsofuseMsgText().contains(data.termsofUseMsgText);
      signup.getSinupTermsofuselinkText().contains(data.termsofUseLinkText);
      signup
        .getSinupTermsofuselinkText()
        .should("have.attr", "href")
        .and("include", "https://content.zendy.io/zendy-terms-of-use/");
      signup
        .getSingupPrivacyLink()
        .should("have.attr", "href")
        .and("include", "https://content.zendy.io/privacy-policy/");
    });
  });
  it("TCM-263 Register a new user and check avtar menu available or not @SMOKE", () => {
    singUp();
    signup
      .getInterestPopupSkip()
      .should("be.visible")
      .should("have.text", "Skip for now")
      .click();
    cy.wait(1000);
    header.getUserMenu().should("be.visible");
  });

  it("TCM-272 Sign up form: Existing User - Error Message", () => {
    cy.fixture(fixture).then((data) => {
      signup.getFullNameField().type(data.userName);
      signup.getRoleDropDown().click({ force: true });
      signup.getRoleOption("Academic researcher").click();
      signup.getEmailField().type(data.userName2);
      signup.getPasswordField().type(data.userPass);
      signup.getSignupButtton().click();
      signup.getErrorMsg().contains(data.errorText);
    });
  });

  it.skip("TCM-682 Search for the interest", () => {
    singUp();
    signup.getInterestInput().type("Com");
    cy.wait(3000);

    //Verify the the auto complete list contains searched word
    signup.getInterestList().each(function ($ele, index, $list) {
      cy.log($ele.text());
      cy.wrap($ele).invoke("text").should("contain", "Com");
    });

    // verify that the list doesn't show No options/not found
    signup.getInterestList().should("not.contain", "No options");
    signup.getInterestList().should("not.contain", "Not found");

    // https://knowledgee.atlassian.net/browse/ZD-1478
    // //Type an invalid word and verify no options is displayed
    // signup.getInterestInput().type("qwerty");
    // cy.wait(3000);
    // signup.getInterestList().should("contain", "No options");
  });

  it.skip("TCM-701 Interest popup displayed with default 20 values", () => {
    singUp();
    signup.getInterestInput().click();
    cy.wait(3000);
    signup.getInterestList().should("not.contain", "No options");
    // signup.getInterestList().should("have.length", "20");

    signup.getInterestInput().find("svg").click().trigger("mousedown");
    // cy.wait(3000);
    // signup.getInterestList().should("not.contain", "Not found");
    // signup.getInterestList().should("have.length", "20");
  });

  it.skip("TCM-702 & TCM-679 Add maximum interest and check for error message", () => {
    singUp();
    signup.getInterestInput().type("Com");
    cy.wait(3000);

    //Add the deafult 20 interests options and submit
    signup.getInterestList().each(function ($ele, index, $list) {
      cy.wrap($ele).click();
    });

    //Try to add more than 20 interests
    signup.getInterestInput().type("Com");
    cy.wait(3000);
    // Search results are not displayed
    signup.getInterestList().should("not.be.visible");
    // Error message is dispalyed
    signup
      .getInterestPopupErrorMessage()
      .should("be.visible")
      .should(
        "contain.text",
        "You have already selected the maximum number of options."
      );

    //Submit 20 interests
    signup.getInterestPopupButton().click();

    // Verify profile interest is not showing red border by default
    cy.visit(`${Cypress.env("baseUrl")}profile`);
    profile
      .getInterestDropdown()
      .should("not.have.css", "border", `1px solid red`);

    // Verify error message is displayed on clicking the input to add more than 20 interest
    profile.getInterestDropdown().click();
    profile
      .getMaxInterestError()
      .should("be.visible")
      .should(
        "contain.text",
        "You have already selected the maximum number of options."
      );
  });
});
