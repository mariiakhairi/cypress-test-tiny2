import LoginAndRegistration from "../../support/pageObjects/loginRegistration";
import ContentPage from "../../support/pageObjects/utm";

describe("UTM checks", function () {
  const signup = new LoginAndRegistration();
  const content = new ContentPage();
  const appPages = [
    `${Cypress.env(
      "WPUrl"
    )}contact-us/?utm_source=google&utm_medium=banner&utm_campaign=summer_sale&utm_id=SUM23&utm_term=ZS2023&utm_content=Library`,
    `${Cypress.env(
      "WPUrl"
    )}jobs/?utm_source=google&utm_medium=banner&utm_campaign=summer_sale&utm_id=SUM23&utm_term=ZS2023&utm_content=Library`,
    `${Cypress.env(
      "WPUrl"
    )}privacy-policy/?utm_source=google&utm_medium=banner&utm_campaign=summer_sale&utm_id=SUM23&utm_term=ZS2023&utm_content=Library`,
    `${Cypress.env(
      "WPUrl"
    )}zendy-terms-of-use/?utm_source=google&utm_medium=banner&utm_campaign=summer_sale&utm_id=SUM23&utm_term=ZS2023&utm_content=Library`,
  ];

  function utmCheck() {
    cy.url()
      .should("include", "utm_source=google")
      .should("include", "utm_medium=banner")
      .should("include", "utm_campaign=summer_sale")
      .should("include", "utm_id=SUM23")
      .should("include", "utm_term=ZS2023")
      .should("include", "utm_content=Library");
  }

  it("TCM-507 Sign up form: UTM query params should open the sign up form", () => {
    cy.visit(
      `${Cypress.env(
        "baseUrl"
      )}?signUp=true&utm_source=google&utm_medium=cpc&utm_campaign=ZP_KSA_Google_Prospecting_Search_Generic_USEO&utm_term=z%20library&matchtype=e&campaignid=12257968541&adgroup_name=library&adgroupid=137932764940&utm_content=text_dynamic-responsive&adposition&placement&target&targetid=kwd-430125672161&loc_interest_ms&loc_physical_ms=9051476&network=g&device=m&devicemodel&feeditemid&random=6148540885926066347&gclid=Cj0KCQjwkruVBhCHARIsACVIiOwq0awsxIfTA_jkLA8ueijd52VoDLtKsymmED7Id63c6VS-wJYhaMMaAnEOEALw_wcB`
    );
    signup.getEmailField().should("be.visible");
  });

  it("Desktop: TCM-12 UTM query parameters are passed for the all LP links and buttons", () => {
    for (let i = 0; i < appPages.length; i++) {
      content.openPage(appPages[i]);

      //Reload the page and check the URL has the UTM parameters
      cy.reload();
      utmCheck();

      // Click the header logo and check the URL has the UTM parameters
      content.getHeaderLogo().click();
      utmCheck();
    }
  });

  it("Mobile: TCM-12 UTM query parameters are passed for the all LP links and buttons", () => {
    cy.viewport("iphone-se2");
    for (let i = 0; i < appPages.length; i++) {
      content.openPage(appPages[i]);

      //Reload the page and check the URL has the UTM parameters
      cy.reload();
      utmCheck();

      // Click the header logo and check the URL has the UTM parameters
      content.getHeaderLogo().click();
      utmCheck();
    }
  });
});
