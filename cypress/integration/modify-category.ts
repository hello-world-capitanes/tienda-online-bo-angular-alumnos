// pagina-de-inicio-de-sesion.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Modify-category', function() {

    const usuarioCorrecto = "admin@gmail.com";
    const passwordCorrecta = "Admin1234#";
  
    beforeEach(function(){
      cy.visit('http://localhost:4200/sign-in');
    })
  
    afterEach(function() {
      cy.reload();
    });
  
    it("Modificar datos de category",function() {
      cy.get('#mat-input-0').type(usuarioCorrecto);
      cy.get('#mat-input-1').type(passwordCorrecta);
      cy.get('#loginButton').click();
      cy.get('#Categories > .mat-line').click();
      cy.get('#editAceites').click();
      //cy.get('#mat-dialog-2').click();
      cy.get('#description').type('Aceite de girasol');
      cy.get('#modifyEnabled').click();
      cy.get('#modifyCategory').submit();
    });
  
  })