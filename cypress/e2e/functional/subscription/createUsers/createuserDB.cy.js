describe("Create admin users", () => {
  it("DB test", () => {
    cy.task("connectDB", {
      dbConfig: Cypress.config("DB"),
      //SQL
      sql: 'SELECT * FROM public."trialSubscriptions"',
    }).then((result) => {
      console.log(result.rows);
      console.log(result.rows[0].id);
    });
  });
});
