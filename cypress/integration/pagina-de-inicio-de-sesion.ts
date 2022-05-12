// pagina-de-inicio-de-sesion.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Inicio de sesión', function() {
  const usuarioCorrecto = "admin@gmail.com";
  const passwordCorrecta = "Admin1234#";

  beforeEach(function(){
    cy.visit('http://localhost:4200/sign-in');
  })

  afterEach(function() {
    cy.reload();
  });

  it("Incio de sesión correcto",function() {
    cy.get('#mat-input-0').type(usuarioCorrecto);
    cy.get('#mat-input-1').type(passwordCorrecta);
    cy.get('#loginButton').click();
    cy.get('#sidenav').should('be.visible');
    cy.get('#sidenav');
    cy.get('#logoutButton').click();
  });

  it("Inicio de sesión con credenciales inválidas",function() {
    cy.get('#mat-input-0').type('invalid@gmail.com');
    cy.get('#mat-input-1').type('12345');
    cy.get('#loginButton').click();
    cy.get('.snackContainer').should('be.visible');
    cy.get('.contenedorForm').should('be.visible');
    cy.reload();

    cy.get('#mat-input-0').type(usuarioCorrecto);
    cy.get('#mat-input-1').type('fasdf32eds');
    cy.get('#loginButton').click();
    cy.get('.snackContainer').should('be.visible');
    cy.get('.contenedorForm').should('be.visible');
    cy.reload();

    cy.get('#mat-input-0').type("a@afasd");
    cy.get('#mat-input-1').type(passwordCorrecta);
    cy.get('#loginButton').click();
    cy.get('.snackContainer').should('be.visible');
    cy.get('.contenedorForm').should('be.visible');
    cy.reload();

    cy.get('#mat-input-0').type(" ");
    cy.get('#mat-input-1').type(" ");
    cy.get('#loginButton').click();
    cy.get('.snackContainer').should('be.visible');
    cy.get('.contenedorForm').should('be.visible');
    cy.reload();

    cy.get('#loginButton').click();
    cy.get('.snackContainer').should('be.visible');
    cy.get('.contenedorForm').should('be.visible');
  });

  it('Visitar páginas no accesibles loggeo previo', function() {
    cy.visit('http://localhost:4200/products');
    cy.get('.snackContainer').should('be.visible');
    cy.get('.contenedorForm').should('be.visible');

    cy.visit('http://localhost:4200/shops');
    cy.get('.snackContainer').should('be.visible');
    cy.get('.contenedorForm').should('be.visible');

    cy.visit('http://localhost:4200/users');
    cy.get('.snackContainer').should('be.visible');
    cy.get('.contenedorForm').should('be.visible');

    cy.visit('http://localhost:4200/categories');
    cy.get('.snackContainer').should('be.visible');
    cy.get('.contenedorForm').should('be.visible');

    cy.visit('http://localhost:4200/home');
    cy.get('.snackContainer').should('be.visible');
    cy.get('.contenedorForm').should('be.visible');

    cy.visit('http://localhost:4200/sign-in');
    cy.get('.contenedorForm').should('be.visible');
  });

})
