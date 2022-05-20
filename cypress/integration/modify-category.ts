describe('Modify-category', function() {

  const usuarioCorrecto = "admin@gmail.com";
  const passwordCorrecta = "Admin1234#";

  beforeEach(function(){
    cy.visit('http://localhost:4200/sign-in');
    cy.get('#emailInput').type(usuarioCorrecto);
    cy.get('#passwordInput').type(passwordCorrecta);
    cy.get('#loginButton').click();
    cy.get('#Categories > .mat-line').click();
  })

  afterEach(function() {
    cy.get('#logoutButton').click();
    cy.reload();
  });

  it("Modificar datos de tienda",function() {
    cy.get('#editAceites').click();
    //cy.get('#mat-dialog-2').click();
    cy.get('#description').click().clear();
    cy.get('#description').type('Nueva descripción');
    cy.get('#modifyEnabled').click();
    cy.get('#modifyCategory').submit();
  });

})