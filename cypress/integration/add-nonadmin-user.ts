describe ('Add user', () => {
  const usuarioCorrecto = 'admin@gmail.com';
  const passwordCorrecta = 'Admin1234#';

  beforeEach(function () {
    cy.visit('sign-in');
    cy.get('#mat-input-0').type(usuarioCorrecto);
    cy.get('#mat-input-1').type(passwordCorrecta);
    cy.get('#loginButton').click();
  });

  afterEach(function() {
    cy.get('#logoutButton').click();
  });

  it('Add user', () => {
    cy.contains("BackOffice Tienda Mercadona").then(() => {
      cy.visit('users').then(() => {
        cy.get('#addUser').click();
        cy.get('#name').click();
        cy.get('#name').type('nuevoname');
        cy.get('#surname').click();
        cy.get('#surname').type('nuevosurname');
        cy.get('#email').click();
        cy.get('#email').type('nuevomail@mail');
        cy.get('.addButton .mat-icon').click();
        cy.get('#addUserForm').submit();
      })
    })
  })
})