describe('Modify stock', () => {
  const usuarioCorrecto = 'admin@gmail.com';
  const passwordCorrecta = 'Admin1234#';

  beforeEach(function(){
    cy.visit("http://localhost:4200/sign-in");
  });

  afterEach(function(){
    cy.reload();
  })
  it('Increase stock', () => {
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
    cy.get('#mat-input-12').type('450');
    cy.get('.cdk-focused').click();
  });

  it('Decrease stock', () => {
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
  });
});
