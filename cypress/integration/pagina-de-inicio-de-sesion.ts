// pagina-de-inicio-de-sesion.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Inicio de sesión', function() {
  const usuarioCorrecto = "bueno@correo.com";
  const usuarioCorrecto2 = "admin@gmail.com";
  const passwordCorrecta = "Admin1234#";

  beforeEach(function(){
    cy.visit('http://localhost:4200/sign-in');
  })

  afterEach(function() {
    cy.reload();
  });

  it("Incio de sesión correcto",function() {
    cy.get('#emailInput').type(usuarioCorrecto);
    cy.get('#passwordInput').type(passwordCorrecta);
    cy.get('#loginButton').click();
    cy.get('#sidenav').should('be.visible');
    cy.get('#sidenav');
    cy.get('#logoutButton').click();
    cy.reload();

    cy.get('#emailInput').type(usuarioCorrecto2);
    cy.get('#passwordInput').type(passwordCorrecta);
    cy.get('#loginButton').click();
    cy.get('#sidenav').should('be.visible');
    cy.get('#logoutButton').click();
  });

  it("Inicio de sesión con credenciales inválidas",function() {
    cy.get('#emailInput').type('invalid@gmail.com');
    cy.get('#passwordInput').type('12345');
    cy.get('#loginButton').click();
    cy.get('.snackContainer').should('be.visible');
    cy.get('.contenedorForm').should('be.visible');
    cy.reload();

    cy.get('#emailInput').type(usuarioCorrecto);
    cy.get('#passwordInput').type('fasdf32eds');
    cy.get('#loginButton').click();
    cy.get('.snackContainer').should('be.visible');
    cy.get('.contenedorForm').should('be.visible');
    cy.reload();

    cy.get('#emailInput').type("a@afasd");
    cy.get('#passwordInput').type(passwordCorrecta);
    cy.get('#loginButton').click();
    cy.get('.snackContainer').should('be.visible');
    cy.get('.contenedorForm').should('be.visible');
    cy.reload();

    cy.get('#emailInput').type(" ");
    cy.get('#passwordInput').type(" ");
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

  it('Inicio de sesión de con usuarios no administradores', function() {
    cy.get('#emailInput').type('mario@devanddel.com');
    cy.get('#passwordInput').type(passwordCorrecta);
    cy.get('#loginButton').click();
    cy.get('.snackContainer').should('be.visible');
    cy.get('.contenedorForm').should('be.visible');
    cy.reload();

    cy.get('#emailInput').type('test@test.com');
    cy.get('#passwordInput').type(passwordCorrecta);
    cy.get('#loginButton').click();
    cy.get('.snackContainer').should('be.visible');
    cy.get('.contenedorForm').should('be.visible');
    cy.reload();
  });
})
