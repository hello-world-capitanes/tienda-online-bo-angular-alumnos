describe('Modify nonadmin user', () => {
  const usuarioCorrecto = 'admin@gmail.com';
  const passwordCorrecta = 'Admin1234#';

  beforeEach(function () {
    cy.visit('http://localhost:4200/sign-in');
  });

  it('Modify user', () => {
    const userId = 'Cpm9Rdgvw3tWrupkfved'
    cy.get('#emailInput').type(usuarioCorrecto);
    cy.get('#passwordInput').type(passwordCorrecta);
    cy.get('#loginButton').click();
    //cy.visit('http://localhost:4200/home');
    cy.get(`[data-user-id="modify_${userId}"]`).click();
    cy.get('#nameModifyUser').click().clear();
    cy.get('#nameModifyUser').type("CambioNameee")
    cy.get('#surnameModifyUser').click().clear();
    cy.get('#surnameModifyUser').type("CambioSurnameee")
    cy.get('#modifyEnabled').click();
    cy.get('#modifyUser').submit();
    cy.get('#logoutButton').click();
  })

})
