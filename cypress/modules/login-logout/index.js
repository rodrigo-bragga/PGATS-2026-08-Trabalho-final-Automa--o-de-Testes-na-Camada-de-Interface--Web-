function preencherLogin(email, senha) {
  cy.get('[data-qa="login-email"]').type(email);
  cy.get('[data-qa="login-password"]').type(senha);

  cy.get('[data-qa="login-button"]').click();
}

function verificarSeLoginFoiRealizadoComSucesso() {
  cy.get('a > b').should('contain', 'PGATS Aut');
}

function verificarSeMensagemDeErroDeLoginFoiExibida() {
  cy.get('form[action*="login"] > p').should('contain', 'Your email or password is incorrect!');
}

function efetuarLogout() {
  cy.get('a[href*="logout"]').click();
  cy.get('a[href*="login"]').should('contain', 'Login');
}

function verificaSeOUsuarioFoiDeslogado() {
  cy.get('a[href*="login"]').should('contain', 'Login');
}

export { preencherLogin, verificarSeLoginFoiRealizadoComSucesso, verificarSeMensagemDeErroDeLoginFoiExibida, efetuarLogout, verificaSeOUsuarioFoiDeslogado };