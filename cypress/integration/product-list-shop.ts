describe('Modify stock', () => {
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

  /* it('Decrease stock', () => {
    cy.get('#Shops').click();
    const shopId = 'A0SasV3ohcu4kG4vwVxF';
    cy.get(`[data-shop-id="expansion_${shopId}"]`, {
      timeout: 5000,
    }).should('be.visible');

    cy.get(`[data-shop-id="expansion_${shopId}"]`).click();
    cy.get(`[data-shop-button="button_${shopId}"]`).as('viewProducts');
    cy.get('@viewProducts').click();
    const productName = 'Donuts-RaulPradanas';
    const productId = 'tZYYHlk6n0tYUWpIXSrL';
    cy.contains(productName)
      .parent()
      .parent()
      .get(`[data-product-id="input_${productId}"]`)
      .as('inputStock');
    cy.get('@inputStock').should('be.visible');
    cy.get('@inputStock')
      .invoke('prop', 'value')
      .then((value) => {
        expect(value).to.exist;
        cy.log(value);
        cy.get('@inputStock').clear();
        cy.get('@inputStock').type((value-1).toString());
        cy.contains(productName)
          .parent()
          .parent()
          .get(`[data-product-id="button_${productId}"]`)
          .as('buttonStock');

        cy.get('@buttonStock').click();
      });
      cy.get('#closeDialog').click();
  }); */

  it('Add Category to product', () => {

    cy.get('#Products').click();

    const productId = '115rz26jYchbNq4ap896';
    const categoryId = '5oIil7tlHyKeA8ifiSw0';

    cy.get(`[data-product-id="expansion_${productId}"]`, {
      timeout: 5000,
    }).should('be.visible');

    cy.get(`[data-product-id="expansion_${productId}"]`).click();
    cy.get(`[data-product-id="select_${productId}"]`).click();
    cy.get(`[data-product-id="option_${categoryId}"]`).click();
    cy.get(`[data-product-id="addCategory_${productId}"]`).click();
    cy.get(`[data-product-id="categories_${productId}_${categoryId}"]`).contains('Bollería');

  });
});
