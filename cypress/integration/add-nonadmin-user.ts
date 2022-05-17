describe ('Add user', () => {
  const usuarioCorrecto = 'adimn@gmail.com';
  const passwordCorrecta = 'Admin1234#';

  beforeEach(function () {
    cy.visit('http://localhost:4200/sign-in');
  });

  it('Add user', () => {
    cy.get('#mat-input-0').type(usuarioCorrecto);
    cy.get('#mat-input-1').type(passwordCorrecta);
    cy.get('#loginButton').click();
    cy.visit('http://localhost:4200/home');
    cy.get('.mat-expansion-panel-header-title:nth-child(1)').click();
    cy.get('#name').click();
    cy.get('#name').type('nuevo');
    cy.get('#surname').type('nuevisimo');
    cy.get('#email').type('nuevo@nuevo.es');
    cy.get('.addButton .mat-icon').click();
    cy.get('#addUserForm').submit();

  })

})
