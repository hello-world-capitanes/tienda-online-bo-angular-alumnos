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


    /* ####### DEPENDS OF CATEGORY: 'LIMPIEZA' SET TO ACTIVE  ########## */

    const productTestId = '6SPRbZPGUA0V6pbM3ClU';
    const categoryTestId = 'kSVchlEW4mvqZWKndxgL';
    const categoryTestName = 'Limpieza';

    cy.get('#Categories', {
      timeout: 5000,
    }).should('be.visible');

    cy.get('#Categories').click();
    cy.get(`[data-category-name = "editActiveCategory${categoryTestName}"]`).click();
    cy.get('.mat-list-item:nth-child(6) > .mat-list-item-content').click();
    cy.get('#Products').click();

    cy.get(`[data-product-id = "expansion_${productTestId}"]`, {
      timeout: 5000,
    }).should('be.visible');

    cy.get(`[data-product-id = "expansion_${productTestId}"]`).click();

    cy.get(`[data-product-id = "categories_${productTestId}_${categoryTestId}"]`, {
      timeout: 5000,
    }).should('not.exist');

    cy.get('#Categories').click();
    cy.get(`[data-category-name = "editActiveCategory${categoryTestName}"]`).click();
    cy.get('#Products').click();

    cy.get(`[data-product-id = "expansion_${productTestId}"]`).click();

    cy.get(`[data-product-id = "categories_${productTestId}_${categoryTestId}"]`, {
      timeout: 5000,
    }).should('exist');

  });

  afterEach(function() {
    cy.get('#logoutButton').click();
  });
});
