import MyLists from "../../support/pageObjects/myLists";
import LoginAndRegistration from "../../support/pageObjects/loginRegistration";
import Header from "../../support/pageObjects/header";
import Search from "../../support/pageObjects/searchPage";
import Leftbar from "../../support/pageObjects/leftbar";

describe("My Lists", function () {
  const list = new MyLists();
  const signup = new LoginAndRegistration();
  const header = new Header();
  const search = new Search();
  const leftbar = new Leftbar();
  const fixture = "appPages/myList";
  const fixtureLogin = "appPages/loginRegisterStrings";
  const fixtureLeftBar = "appPages/leftBar";

  function addList(listname) {
    //user creates custom list
    list.getCreateListButton().click();
    list.getInputList().type(listname);
    cy.log("click save");
    list.getSaveChangesButton().click();
    cy.wait(5000);
  }
  function deleteList(text) {
    list.getListTab(text).click({ force: true });
    list.getOptions().click();
    list.getListActions().last().click();
    list.getPopUpHeader().contains("Delete this list?");
    list.getSaveChangesButton().last().click();
    cy.wait(5000);
  }

  beforeEach(() => {
    cy.visit(`${Cypress.env("baseUrl")}`);
  });

  //random email
  const uuid = () => Cypress._.random(0, 1e6);
  const id = uuid();
  const emailRandom = `testname${id}@zendy.io`;
  it.skip("TCM-637 Deleted articles", () => {
    cy.loginAdminApi();
    //Get request to get the list Id of the user and then POST invalid permalink for the list
    cy.request({
      method: "GET",
      url: `${Cypress.env(
        "API_BASE_URL"
      )}user-personalization/reading-list?limit=20&offset=0&sort=%5B%22id%22%2C%22DESC%22%5D`,
    })
      .then((response) => {
        console.log("test", response);
        const listID = response.body.data.items[0].id;
        return listID;
      })
      .then((listID) => {
        cy.request(
          "POST",
          `${Cypress.env(
            "API_BASE_URL"
          )}user-personalization/saved-publication`,
          {
            title: "Computer Science testing",
            permaLinkId: "spe-e000xww-161976",
            readingListIds: [listID],
          }
        );
      });
    //Verify that article no longer availble message is displayed
    cy.visit(`${Cypress.env("baseUrl")}my-lists`);
    cy.fixture(fixture).then((mylist) => {
      list.getResult().contains(mylist.errorNotAvailable);
    });
  });

  it.skip("TCM-634 Default list can't be deleted/renamed", () => {
    cy.loginAdminApi();
    cy.visit(`${Cypress.env("baseUrl")}my-lists`);

    // Verify that the deafult list is My List
    list.getDefaultList().contains("My List");

    // Verify that the list has option to rename and delete
    list.getOptions().click();
    list.getListActions().first().contains("Rename List");
    list.getListActions().last().contains("Delete List");

    // Verify that the rename and delete links are not enabled for default list
    list.getListActions().first().should("not.be.enabled");
    list.getListActions().last().should("not.be.enabled");
  });

  it.skip("TCM-638 Custom list can be renamed/deleted", () => {
    //not stable
    cy.loginAdmin();
    cy.wait(5000);
    cy.visit(`${Cypress.env("baseUrl")}my-lists`);

    const uuid = () => Cypress._.random(0, 100);
    const id = uuid();
    const testname = `testname${id}`;

    list.getCustomLists().then((tab) => {
      var len = tab.length;
      cy.log("len ________" + len);
      if (len <= 1) {
        //user creates custom list
        list.getCreateListButton().click();
        list.getInputList().type(testname);
        list.getSaveChangesButton().click();
        cy.wait(5000);
      }
    });

    // Verify that the new list id displayed in tab
    list.getCustomList().click({ force: true });

    // Verify that the list has option to rename and delete
    list.getOptions().click();
    list.getListActions().first().contains("Rename List");
    list.getListActions().last().contains("Delete List");

    // Verify that the rename and delete links are enabled for the custom list
    list.getListActions().first().should("not.to.be.disabled");
    list.getListActions().last().should("not.to.be.disabled");

    // User clicks on the Rename List and verify the dialogue dispalyed
    list.getListActions().first().click();
    list.getRenameList().contains("Rename List");

    // User type the updated name and save the change
    list
      .getRenameInput()
      .last()
      .clear()
      .type(testname + "1");
    list.getSaveChangesButton().click();

    // Verify that the list name is updated
    list.getCustomList().contains(testname + "1");

    // User clicks on the Delete List and verify the dialogue dispalyed
    list.getOptions().click();
    list.getListActions().last().click();
    list.getPopUpHeader().contains("Delete this list?");
    list.getSaveChangesButton().last().click();

    //Verify that the deleted list is not displayed
    list.getSaveChangesButton().last().click();
    list.getCustomList().then((tab) => {
      var len = tab.length;
      cy.log("len ________" + len);
      expect(len == 1);
    });
  });

  it.skip("TCM-633 When user is created the default list is created", () => {
    // Signup for new user
    cy.visit(`${Cypress.env("baseUrl")}?signUp=true`);
    cy.fixture(fixtureLogin).then((data) => {
      signup.getFullnameField().type(data.userName);
      signup.getRoleDropDown().click({ force: true });
      signup.getRoleListItem().click();
      signup.getEmailField().type(emailRandom);
      signup.getPasswordField().type(data.userPass);
      signup.getSignupButtton().click();
      header.getUserMenu().should("be.visible");
    });
    // User views MyList page
    cy.visit(`${Cypress.env("baseUrl")}my-lists`);

    // Verify that the deafult list is My List
    list.getDefaultList().contains("My List");
  });

  it.skip("TCM-751 Create List - Validation message for long list", () => {
    cy.loginAdminApi();
    cy.wait(3000);
    cy.visit(`${Cypress.env("baseUrl")}my-lists`);

    // try create a new list with more than 20 characters
    list.getCreateListButton().click();
    list.getInputList().type("Field project resources");
    cy.fixture(fixture).then((mylist) => {
      list.getErrorMessageMaxLenghth().contains(mylist.errorLargeText);
    });
    list.getSaveChangesButton().should("not.be.enabled");
  });

  it.skip("TCM-814 Create list - duplicate message", () => {
    cy.loginAdminApi();
    cy.wait(5000);
    cy.visit(`${Cypress.env("baseUrl")}my-lists`);
    //create a new list
    addList("test");
    //try to craete duplicate list
    addList("test");
    cy.fixture(fixture).then((mylist) => {
      list.getErrorMessageDuplicate().contains(mylist.errorDuplicateList);
    });
    list.getCancelButton().click();
    deleteList("test");
  });

  it.skip("TCM-752 Rename list - Validation message for duplicate list", () => {
    //https://knowledgee.atlassian.net/browse/ZD-1267
    cy.loginAdminApi();
    cy.wait(5000);
    cy.visit(`${Cypress.env("baseUrl")}my-lists`);
    //create 2 new lists List1, List2
    var List1 = "List1" + Math.floor(Math.random() * 100);
    var List2 = "List2" + Math.floor(Math.random() * 100);
    addList(List1);
    addList(List2);

    // Try to rename List2 as List1
    list.getCustomList().contains(List2).click({ force: true });
    list.getOptions().click();
    list.getListActions().first().click();
    list.getRenameInput().last().clear().type(List1);
    list.getSaveChangesButton().click();

    //Verify error message is displayed
    cy.fixture(fixture).then((mylist) => {
      list.getErrorMessageDuplicate().contains(mylist.errorDuplicateList);
    });

    // Try to submit existing list name starting with small letter
    list.getRenameInput().last().clear().type(List1.toLowerCase());
    list.getSaveChangesButton().click();
    //Verify error message is displayed
    cy.fixture(fixture).then((mylist) => {
      list.getErrorMessageDuplicate().contains(mylist.errorDuplicateList);
    });
    list.getCancelButton().click();

    //Try to rename List2 with name more than 20 charcaters
    list.getCustomList().contains(List2).click({ force: true });
    list.getOptions().click();
    list.getListActions().first().click();
    list.getRenameInput().last().clear().type("Field project resources");

    cy.fixture(fixture).then((mylist) => {
      list.getErrorMessageMaxLenghth().contains(mylist.errorLargeText);
    });
    list.getCancelButton().click();

    //Delete the added lists
    deleteList(List1);
    deleteList(List2);
  });
  it.skip("TCM-779 User can add/edit notes from the My list page", () => {
    cy.loginAdminApi();
    cy.wait(5000);

    cy.visit(`${Cypress.env("baseUrl")}search?q=test`);

    //add aricle to the list
    search.getFirstResultAddListButton().click();
    // go to my list page
    list.getAvatar().click();
    cy.wait(2000);
    list.getMyLists().click();
    cy.wait(5000);

    // open the add note pop-up
    list.getAddNotesButton().click({ force: true });

    cy.fixture(fixtureLeftBar).then((data) => {
      leftbar.getAddNote().should("be.visible");
      //Save note
      leftbar.getAddNote().click();
      leftbar.getNotesTextArea().should("be.visible");
      leftbar.getNotesTextArea().type(data.notes);
    });
    leftbar.getSaveNotes().click();
    cy.wait(2000);
    //Verify the saved note has date
    const date = new Date().toLocaleDateString("en-GB");
    leftbar.getNotesDate().contains(date);
  });
});
