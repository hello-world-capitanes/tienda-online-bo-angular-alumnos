describe('Modify product', () => {
  const usuarioCorrecto = 'admin@gmail.com';
  const passwordCorrecta = 'Admin1234#';

  beforeEach(function () {
    cy.visit('http://localhost:4200/sign-in');
    cy.get('#mat-input-0').type(usuarioCorrecto);
    cy.get('#mat-input-1').type(passwordCorrecta);
    cy.get('#loginButton').click();
  });

  afterEach(function() {
    cy.get('#logoutButton').click();
  });

  it('Modify product with correct data', () => {
    cy.get('#Products > .mat-line').click();
    cy.get('#DonutsEditActive', {
      timeout: 5000,
    }).should('be.visible');
    cy.get('#DonutsEditActive').click();
    cy.get('#modifyProduct', {
      timeout: 5000,
    }).should('be.visible');
    cy.get('#price').type('40');
    cy.get('#modifyEnabled').click();
  });
});
