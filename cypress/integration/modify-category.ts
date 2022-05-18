describe('Modify category', () => {
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

  it('Modify category with correct data', () => {
    cy.get('#Categories > .mat-line').click();
    cy.get('#AceitesEditActive', {
      timeout: 5000,
    }).should('be.visible');
    cy.get('#AceitesEditActive').click();
    cy.get('#modifyCategory', {
      timeout: 5000,
    }).should('be.visible');
    cy.get('#description').type('Origen España');
    cy.get('#modifyEnabled').click();
  });
});