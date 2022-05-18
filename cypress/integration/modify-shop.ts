// pagina-de-inicio-de-sesion.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Modify-shop', function() {

  const usuarioCorrecto = "admin@gmail.com";
  const passwordCorrecta = "Admin1234#";

  beforeEach(function(){
    cy.visit('http://localhost:4200/sign-in');
  })

  afterEach(function() {
    cy.reload();
  });

  it("Modificar datos de tienda",function() {
    cy.get('#emailInput').type(usuarioCorrecto);
    cy.get('#passwordInput').type(passwordCorrecta);
    cy.get('#loginButton').click();
    cy.get('#Shops > .mat-line').click();
    cy.get('#editShopmercadona').click();
    //cy.get('#mat-dialog-2').click();
    cy.get('#location').clear();
    cy.get('#location').type('location');
    cy.get('#street').clear();
    cy.get('#street').type('calle');
    cy.get('#modifyEnabled').click();
    cy.get('#modifyShopForm').submit();

  });

  afterEach(function() {
    cy.get('#logoutButton').click();
  });

})
