import { iniciarCadastro, preencherCadastro, verificarSeCadastroFoiRealizadoComSucesso, verificarSeMensagemDeCadastroExistenteFoiExibida } from '../modules/cadastro/index.js';
import { preencherLogin, verificarSeLoginFoiRealizadoComSucesso, verificarSeMensagemDeErroDeLoginFoiExibida, efetuarLogout, verificaSeOUsuarioFoiDeslogado } from '../modules/login-logout/index.js';
import dadosCadastro from '../fixtures/usuario/dadosCadastro.json';

describe('Automation Exercise', () => {
  
  it('Test case 1 - Cadastrar um novo usuário com sucesso', () => {
    cy.visit('https://www.automationexercise.com');
    cy.get('a[href="/login"]').click();

    iniciarCadastro(`PGATS Aut`, `pagts-aut-teste${Date.now()}@mail.com`);
    console.log(dadosCadastro);

    preencherCadastro(dadosCadastro);

    verificarSeCadastroFoiRealizadoComSucesso();

  });

  it('Test case 2 - Efetuar Login de Usuário com email e senha corretos', () => {
    cy.visit('https://www.automationexercise.com/login');

    preencherLogin('pagts-aut-teste@mail.com', '12345');
    verificarSeLoginFoiRealizadoComSucesso();
  });

  it('Test case 3 - Efetuar Login de Usuário com email e senha incorretos', () => {
    cy.visit('https://www.automationexercise.com/login');

    preencherLogin('pagts-aut-teste@mail.com', '54321');

    verificarSeMensagemDeErroDeLoginFoiExibida();
  })

  it('Test case 4 - Efetuar Logout', () => {
    cy.visit('https://www.automationexercise.com/login');
    
    preencherLogin('pagts-aut-teste@mail.com', '12345');
    verificarSeLoginFoiRealizadoComSucesso();

    efetuarLogout();

    verificaSeOUsuarioFoiDeslogado();
  });

  it('Test case 5 - Tentar cadastrar usuário com email já existente', () => {
    cy.visit('https://www.automationexercise.com');
    cy.get('a[href="/login"]').click();

    iniciarCadastro('PGATS Aut', 'pagts-aut-teste@mail.com');

    verificarSeMensagemDeCadastroExistenteFoiExibida();
  });

  it('Test case 8 - Verifica todos os produtos e página de detalhes do produto', () => {
    cy.visit('https://www.automationexercise.com');

    cy.get('a[href="/products"]').click();

    cy.url().should('include', '/products');
    cy.get('.features_items').should('be.visible');

    cy.get('.features_items').contains('a', 'View Product').first().click();

    cy.url().should('include', '/product_details');

    cy.get('.product-information').should('be.visible');
  });

  it('Test case 9 - Procurando um produto', () => {
    cy.visit('https://www.automationexercise.com');

     cy.get('a[href="/products"]').click();

    cy.url().should('include', '/products');
    cy.get('.features_items').should('be.visible');

    cy.get('#search_product').type('women');
    cy.get('#submit_search').click();

    cy.get('.features_items .productinfo p') 
      .each(($el) => {
        const texto = $el.text();   
        expect(texto.toLowerCase()).to.include('women');
      });
  });

  it('Test case 10 - Verifica inscrição na página inicial', () => {
    cy.visit('https://www.automationexercise.com');

    cy.get('#footer').should('contain', 'Subscription');

    cy.get('#susbscribe_email').type(`pagts-aut-teste${Date.now()}@mail.com`);
    cy.get('#subscribe').click();

    cy.get('#footer').should('contain', 'You have been successfully subscribed!');
  });

  it('Test case 15 - Realiza cadastro e pedido em seguida', () => {
    cy.visit('https://www.automationexercise.com/login');

    const email = `pagts-aut-teste${Date.now()}@mail.com`;

    iniciarCadastro(`PGATS Aut`, email);

    preencherCadastro(dadosCadastro);

    cy.get('[data-qa="continue-button"]').click();
    
    cy.get('.add-to-cart').first().click();

    cy.get('#cartModal a[href="/view_cart"]').click()

    cy.get('a.check_out').click();

    cy.get('#address_delivery')
      .should('contain', dadosCadastro.nome)
      .should('contain', dadosCadastro.endereco)
      .should('contain', dadosCadastro.cidade)
      .should('contain', dadosCadastro.estado)
      .should('contain', dadosCadastro.cep)
      .should('contain', dadosCadastro.pais)
      .should('contain', dadosCadastro.celular);

    cy.get('textarea[name="message"]').type('Teste de automação de checkout');

    cy.get('a[href="/payment"]').click();

    cy.get('[data-qa="name-on-card"]').type('PGATS Aut');
    cy.get('[data-qa="card-number"]').type('1234 5678 9012 3456');
    cy.get('[data-qa="cvc"]').type('123');
    cy.get('[data-qa="expiry-month"]').type('12');
    cy.get('[data-qa="expiry-year"]').type('2025');

    cy.get('[data-qa="pay-button"]').click();

    cy.get('[data-qa="order-placed"]').should('contain', 'Order Placed!');
    cy.get('a[href="/delete_account"]').click();

    cy.get('[data-qa="account-deleted"]').should('contain', 'Account Deleted!');

    cy.get('[data-qa="continue-button"]').click();
  });

it('Test case 16 - Realiza login e pedido em seguida', () => {
    cy.visit('https://www.automationexercise.com/login');

    const email = `pagts-aut-teste${Date.now()}@mail.com`;

    iniciarCadastro(`PGATS Aut`, email);

    preencherCadastro(dadosCadastro);

    cy.get('[data-qa="continue-button"]').click();

    efetuarLogout();

    preencherLogin(email, '12345');
    verificarSeLoginFoiRealizadoComSucesso();    
    
    cy.get('.add-to-cart').first().click();

    cy.get('#cartModal a[href="/view_cart"]').click()

    cy.get('a.check_out').click();

    cy.get('#address_delivery')
      .should('contain', dadosCadastro.nome)
      .should('contain', dadosCadastro.endereco)
      .should('contain', dadosCadastro.cidade)
      .should('contain', dadosCadastro.estado)
      .should('contain', dadosCadastro.cep)
      .should('contain', dadosCadastro.pais)
      .should('contain', dadosCadastro.celular);

    cy.get('textarea[name="message"]').type('Teste de automação de checkout');

    cy.get('a[href="/payment"]').click();

    cy.get('[data-qa="name-on-card"]').type('PGATS Aut');
    cy.get('[data-qa="card-number"]').type('1234 5678 9012 3456');
    cy.get('[data-qa="cvc"]').type('123');
    cy.get('[data-qa="expiry-month"]').type('12');
    cy.get('[data-qa="expiry-year"]').type('2025');

    cy.get('[data-qa="pay-button"]').click();

    cy.get('[data-qa="order-placed"]').should('contain', 'Order Placed!');
    cy.get('a[href="/delete_account"]').click();

    cy.get('[data-qa="account-deleted"]').should('contain', 'Account Deleted!');

    cy.get('[data-qa="continue-button"]').click();
  });

});