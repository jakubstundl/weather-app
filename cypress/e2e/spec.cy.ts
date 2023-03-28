import Home from "@/pages";

describe('My First Test', () => {
  it('Visits the Homepage', () => {
    cy.visit('http://localhost:3000');

    cy.get('#user-button').click()
    cy.get("#email").click().type("test.jest@test.jest")
    cy.get("#password").click().type("test.jest@test.jest")
    cy.get("#login-submit").click()

  })
})