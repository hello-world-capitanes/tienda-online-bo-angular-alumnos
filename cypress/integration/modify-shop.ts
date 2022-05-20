import { ShopService } from './../../src/app/features/shop/shop.service';
// pagina-de-inicio-de-sesion.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Modify-shop', function() {

  const usuarioCorrecto = "admin@gmail.com";
  const passwordCorrecta = "Admin1234#";

  beforeEach(function(){
    cy.visit('http://localhost:4200/sign-in');
    cy.get('#emailInput').type(usuarioCorrecto);
    cy.get('#passwordInput').type(passwordCorrecta);
    cy.get('#loginButton').click();
    cy.get('#Shops > .mat-line').click();
  })

  afterEach(function() {
    cy.get('#logoutButton').click();
    cy.reload();
  });

  it("Modificar datos de tienda",function() {
    cy.get('#mat-input-0').type(usuarioCorrecto);
    cy.get('#mat-input-1').type(passwordCorrecta);
    cy.get('#loginButton').click();
    cy.get('#Shops > .mat-line').click();
    cy.get('#editShopmercadona').click();
    //cy.get('#mat-dialog-2').click();
    cy.get('#location').click().clear();
    cy.get('#location').type('location');
    cy.get('#street').click().clear();
    cy.get('#street').type('calle');
    cy.get('#modifyEnabled').click();
    cy.get('#modifyShopForm').submit();
  });

  it("Desactivar una tienda", function() {
    const shopId = '4qCK2BqRorCbzOzRk1JK';
    cy.get(`[data-shop-id="delete_${shopId}"]`).click();
    cy.get(`[data-shop-id="reactivate_${shopId}"]`).should('be.visible');
    cy.get(`[data-shop-id="reactivate_${shopId}"]`).click();
  });
})
