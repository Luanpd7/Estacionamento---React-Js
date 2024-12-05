describe('Teste da Tela de Dashboard', () => {
  beforeEach(() => {
    // Visita a URL de login
    cy.visit('/');

    // Realiza o login com credenciais válidas
    cy.get("input[placeholder='Usuário']").type('admin');
    cy.get("input[placeholder='Senha']").type('1234');
    cy.get("button").contains('Entrar').click();

    // Garante que o redirecionamento para o dashboard ocorreu
    cy.url().should('include', '/dashboard');
  });

  it('Deve exibir o título da página corretamente', () => {
    cy.get('h1').contains('Estatísticas do Estacionamento');
  });

  it('Deve exibir o card de Total de Entradas', () => {
    cy.get('.card-title').contains('Total de Entradas');
    cy.get('.card-text.text-primary').should('exist');
  });

  it('Deve exibir o card de Vagas Disponíveis', () => {
    cy.get('.card-title').contains('Vagas Disponíveis');
    cy.get('.card-text.text-success').should('exist');
  });

  it('Deve exibir o card de Receita Diária', () => {
    cy.get('.card-title').contains('Receita Diária');
    cy.get('.card-text.text-danger').should('exist');
  });

  it('Deve exibir o footer com copyright', () => {
    cy.get('footer').contains('© 2024 Estacionamento Park Car');
  });
});
