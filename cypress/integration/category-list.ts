describe('Category list test section', () => {
  const usuarioCorrecto = 'admin@gmail.com';
  const passwordCorrecta = 'Admin1234#';

  beforeEach(function () {
    cy.visit('http://localhost:4200/sign-in');
  });

  it('Disable category and see if Product dont have it listed', () => {

    cy.visit('http://localhost:4200/');
    cy.get('#Categories').click();
    cy.get('#AceiteEditNoActive .mat-icon').click();
    cy.get('.mat-list-item:nth-child(6) > .mat-list-item-content').click();
    cy.get('#Products').click();
    cy.get('#PiquitosSanRoqueExpansionPanel > .mat-list-item-content').click();

    cy.get('.mat-chip > span', {
      timeout: 5000,
    }).should('not.exist');

    cy.get('#Categories > .mat-line').click();
    cy.get('#AceiteEditActive .mat-icon').click();
    cy.get('#Products > .mat-icon').click();
    cy.get('#PiquitosSanRoqueExpansionPanel > .mat-list-item-content').click();
    cy.get('.mat-chip > span').click();
  });
});
