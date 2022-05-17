describe('Modify nonadmin user', () => {
  const usuarioCorrecto = 'admin@gmail.com';
  const passwordCorrecta = 'Admin1234#';

  beforeEach(function () {
    cy.visit('http://localhost:4200/sign-in');
  });

  it('Modify user', () => {
    cy.get('#mat-input-0').type(usuarioCorrecto);
    cy.get('#mat-input-1').type(passwordCorrecta);
    cy.get('#loginButton').click();
    //cy.visit('http://localhost:4200/home');
    cy.get('#BGShudOwwyCEJCmMj39qEditActive').click();
    cy.get('#name').clear();
    cy.get('#name').type("CambioName");
    cy.get('#surname').clear();
    cy.get('#surname').type("CambioSurname")
    cy.get('#modifyEnabled').click();
    cy.get('#modifyUser').submit();
  })

})
