function iniciarCadastro(name, email) {
    cy.get('[data-qa="signup-name"]').type(name);
    cy.get('[data-qa="signup-email"]').type(email);

    cy.get('[data-qa="signup-button"]').click();
}

function preencherCadastro(dados){   
  cy.get('#id_gender2').check();

  cy.get('[data-qa="password"]').type(dados.senha);
  
  cy.get('[data-qa="days"]').select(dados.dataNascimento.dia);
  cy.get('[data-qa="months"]').select(dados.dataNascimento.mes);
  cy.get('[data-qa="years"]').select(dados.dataNascimento.ano);

  cy.get('#newsletter').check();
  cy.get('#optin').check();

  cy.get('[data-qa="first_name"]').type(dados.nome);
  cy.get('[data-qa="last_name"]').type(dados.sobrenome);
  cy.get('[data-qa="company"]').type(dados.empresa);
  cy.get('[data-qa="address"]').type(dados.endereco);
  cy.get('[data-qa="country"]').select(dados.pais);
  cy.get('[data-qa="state"]').type(dados.estado);
  cy.get('[data-qa="city"]').type(dados.cidade);
  cy.get('[data-qa="zipcode"]').type(dados.cep);
  cy.get('[data-qa="mobile_number"]').type(dados.celular);

  cy.get('[data-qa="create-account"]').click();
}

function verificarSeCadastroFoiRealizadoComSucesso() {
  cy.get('section').should('contain', 'Account Created!');
}

function verificarSeMensagemDeCadastroExistenteFoiExibida() {
  cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!');
}

export { iniciarCadastro, preencherCadastro, verificarSeCadastroFoiRealizadoComSucesso, verificarSeMensagemDeCadastroExistenteFoiExibida };