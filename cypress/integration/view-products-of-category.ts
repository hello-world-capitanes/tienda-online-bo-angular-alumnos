describe('View products of category', () => {
  const usuarioCorrecto = 'admin@gmail.com';
  const passwordCorrecta = 'Admin1234#';
  beforeEach(function () {
    cy.visit('http://localhost:4200/sign-in');
  });
  it('View products of category', () => {
    cy.get('#emailInput').type(usuarioCorrecto);
    cy.get('#passwordInput').type(passwordCorrecta);
    cy.get('#loginButton').click();
    cy.visit('http://localhost:4200/categories');
  })
})
