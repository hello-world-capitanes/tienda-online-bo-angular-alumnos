describe('Modify shop list', () => {
  const usuarioCorrecto = 'admin@gmail.com';
  const passwordCorrecta = 'Admin1234#';

  beforeEach(function () {
    cy.visit('http://localhost:4200/sign-in');
  });

  it('Set shop inactive, then set shop active', () => {
    cy.get('#emailInput').type(usuarioCorrecto);
    cy.get('#passwordInput').type(passwordCorrecta);
    cy.get('#loginButton').click();
    cy.get('#Shops > .mat-line').click();
    cy.get('#mercadona', {
      timeout: 5000,
    }).should('be.visible');
    cy.get('#mercadonadeactiveShopButton',{timeout:5000}).should('be.visible');
    cy.get('#mercadonadeactiveShopButton').click();
    cy.get('#mercadonaactiveShopButton',{timeout:5000}).should('be.visible');
    cy.get('#mercadonaactiveShopButton').click();
    cy.get('#mercadonadeactiveShopButton',{timeout:5000}).should('be.visible');
    cy.get('#mercadonadeactiveShopButton').click();
    cy.get('#mercadonaactiveShopButton',{timeout:5000}).should('be.visible');
    cy.get('#mercadonaactiveShopButton').click();
    cy.get('#logoutButton').click();


  });
});
