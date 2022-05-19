describe('List categories from product', () => {
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

  it('Consult product with categories', () => {
    cy.get('#Products').click();
    const productId = '10H5bKRT2wQvtAVppfov';

    cy.get(`[data-product-id="expansion_${productId}"]`).click();
    cy.get(`[data-product-id="expansion_${productId}"]`, {
      timeout: 5000,
    }).should('be.visible');
    cy.get('.matChipCategory').should('be.visible')
  });

  it('Consult product with no categories', () => {

    cy.get('#Products').click();
    const productId = 'L1brvuqDIiTfz7bDGFbo';

    cy.get(`[data-product-id="expansion_${productId}"]`).click();
    cy.get(`[data-product-id="expansion_${productId}"]`, {
      timeout: 5000,
    }).should('be.visible');
    cy.get('.matChipCategory').should('not.be.visible')

  });

});
