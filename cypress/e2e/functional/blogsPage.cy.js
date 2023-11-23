import Blog from "../../support/pageObjects/blog";

describe("Blog Page tests", () => {
  const blog = new Blog();
  beforeEach(() => {
    cy.visit(`${Cypress.env("baseUrl")}blog/page/1`);
  });
  const fixture = "appPages/blog";
  it("TCM-628 Blogs loading @SMOKE", () => {
    cy.fixture(fixture).then((blogData) => {
      blog.getTitle().contains(blogData.header);
      blog.getTitleText().contains(blogData.paragraphBlog);

      blog.getButton().contains(blogData.button);
      blog.getBlogCard().should("have.length", 9);
      blog.getBlogCardTag().should("have.length", 9);
      blog.getBlogCardTag().contains(blogData.tagText);
      blog.getFeaturedBlog().should("have.length", 1);

      blog.getButton().click();
      blog.getBlogCard().should("have.length", 15);
    });
  });

  it("TCM-639 Blog article page", () => {
    cy.fixture(fixture).then((blogData) => {
      blog.getBlogCard().eq(4).click();

      blog.getArticleTitle().should("be.visible");
      blog.getArticleDate().should("be.visible");
      blog.getArticleReadTime().should("be.visible");
      blog.getAlsoLike().contains(blogData.alsoLike);
      blog.getAlsoCards().should("have.length", 3);
      blog.getArticleButton().contains(blogData.buttonArticle);

      blog.getArticleButton().click();

      cy.url().should("include", "/blog/page/1");
    });
  });

  it("TCM-712 Mobile - Blog pages renders correctly", () => {
    cy.wait(3000);
    cy.viewport("iphone-se2");

    blog.getBlogCard().eq(4).click();

    blog.getArticleTitle().should("be.visible");
    blog.getArticleDate().should("be.visible");
    blog.getArticleReadTime().should("be.visible");

    blog.getArticleButton().click();

    cy.url().should("include", "/blog/page/1");
  });
});
