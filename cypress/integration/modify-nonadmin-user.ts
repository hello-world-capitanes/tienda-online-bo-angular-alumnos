describe('Modify nonadmin user', () => {
  const usuarioCorrecto = 'admin@gmail.com';
  const passwordCorrecta = 'Admin1234#';

  beforeEach(function () {
    cy.visit('http://localhost:4200/sign-in');
  });

  it('Modify user', () => {
    cy.get('#emailInput').type(usuarioCorrecto);
    cy.get('#passwordInput').type(passwordCorrecta);
    cy.get('#loginButton').click();
    //cy.visit('http://localhost:4200/home');
    cy.get('#BGShudOwwyCEJCmMj39qEditActive').click();
    cy.get('#nameModifyUser').clear();
    cy.get('#nameModifyUser').type("CambioNameee")
    cy.get('#surnameModifyUser').clear();
    cy.get('#surnameModifyUser').type("CambioSurnameee")
    cy.get('#modifyEnabled').click();
    cy.get('#modifyUser').submit();
    cy.get('#logoutButton').click();
  })

})
