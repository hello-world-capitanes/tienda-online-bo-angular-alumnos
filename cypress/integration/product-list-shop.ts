
describe('Modify stock', () => {
  const usuarioCorrecto = 'admin@gmail.com';
  const passwordCorrecta = 'Admin1234#';

  beforeEach(function () {
    cy.visit('http://localhost:4200/sign-in');
  });
  
  afterEach(function () {
    cy.get('#logoutButton').click();
  });

  it('Decrease stock', () => {
    cy.get('#mat-input-0').type(usuarioCorrecto);
    cy.get('#mat-input-1').type(passwordCorrecta);
    cy.get('#loginButton').click();
    cy.get('#Shops').click();
    cy.get('#Merca', {
      timeout: 5000,
    }).should('be.visible');
    cy.get('#Merca').click();
    cy.get('#viewProducts',{timeout:5000}).should('be.visible');
    cy.get('#viewProducts').click();
    cy.contains('Donut-RaulPradanas').parent().parent().get('#inputStock').as('inputStock');
    cy.get('@inputStock').clear();
    cy.get('@inputStock').type('5');
    cy.contains('Donut-RaulPradanas').parent().parent().get('#buttonStock').as('buttonStock');
    cy.get('@buttonStock').click()
  });

  /* it('Decrease stock', () => {
    cy.get('#mat-input-0').type(usuarioCorrecto);
    cy.get('#mat-input-1').type(passwordCorrecta);
    cy.get('#loginButton').click();
    cy.get('.mat-list-item:nth-child(6) .mat-line').click();
    cy.get('#mat-expansion-panel-header-5 > .mat-content').click();
    cy.get('.cdk-focused').click();
    cy.get('#mat-input-12').click();
    cy.get('#mat-input-12').type('{backspace}');
    cy.get('#mat-input-12').type('{backspace}');
    cy.get('#mat-input-12').type('{backspace}');
    cy.get('#mat-input-12').type('45');
    cy.get('.cdk-focused').click();
  }); */
});
