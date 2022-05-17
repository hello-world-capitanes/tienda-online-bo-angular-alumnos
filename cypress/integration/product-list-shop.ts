describe('Modify stock', () => {
  const usuarioCorrecto = 'admin@gmail.com';
  const passwordCorrecta = 'Admin1234#';

  beforeEach(function () {
    cy.visit('http://localhost:4200/sign-in');
  });

  it('Decrease stock', () => {
    cy.get('#emailInput').type(usuarioCorrecto);
    cy.get('#passwordInput').type(passwordCorrecta);
    cy.get('#loginButton').click();
    cy.get('#Shops').click();
    const shopId = 'A0SasV3ohcu4kG4vwVxF';
    cy.get(`[data-shop-id="expansion_${shopId}"]`, {
      timeout: 5000,
    }).should('be.visible');
    
    cy.get(`[data-shop-id="expansion_${shopId}"]`).click();
    cy.get(`[data-shop-button="button_${shopId}"]`).as('viewProducts');
    cy.get('@viewProducts').click();
    const productName = 'Donut-RaulPradanas';
    const productId = '_z090vkd';
    cy.contains(productName)
      .parent()
      .parent()
      .get(`[data-product-id="input_${productId}"]`)
      .as('inputStock');
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
