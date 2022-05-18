describe ('Add user', () => {
  const usuarioCorrecto = 'admin@gmail.com';
  const passwordCorrecta = 'Admin1234#';

  beforeEach(function () {
    cy.visit('http://localhost:4200/sign-in');
  });

  it('Add user', () => {
    cy.get('#emailInput').type(usuarioCorrecto);
    cy.get('#passwordInput').type(passwordCorrecta);
    cy.get('#loginButton').click();
    //cy.visit('http://localhost:4200/home');
    cy.get('#addUser').click();
    cy.get('#name').click();
    cy.get('#name').type('nuevoname');
    cy.get('#surname').click();
    cy.get('#surname').type('nuevosurname');
    cy.get('#email').click();
    cy.get('#email').type('nuevomail@mail');
    cy.get('.addButton .mat-icon').click();
    cy.get('#addUserForm').submit();
    cy.get('#logoutButton').click();
  })

})
