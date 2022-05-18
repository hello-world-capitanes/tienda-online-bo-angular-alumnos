describe('Category list test section', () => {
  const usuarioCorrecto = 'admin@gmail.com';
  const passwordCorrecta = 'Admin1234#';

  beforeEach(function () {
    cy.visit('http://localhost:4200/sign-in');
    cy.get('#emailInput').type(usuarioCorrecto);
    cy.get('#passwordInput').type(passwordCorrecta);
    cy.get('#loginButton').click();
  });

  it('Disable category and see if Product dont have it listed', () => {


    cy.get('#Categories', {
      timeout: 5000,
    }).should('be.visible');

    cy.get('#Categories').click();
    cy.get('#LimpiezaEditNoActive .mat-icon').click();
    cy.get('.mat-list-item:nth-child(6) > .mat-list-item-content').click();
    cy.get('#Products').click();
    cy.get('#EstropajoExpansionPanel > .mat-list-item-content').click();

     cy.get('#Limpiezachip', {
      timeout: 5000,
    }).should('not.exist');

    cy.get('#Categories > .mat-line').click();
    cy.get('#LimpiezaEditActive .mat-icon').click();
    cy.get('#Products > .mat-icon').click();
    cy.get('#EstropajoExpansionPanel > .mat-list-item-content').click();

    cy.get('#Limpiezachip', {
      timeout: 5000,
    }).should('exist');
  });

  afterEach(function() {
    cy.get('#logoutButton').click();
  });
});
