import Filters from "../../support/pageObjects/filters";

describe("Search Page › Filters @EDS", function () {
  var fixture = "appPages/filters";
  const filters = new Filters();
  const resourceTypeEDS = '[data-test="facet-filter-item-SourceType"]';
  const languageFilterEDS = '[data-test="facet-filter-item-Language"]';
  const publicationFilterEDS = '[data-test="facet-filter-item-Journal"]';
  const subjectFilter = '[data-test="facet-filter-item-SubjectEDS"]';

  beforeEach(() => {
    cy.visit(`${Cypress.env("baseUrl")}search?q=test`);
    cy.viewport(1024, 768);
    cy.fixture(fixture).then(function (data) {
      this.data = data;
    });
  });
  it.skip("TCM-150 There is no words break in filters subcategories @EDS", () => {
    filters.openFilter(resourceTypeEDS);
    filters
      .getSourceTypeSubCategoryEDS()
      .should("not.have.css", "word-break", "break-word");
  });

  it.skip("TCM-660 Map Subject - only EDS @EDS", () => {
    cy.visit(
      `${Cypress.env(
        "baseUrl"
      )}search?id=XQAAAAK2AAAAAAAAAABCqspmUysK7ZVlp7Y_vrIrpKORUGrz40dc5ZvdE4h76BCcSbkLYG563IIUujA6NeMbDukfwTAL4U2S-xmVPOatE-KU9cJa6BcYejgw4p9YRE-mQ_7nHt_NSiEg6z6PVvvOgnfjG__rojnVbJgvj4G6cLjJO7J8LeXXgzDPKa03QGZT7xkgBNsCnmti0D1cd_xX8ujeCz_cqJX__3S8QAA`
    );
    filters.openFilter(subjectFilter);
    filters.getSubcategory().contains("Golf Course Maintenance (2)");
    filters.getSubcategory().contains("Golf Course Managers (2)");
    filters.getSubcategory().contains("Praseodymium (1)");
  });

  it("TCM-252 Resource type @EDS", function () {
    filters.applyFilterAndCheckResultNumber(resourceTypeEDS);
  });

  it("TCM-148	Subject @EDS", function () {
    filters.applyFilterAndCheckResultNumber(subjectFilter);
  });

  it.skip("TCM-254	Publication Title @EDS", function () {
    filters.applyFilterAndCheckResultNumber(publicationFilterEDS);
    filters.getExpandButtonInFirstSearchResult().click({ force: true });
    filters
      .getFilterEDS()
      .invoke("text")
      .then(($btn3) => {
        const languageName = $btn3;
        filters.getPublicationSearchResult().contains(languageName);
      });
  });

  it.skip("TCM-255 Language @EDS", function () {
    filters.applyFilterAndCheckResultNumber(languageFilterEDS);
    filters.getExpandButtonInFirstSearchResult().click({ force: true });
    filters
      .getFilterEDS()
      .invoke("text")
      .then(($btn3) => {
        const languageName = $btn3.trim();
        filters.getLanguageInSearchResult().contains(languageName);
      });
  });

  it.skip("TCM-482 No duplicates in Publication Title filter @EDS", function () {
    cy.visit(
      `${Cypress.env(
        "baseUrl"
      )}search?id=XQAAAAK3AAAAAAAAAABCqspmUysK7ZVlp7Y_vrIrxpWRUGryrlLPHvretxIdNi9RiX27Rb3lUV2SLM15xvjLHOyWra6-96K-9TR5-ppcyfjKhdK8t1yuJZhDkuJmkK5hM5owfZdYXxj19hWIw2LjsjZef3Da96KhEUDl1bwHvxsLKR09NdWFtqVL93f0sx_hto_lJB0dX1dT-74rtJcfho7Vm0H__93qIAA`
    );
    filters.getPublicationFilterEDS().click();
    filters.getSubcategory().contains("Bmc Genomics");
    //verify that categories are not duplicating for publication title
    filters.verifyCategory();
  });

  it.skip("TCM-253 Resource type filter mapping - only EDS @EDS", () => {
    cy.visit(
      `${Cypress.env(
        "baseUrl"
      )}search?q=The%20Journal%20of%20Strain%20Analysis%20for%20Engineering%20Design`
    );
    filters.openFilter(resourceTypeEDS);
    filters.getSubcategory().contains("Academic Journals");
    filters.getSubcategory().contains("Magazines");
    filters.getSubcategory().contains("News");
    filters.getSubcategory().contains("Reviews");
  });

  it.skip("TCM-144	Sorting @EDS", function () {
    cy.log(
      "Ensure filters subcategories are sorted alphabetically and numbers are on the right side"
    );
    filters.openFilter(resourceTypeEDS);
    filters
      .getSourceTypeSubCategory1EDS()
      .contains(this.data.filterSubcategory1EDS);
    filters
      .getSourceTypeSubCategory2EDS()
      .contains(this.data.filterSubcategory2EDS);
    filters
      .getSourceTypeSubCategory3EDS()
      .contains(this.data.filterSubcategory3EDS);
  });
  it("TCM-138 Tooltip @EDS", function () {
    //hover over Featured Content to see the tool tip text
    filters.checkToolTipText(0, this.data.tooltipText1);

    //hover over Source Type type to see the tool tip text
    filters.checkToolTipText(1, this.data.tooltipText2);

    //hover over Subject to see the tool tip text
    filters.checkToolTipText(2, this.data.tooltipText3);

    //hover over Publication title to see the tool tip text
    filters.checkToolTipText(3, this.data.tooltipText4);
  });

  it("TCM-135	Clear filter @EDS", function () {
    filters.getDateFrom().click();
    filters.getSubmitDateButton().click();
    filters.getDateTo().click();
    filters.getSubmitDateButton().click();
    filters.selectFilter(resourceTypeEDS);
    filters.selectFilter(subjectFilter);
    filters.selectFilter(publicationFilterEDS);
    filters.selectFilter(languageFilterEDS);
    filters.getClearFiltersAction().click();
  });
});

