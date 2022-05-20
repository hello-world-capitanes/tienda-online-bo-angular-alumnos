describe ('Add user', () => {
  const usuarioCorrecto = 'admin@gmail.com';
  const passwordCorrecta = 'Admin1234#';

  beforeEach(function () {

    cy.visit('http://localhost:4200/sign-in');
    cy.get('#emailInput').type(usuarioCorrecto);
    cy.get('#passwordInput').type(passwordCorrecta);
    cy.get('#loginButton').click();
  });
  afterEach(function() {
    cy.get('#logoutButton').click();
  });

  it('Add admin user', () => {
    cy.get('#Users').click();
    cy.get('.addAdminBtn').click();
    cy.get('#emailInput').click();
    cy.get('#emailInput').type('usuario1234@gmail.com');
    cy.get('#passwordInput').click();
    cy.get('#passwordInput').type('Admin1234#');
    cy.get('#addAdminButton').click();
    cy.get('.snackContainer').should('be.visible');
    cy.get('.snackContainer').contains('Invalid user');


  })

});
