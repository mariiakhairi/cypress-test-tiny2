import ProfilePage from "../../support/pageObjects/profile";
import Header from "../../support/pageObjects/header";
import UserMenu from "../../support/pageObjects/userMenu";

describe("Profile page", function () {
  const profile = new ProfilePage();
  const header = new Header();
  const menu = new UserMenu();

  const fixture = "appPages/profile";

  const profilePageLabels = [
    "Email",
    "First name",
    "Last name",
    "Role",
    "Interest",
    "Language",
  ];
  beforeEach(() => {
    cy.visit(`${Cypress.env("baseUrl")}`);
    cy.loginAdminApi();
    cy.visit(`${Cypress.env("baseUrl")}profile`);
    cy.wait(2000);
  });

  it("TCM-164 Check labels for the profile page", () => {
    profile.checkProfileFormLabelText(profilePageLabels[0]);
    profile.checkProfileFormLabelText(profilePageLabels[1]);
    profile.checkProfileFormLabelText(profilePageLabels[2]);
    profile.checkProfileFormLabelText(profilePageLabels[3]);
    profile.checkProfileFormLabelText(profilePageLabels[4]);
    //https://knowledgee.atlassian.net/browse/ZD-1341
    //profile.checkProfileFormLabelText(profilePageLabels[5]);
  });

  it("TCM-166	Check validation message for each field", () => {
    cy.fixture(fixture).then((profileData) => {
      profile.getProfileFirstName().clear();
      profile.getSaveProfileButton().click();

      profile.checkProfileErrorText(profileData.ProfileErrorText1);

      cy.reload();

      profile.getProfileLastName().clear();
      profile.getSaveProfileButton().click();
      profile.checkProfileErrorText(profileData.ProfileErrorText2);

      cy.reload();

      profile.getProfileRoleSelect().click();
      profile
        .getProfileRoleSelectOption()
        .contains("Other professional")
        .click();
      profile.getSaveProfileButton().click();
      profile.checkProfileErrorText(profileData.ProfileErrorText3);
      cy.reload();

      profile.removeSelectedInterest().click();
      profile.getSaveProfileButton().click();
      profile.checkProfileError().should("be.visible");
      //https://knowledgee.atlassian.net/browse/ZD-1342
      //profile.checkProfileErrorText(profileData.ProfileErrorText4);
    });
  });

  it.skip("TCM-167	Change value of each field needs fixes", () => {
    const uuid = () => Cypress._.random(0, 1e6);
    const id = uuid();
    const ramdomName = `testname${id}`;
    //first name can be updated
    profile.getProfileFirstName().clear();
    cy.wait(500);
    profile.getProfileFirstName().type(ramdomName);
    cy.wait(500);
    profile.getSaveProfileButton().click();
    cy.reload();
    //profile.getProfileFirstName().should("include", ramdomName);

    // profile.getProfileInputField("#lastName").clear();
    // profile.getProfileInputField("#lastName").type(ramdomName);

    // profile.getProfileInputField("#metaDataUserRole").clear();
    // profile.checkProfileFormLabelText("Corporate researcher").click();

    // if (profile.removeSelectedInterest().length) {
    //   profile.removeSelectedInterest().click();
    // }

    // profile.getInterestDropdown().click();
    // profile.getFirstInterest().click();
    // profile.clickSaveProfileButton();

    // cy.wait(2000);
  });

  it.skip("TCM-165 Check values of each field - needs fixes ", () => {
    cy.visit(`${Cypress.env("baseUrl")}logout`);
    cy.reload();
    cy.fixture(fixture).then((profileData) => {
      cy.login(profileData.Email, profileData.Password);
      cy.wait(2000);
      // cy.visit(`${Cypress.env("baseUrl")}profile`);
      // cy.wait(2000);
      // profile
      //   .getProfileInputField("#email")
      //   .should("have.value", profileData.UserName);

      // profile
      //   .getProfileInputField("#firstName")
      //   .should("have.value", profileData.FirstName);
      // profile
      //   .getProfileInputField("#lastName")
      //   .should("have.value", profileData.LastName);
      // profile.checkProfileFormLabelText("Librarian");
      // profile.removeSelectedInterest().should("exist");
      // profile.checkProfileFormLabelText("English (United Kingdom)");
    });
  });

  it("TCM-271 Logged out user can't see the profile page", () => {
    cy.visit(`${Cypress.env("baseUrl")}logout`);
    cy.visit(`${Cypress.env("baseUrl")}profile`);
    profile.checkProfileForm().should("not.exist");
    cy.url().should("not.include", "profile");
  });

  it.skip("TCM-163	Save profile - needs fixes", () => {
    const uuid = () => Cypress._.random(0, 1e6);
    const id = uuid();
    const ramdomFirstName = `testname${id}`;
    const ramdomLastName = `lastname${id}`;

    profile.getProfileInputField("#firstName").clear();
    profile.getProfileInputField("#firstName").type(ramdomFirstName);

    profile.getProfileInputField("#lastName").clear();
    profile.getProfileInputField("#lastName").type(ramdomLastName);

    profile.getProfileInputField("#metaDataUserRole").clear();
    profile.checkProfileFormLabelText("Lecturer").click();

    profile.getSaveProfileButton().click();

    cy.wait(5000);
    profile
      .getProfileInputField("#firstName")
      .should("have.value", ramdomFirstName);
    profile
      .getProfileInputField("#lastName")
      .should("have.value", ramdomLastName);
    profile.checkProfileFormLabelText("Lecturer");
  });

  it("TCM-162	Profile fields", () => {
    profile.getProfileInputEmail().should("be.disabled");
    profile.getProfileFirstName().should("not.be.disabled");
    profile.getProfileLastName().should("not.be.disabled");
    profile.getProfileRoleSelect().should("be.visible");
    profile.getProfileLanguageSelect().should("be.visible");
    profile.getProfileInterestInput().should("be.visible");

    //Verify the values in the Role dropdown are displayed and sorted alphabetically
    //https://knowledgee.atlassian.net/browse/ZD-1349
    // profile.getProfileRoleSelect().click();
    // cy.fixture(fixture).then((profileData) => {
    //   profile.getProfileRoleSelectOption().each((item, index) => {
    //     cy.wrap(item).should("contain.text", profileData.Role[index]);
    //   });
    // });
    // profile.getDropdown().eq(0).click();

    //Verify primary interest is sorted alphabetically
    //can't automate for now as can;t open the drop-down with cypress
    // profile.getInterestDropdown().type("a");
    // var optionsArray = [];
    // profile
    //   .getInterestList()
    //   .each(($el, index) => {
    //     optionsArray[index] = $el.text();
    //   })
    //   .then(() => {
    //     expect(optionsArray).to.deep.equal(optionsArray.sort());
    //   });
  });

  it.only("TCM-161 Navigate to Profile page Make sure logout works from Profile page - ZD-1355", () => {
    //Verify logout works from profile page
    header.getUserMenu().click();
    cy.wait(3000);
    menu.getLogout().click();
    header.getLoginButton().should("be.visible");

    //Verify that opening profile page whn logged out redirects to home page
    cy.visit(`${Cypress.env("baseUrl")}profile`);
    cy.wait(2000);
    cy.url().should("be.equal", `${Cypress.env("baseUrl")}`);
  });
});