describe("Search Page › Filters @SOLR", function () {
  //ZAT-90 Update filter tests to pass in all regions
  var fixture = "appPages/filters";
  const filters = new Filters();
  const resourceTypeSOLR =
    '[data-test="facet-filter-item-publicationTypeFull"]';
  const subjectFilter = '[data-test="facet-filter-item-subjectsFull"]';
  const subjectsubCategory = "[data-test='facet-filter-switch-0'] > span";
  const publicationTitleFilter =
    '[data-test="facet-filter-item-journalTitleFull"]';
  const languageFilter = '[data-test="facet-filter-item-genlanguage"]';

  beforeEach(() => {
    cy.visit(`${Cypress.env("baseUrl")}search?q=test`);
    cy.viewport(1024, 768);
    cy.fixture(fixture).then(function (data) {
      this.data = data;
    });
  });

  it("TCM-135	Clear filter @SOLR", function () {
    filters.getDateFrom().click();
    filters.getDatePickerYearInput().clear();
    filters.getDatePickerYearInput().type("2023");
    filters.getSubmitDateButton().click();
    filters.getDateTo().click();
    filters.getDatePickerYearInput().clear();
    filters.getDatePickerYearInput().type("2023");
    filters.getSubmitDateButton().click();
    filters.selectFilter(resourceTypeSOLR);
    filters.selectFilter(subjectFilter);
    filters.selectFilter(publicationTitleFilter);
    filters.selectFilter(languageFilter);
    filters.getClearFiltersAction().click();
  });

  it("TCM-252 Resource type @SOLR", function () {
    filters.applyFilterAndCheckResultClosedCard(
      resourceTypeSOLR,
      '[data-test="facet-filter-switch-0"]',
      '[data-test="pubAttributeType"]',
      this.data.resourceTypeJornalResultSOLR
    );
  });

  it("TCM-148	Subject @SOLR", function () {
    filters.applyFilterAndCheckResultNumber(subjectFilter);
    filters.selectSubcategory();
    cy.wait(2000);
    filters.getExpandButtonInFirstSearchResult().click({ force: true });
    filters.getSubjectInSEarchResult().contains("psychology");
  });

  it("TCM-146	Publication @SOLR", function () {
    filters.applyFilterAndCheckResultClosedCard(
      publicationTitleFilter,
      '[data-test="facet-filter-switch-1"]',
      '[data-test="pubAttributeTitle"]',
      this.data.publicationTitleResultSOLR
    );
  });

  it("TCM-147	Language @SOLR", function () {
    filters.applyFilterAndCheckResultNumber(languageFilter);
    cy.wait(5000);
    filters.getExpandButtonInFirstSearchResult().click();
    cy.wait(5000);
    filters
      .getCategoryName()
      .invoke("text")
      .then((text) => {
        const languageName = text;
        cy.log("language name - " + languageName);
        filters
          .getLanguageInSearchResult()
          .should("have.text", "Language(s)" + languageName);
      });
  });

  it.skip("TCM-144	Sorting @SOLR", function () {
    //Ensure filters subcategories are sorted alphabetically and numbers are on the right side
    filters.openFilter(resourceTypeSOLR);
    filters
      .getSourceTypeSubFilterCountSOLR()
      .eq(0)
      .should("have.text", "Book Series");
    filters.getSourceTypeSubFilterCountSOLR().contains("k");

    //Ensure filters subcategories are sorted alphabetically
    filters
      .getSourceTypeSubCategory2SOLR()
      .contains(this.data.filterSubcategory1);
    filters
      .getSourceTypeSubCategory2SOLR()
      .contains(this.data.filterSubcategory2);
    filters
      .getSourceTypeSubCategory2SOLR()
      .contains(this.data.filterSubcategory3);
  });

  it("TCM-138 Tooltip @SOLR", function () {
    cy.viewport(1024, 768);
    //hover over Featured Content to see the tool tip text
    filters.checkToolTip(0).should("be.visible");
    filters.checkToolTipText().contains(this.data.tooltipText1);
    filters.checkToolTip(0).click();

    //hover over Resource type to see the tool tip text
    filters.checkToolTip(1).should("be.visible");
    filters.checkToolTipText().contains(this.data.tooltipText2);
    filters.checkToolTip(1).click();

    //hover over Subject to see the tool tip text
    filters.checkToolTip(2).should("be.visible");
    filters.checkToolTipText(this.data.tooltipText3);
    filters.checkToolTip(2).click();

    //hover over Publication title to see the tool tip text
    filters.checkToolTip(3).should("be.visible");
    filters.checkToolTipText(this.data.tooltipText4);
    filters.checkToolTip(3).click();
  });
  it.skip("TCM-150 There is no words break in filters subcategories @SOLR", () => {
    filters.openFilter(resourceTypeSOLR);
    filters
      .getSourceTypeSubCategory1SOLR()
      .should("not.have.css", "word-break", "break-word");
  });
  it.skip("TCM-524 Map Subject - only SOLR @SOLR", () => {
    cy.visit(
      `${Cypress.env(
        "baseUrl"
      )}search?id=XQAAAAK8AAAAAAAAAABCqspmUysK7ZVlp7Y_vrIrxpWRUGr1e03qaAO8tbNhbqaWdhSOMI9-PWBRGCEpkTyDDwgoTqaK5mYMUc6lZm_ciIZt2I1UTNT52shshlN91iO-eoRzC7efrCkrj9qjyecEqaDm2jmlioHsGn80RJCpzEY9zqU05iNWHqcKAQDPnbxJgWn6MEr8gWm7zysGkj6FyG4iKkWOJc_0__ptqIA`
    );
    filters.openFilter(subjectFilter);
    filters
      .getSubcategory()
      .contains("Arts Humanities And Social Sciences (1)");
    filters
      .getSubcategory()
      .contains("Chemical Material And Earth Sciences (1)");
    filters.getSubcategory().contains("Others (1)");
  });
});

describe("Search Page › Filters smoke", function () {
  beforeEach(() => {
    cy.visit(`${Cypress.env("baseUrl")}search?q=test`);
  });
  const filters = new Filters();
  it("TCM-137	Date filter logic @SMOKE", () => {
    cy.viewport(1200, 900);
    filters.getDateFrom().click();
    filters.getDatePickerYearInput().clear();
    filters.getDatePickerYearInput().type("2023");
    filters.getSubmitDateButton().click();
    filters.getDateTo().click();
    filters.getDatePickerYearInput().clear();
    filters.getDatePickerYearInput().type("2023");
    filters.getSubmitDateButton().click();
    filters.getSelectedDateFrom().scrollIntoView();
    filters.getSelectedDateFrom().should("be.visible");
    filters.getSelectedDateFrom().contains("January · 2023");
    filters.getSelectedDateTo().should("be.visible");
    filters.getSelectedDateTo().contains("January · 2023");
    filters.getFirstSearchResultPublicationYear().contains("2023");
  });
});
