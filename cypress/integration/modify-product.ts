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

    const productTestId = '10H5bKRT2wQvtAVppfov';
    const productTestName = 'Donuts';

    cy.get(`[data-product-id = "expansion_${productTestId}"]`, {
      timeout: 5000,
    }).should('be.visible');

    cy.get(`[data-product-id = "expansion_${productTestId}"]`).click();

    cy.get(`[data-product-id = "edit${productTestName}"]`, {
      timeout: 5000,
    }).should('be.visible');

    cy.get(`[data-product-id = "edit${productTestName}"]`).click();

    cy.get('#price').click().clear();
    cy.get('#price').type('40');
    cy.get('#modifyEnabled').click();
  });
});
