import Leftbar from "../../support/pageObjects/leftbar";
describe("Left bar pdf viewer feature", function () {
  const leftbar = new Leftbar();
  const fixture = "appPages/leftBar";

  beforeEach(() => {
    cy.visit(`${Cypress.env("baseUrl")}`);
    cy.loginAdminApi();
  });
  const SummaryTextEds =
    "Nucleus Architecture in Health and Medicine: Geometrical Descriptors and Their Use in Grid Based Case Studies. Adopting the world wide accessible Grid computing power and data management structures enables usage of large image data bases for individual diagnosis and therapy decisions. We define several descriptors of the genome architecture of cell nuclei which are the basis of a detailed analysis for conclusions on the health state of an individual patient. The geometry of the nucleus can be approximated by a ball or an ellipsoid, characterized by three half axes. Position of the nuclei relative to other objects e.g. other nuclei is of special importance. In routine diagnostic procedures, the different chromosomes are labelled in different colours and can be easily detected by visual inspection or automated image analysis software.";
  const SummaryTextSolar =
    "Elizabeth Southworth and Kayhan Parsi, JD, PhD: How should a physician counsel a vegan patient with IBD who might benefit from supplements? We argue that physicians should share the best available evidence on the efficacy of such diets while respectfully trying to understand the perspectives of patients who choose vegan diets. We also consider evidence, or lack thereof, for nutritional supplementation in special populations. Many activists, scholars, and other individuals espouse a vegetarian or vegan diet because of their commitment to the welfare of animals. The meat industry has a large carbon footprint and is a significant source of greenhouse gases. Environmental stewardship can also motivate individuals to adhere to veganism.";
  it.skip("TCM-683 All download links open the PDF article with the left sidebar @EDS", () => {
    cy.visit(`${Cypress.env("baseUrl")}search?q=zookeeper`);
    cy.wait(3000);
    leftbar.getViewPdfButton().should("contains.text", "View PDF");
    leftbar.getViewPdfButton().click();
    cy.fixture(fixture).then((data) => {
      cy.visit(`${Cypress.env("baseUrl")}` + data.edsLink1);
    });
    cy.wait(3000);
    //leftbar and pdf viwer dispalys by default on desktop
    leftbar.getLeftDrawer().should("exist");
    //leftbar.getPDFContainer().should("exist");
    //leftbar.getPDFContainer().should("be.visible");
    leftbar.getLeftDrawer().should("exist");
    leftbar.getLeftDrawer().should("be.visible");
    leftbar.getShareIcon().should("be.visible");
    leftbar.getCiteButton().should("be.visible");
    leftbar.getExportButton().should("be.visible");
    leftbar.getFavouriteButton().should("be.visible");
    leftbar.getAddListButton().should("be.visible");

    leftbar.getCloseLeftBar().click();
    leftbar.getLeftDrawer().should("not.exist");
  });
  it.skip("TCM-683 All download links open the PDF article with the left sidebar @SOLR", () => {
    cy.visit(`${Cypress.env("baseUrl")}search?q=zookeeper`);
    cy.wait(3000);
    leftbar.getViewPdfButton().should("contains.text", "View PDF");
    leftbar.getViewPdfButton().click();
    cy.fixture(fixture).then((data) => {
      cy.visit(`${Cypress.env("baseUrl")}` + data.solrLink2);
    });
    cy.wait(3000);
    //leftbar and pdf viwer displays by default on desktop
    leftbar.getLeftDrawer().should("exist");
    // leftbar.getPDFContainer().should("exist");
    // leftbar.getPDFContainer().should("be.visible");
    leftbar.getLeftDrawer().should("exist");
    leftbar.getLeftDrawer().should("be.visible");
    leftbar.getShareIcon().should("be.visible");
    leftbar.getOAIcon().should("be.visible");
    leftbar.getCiteButton().should("be.visible");
    leftbar.getExportButton().should("be.visible");
    leftbar.getFavouriteButton().should("be.visible");
    leftbar.getAddListButton().should("be.visible");

    leftbar.getCloseLeftBar().click();
    leftbar.getLeftDrawer().should("not.exist");
  });
  it("TCM-740 Left bar: close logic for Desktop @EDS", () => {
    cy.fixture(fixture).then((data) => {
      cy.visit(`${Cypress.env("baseUrl")}` + data.edsLink1);
    });
    cy.wait(3000);
    // close the left bar and verify the drawer is not displayed
    leftbar.getCloseLeftBar().click();
    leftbar.getLeftDrawer().should("not.exist");

    //expand the leftbar and verify the drawer is displayed
    leftbar.getOpenLeftBar().click({ force: true });
    leftbar.getLeftDrawer().should("exist");
    leftbar.getLeftDrawer().should("be.visible");
    leftbar.getCiteButton().should("be.visible");
    leftbar.getExportButton().should("be.visible");
    leftbar.getFavouriteButton().should("be.visible");
    leftbar.getAddListButton().should("be.visible");
  });

  it("TCM-740 Left bar: close logic for mobile @EDS", () => {
    cy.wait(3000);
    cy.viewport("iphone-8");
    cy.fixture(fixture).then((data) => {
      cy.visit(`${Cypress.env("baseUrl")}` + data.edsLink1);
    });
    cy.wait(3000);
    // open the left bar and verify the details are displayed
    leftbar.getOpenLeftBar().click({ force: true });
    leftbar.getDrawerMobile().should("exist");
    // leftbar.getDrawerMobile().should("be.visible");
    leftbar
      .getDrawerMobile()
      .find("button")
      .eq(0)
      .should("contain", "Cite")
      .should("be.visible");
    leftbar
      .getDrawerMobile()
      .find("button")
      .eq(1)
      .should("contain", "Export")
      .should("be.visible");
    leftbar.getDrawerMobile().find("button").eq(2).should("be.visible");
    leftbar
      .getDrawerMobile()
      .find("button")
      .eq(3)
      .should("contain", "Add to list")
      .should("be.visible");

    //close the leftbar and verify the drawer is not displayed
    leftbar.getMobileCancelbutton().click();
    cy.wait(3000);
    leftbar.getLeftDrawer().should("not.exist");
    leftbar.getOpenLeftBar().should("exist");
    //leftbar.getPDFContainer().should("be.visible");
  });

  it.skip("TCM-741 Left bar: Error message @EDS", () => {
    cy.fixture(fixture).then((data) => {
      cy.visit(`${Cypress.env("baseUrl")}` + data.solrLink2);
      leftbar.getErrorMessage().should("be.visible");
      leftbar.getErrorMessage().contains(data.errorMessage);
    });
  });
  it.skip("TCM-741 Left bar: Error message @SOLR", () => {
    cy.fixture(fixture).then((data) => {
      cy.visit(`${Cypress.env("baseUrl")}` + data.edsLink1);
      leftbar.getErrorMessage().should("be.visible");
      leftbar.getErrorMessage().contains(data.errorMessage);
    });
  });

  it.skip("TCM-741	Left bar: Error message Trail end user @EDS", () => {
    cy.logout();
    cy.login("autotest8@gmail.com", "Password1234");
    cy.fixture(fixture).then((data) => {
      cy.visit(`${Cypress.env("baseUrl")}` + data.edsLink1);

      cy.wait(3000);
      cy.url().should("include", "pdf-viewer");
      leftbar.getErrorMessage().should("be.visible");
      leftbar.getErrorMessage().contains(data.errorMessageTraialEnd);
    });
  });
  it.skip("TCM-722 & 725 Add, Delete note @EDS @SMOKE", () => {
    cy.fixture(fixture).then((data) => {
      cy.visit(`${Cypress.env("baseUrl")}` + data.edsLink2);
      cy.wait(3000);
      //Verify the notes section is present
      leftbar.getNotes().should("be.visible");
      leftbar.getNotes().click();
      leftbar.getAddNote().should("be.visible");
      //Save note
      leftbar.getAddNote().click();
      leftbar.getNotesTextArea().should("be.visible");
      leftbar.getNotesTextArea().type(data.notes);
    });
    leftbar.getSaveNotes().click();
    cy.wait(2000);
    // //Verify the saved note has date
    // const date = new Date().toLocaleDateString("en-GB");
    // leftbar.getNotesDate().contains(date);
    // //Delete note
    leftbar.getDeleteNotes().click({ multiple: true });
    leftbar.getDeleteDialogue().should("be.visible");
    leftbar.getDeleteConfirm().click();
    leftbar.getNotesDate().should("not.exist");
    leftbar.getNotesTextArea().should("not.exist");
  });
  it.skip("TCM-722 & 725 Add, Delete note @SOLR @SMOKE", () => {
    cy.fixture(fixture).then((data) => {
      cy.visit(`${Cypress.env("baseUrl")}` + data.solrLink2);
      cy.wait(3000);
      //Verify the notes section is present
      leftbar.getNotes().should("be.visible");
      leftbar.getNotes().find("button").click();
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
    //Delete note
    leftbar.getDeleteNotes().click({ multiple: true });
    leftbar.getDeleteDialogue().should("be.visible");
    leftbar.getDeleteConfirm().click();
    leftbar.getNotesDate().should("not.exist");
    leftbar.getNotesTextArea().should("not.exist");
  });
  it.skip("TCM-724 Pin a note @EDS", () => {
    cy.fixture(fixture).then((data) => {
      cy.visit(`${Cypress.env("baseUrl")}` + data.edsLink3);
      leftbar.getNotes().click();
      cy.wait(2000);
      // Adding notes
      for (let i = 0; i < data.notesText.length; i++) {
        leftbar.getAddNote().click();
        cy.wait(2000);
        leftbar.getNotesTextArea().type(data.notesText[i]);
        leftbar.getSaveNotes().click();
      }
      cy.wait(2000);
      //Pin note 2
      leftbar.getNotesTextArea().find("textarea").eq(4);
      leftbar.getPinNoteButton().eq(2).click();
      cy.wait(2000);

      //Verify that the pinned note is at the top in the list
      leftbar.getNotesTextArea().find("textarea").eq(1).contains("note 2");
      // deleting the added notes
      for (let i = 0; i < data.notesText.length; i++) {
        leftbar.getDeleteNotes().eq(0).click();
        leftbar.getDeleteConfirm().click();
        cy.wait(2000);
      }
      leftbar.getNotesDate().should("not.exist");
      leftbar.getNotesTextArea().should("not.exist");
    });
  });
  it.skip("TCM-724 Pin a note @SOLR", () => {
    cy.fixture(fixture).then((data) => {
      cy.visit(`${Cypress.env("baseUrl")}` + data.solrLink3);
      leftbar.getNotes().find("button").click();
      cy.wait(2000);

      cy.log("Adding notes");
      for (let i = 0; i < data.notesText.length; i++) {
        leftbar.getAddNote().click();
        cy.wait(2000);
        leftbar.getNotesTextArea().find("div").eq(0).type(data.notesText[i]);
        leftbar.getSaveNotes().click();
      }
      cy.wait(2000);
      cy.log("Pin note 2");
      leftbar.getNotesTextArea().find("textarea").eq(4);
      leftbar.getPinNoteButton().eq(2).click();
      cy.wait(2000);

      cy.log("Verify that the pinned note is at the top in the list");
      leftbar.getNotesTextArea().find("textarea").eq(1).contains("note 2");
      leftbar.getNotesTextArea().then(($value) => {
        length = $value.length;
        cy.log("deleting the added notes");
        for (let i = 0; i < length; i++) {
          leftbar.getDeleteNotes().eq(0).click();
          leftbar.getDeleteConfirm().click();
          cy.wait(2000);
        }
      });

      leftbar.getNotesDate().should("not.exist");
      leftbar.getNotesTextArea().should("not.exist");
    });
  });
  it.skip("TCM-722 Summary section @EDS", () => {
    cy.fixture(fixture).then((data) => {
      cy.visit(`${Cypress.env("baseUrl")}` + data.edsLink4);
      cy.wait(3000);
      //Verify the summary section is present
      leftbar.getSummary().contains("Summary");
      leftbar.getSummary().should("be.visible");
      leftbar.getSummaryButton().click();
      //Verify once summary section opens, it contains summary
      leftbar.getSummarySection().contains(SummaryTextEds);
    });
  });
  it.skip("TCM-722 Summary section @SOLR", () => {
    cy.fixture(fixture).then((data) => {
      cy.visit(`${Cypress.env("baseUrl")}` + data.solrLink7);
      cy.wait(3000);
      //Verify the summary section is present
      leftbar.getSummary().contains("Summary");
      leftbar.getSummary().should("be.visible");
      leftbar.getSummaryButton().click();
      //Verify once summary section opens, it contains summary
      leftbar.getSummarySection().contains(SummaryTextSolar);
    });
  });
  it.skip("TCM-770 Keyword section @EDS", () => {
    cy.fixture(fixture).then((data) => {
      cy.visit(`${Cypress.env("baseUrl")}` + data.edsLink5);
      cy.wait(3000);
      //Verify the summary section is present
      leftbar.getKeyword().contains("Key phrases");
      leftbar.getKeyword().should("be.visible");
      cy.wait(3000);
      //verify the first keyword after it loads
      leftbar
        .getKeywordSection()
        .eq(0)
        .contains("habitat restoration projects");
      //intially it should show only 10 keywords
      leftbar.getKeywordSection().should("have.length", 10);
      //Verify it shows seemore
      leftbar.getKeywordSeemore().contains("see more");
      //Seemore needs to be clickbale
      leftbar.getKeywordSeemore().click();
      //Verify after click it shows 20 keywords
      leftbar.getKeywordSection().should("have.length", 20);
      cy.window().then((win) => {
        cy.stub(win, "open").as("windowOpen");
      });
      leftbar
        .getKeywordSection()
        .eq(0)
        .contains("habitat restoration projects")
        .click();
      cy.get("@windowOpen").should(
        "be.calledWith",
        "/search?q=habitat%20restoration%20projects"
      );
    });
  });
  it.skip("TCM-770 Keyword section @SOLR", () => {
    cy.fixture(fixture).then((data) => {
      cy.visit(`${Cypress.env("baseUrl")}` + data.solrLink7);
      cy.wait(3000);
      //Verify the summary section is present
      leftbar.getKeyword().contains("Key phrases");
      leftbar.getKeyword().should("be.visible");
      cy.wait(3000);
      //verify the first keyword after it loads
      leftbar.getKeywordSection().eq(0).contains("neural tube defects");
      //intially it should show only 10 keywords
      leftbar.getKeywordSection().should("have.length", 10);
      //Verify it shows seemore
      leftbar.getKeywordSeemore().contains("see more");
      //Seemore needs to be clickbale
      leftbar.getKeywordSeemore().click();
      //Verify after click it shows 20 keywords
      leftbar.getKeywordSection().should("have.length", 20);
      cy.window().then((win) => {
        cy.stub(win, "open").as("windowOpen");
      });
      leftbar.getKeywordSection().eq(0).contains("neural tube defects").click();
      cy.get("@windowOpen").should(
        "be.calledWith",
        "/search?q=neural%20tube%20defects"
      );
    });
  });
  it.skip("TCM-776 validation message on UI when text is not english for keyphrase and summary section @EDS", () => {
    cy.fixture(fixture).then((data) => {
      cy.visit(`${Cypress.env("baseUrl")}` + data.edsLink6);
      cy.wait(3000);
      //Verify the summary section is present
      leftbar.getKeyword().contains("Key phrases");
      leftbar.getKeyword().should("be.visible");
      cy.wait(3000);
      //verify the first keyword after it loads
      leftbar
        .getKeywordSecerror()
        .contains(
          "The keywords cannot be generated as the text is not in english."
        );

      //Verify the summary section is present
      leftbar.getSummary().contains("Summary");
      leftbar.getSummary().should("be.visible");
      leftbar.getSummaryButton().click();
      //Verify once summary section opens, it contains summary
      leftbar
        .getSummarySecerror()
        .contains(
          "The summary cannot be generated as the text is not in english."
        );
    });
  });
  it.skip("TCM-776 validation message on UI when text is not english for keyphrase and summary section @SOLR", () => {
    cy.fixture(fixture).then((data) => {
      cy.visit(`${Cypress.env("baseUrl")}` + data.solarLink5);
      cy.wait(3000);
      //Verify the summary section is present
      leftbar.getKeyword().contains("Key phrases");
      leftbar.getKeyword().should("be.visible");
      cy.wait(3000);
      //verify the first keyword after it loads
      leftbar
        .getKeywordSecerror()
        .contains(
          "The keywords cannot be generated as the text is not in english."
        );

      //Verify the summary section is present
      leftbar.getSummary().contains("Summary");
      leftbar.getSummary().should("be.visible");
      leftbar.getSummaryButton().click();
      //Verify once summary section opens, it contains summary
      leftbar
        .getSummarySecerror()
        .contains(
          "The summary cannot be generated as the text is not in english."
        );
    });
  });
});
