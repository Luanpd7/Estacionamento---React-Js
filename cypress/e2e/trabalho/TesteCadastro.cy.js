describe('Teste do Aplicativo de Estacionamento - Tela de Cadastro', () => {
  beforeEach(() => {
    // Visita a rota de cadastro
    cy.visit('/register');
  });

  it('Deve exibir o formulário corretamente', () => {
    cy.get('.title').should('contain', 'Park Car');
    cy.get('input[placeholder="Nome completo"]').should('exist');
    cy.get('input[placeholder="Placa do veículo"]').should('exist');
    cy.get('button').contains('Preços').should('exist');
    cy.get('button').contains('Salvar').should('exist');
  });

  it('Deve abrir o modal ao clicar no botão Preços', () => {
    cy.get('button').contains('Preços').click();
    cy.get('.modal-content').should('be.visible');
    cy.get('input[name="precoAteUmaHora"]').should('exist');
    cy.get('input[name="precoAposUmaHora"]').should('exist');
  });

  it('Deve exibir um erro ao tentar salvar sem preencher os campos', () => {
    cy.get('button').contains('Salvar').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Preencha todos os campos antes de salvar.');
    });
  });

  it('Deve preencher e salvar os dados corretamente', () => {
    cy.get('input[placeholder="Nome completo"]').type('João da Silva');
    cy.get('input[placeholder="Placa do veículo"]').type('ABC-1234');

    cy.get('button').contains('Preços').click();
    cy.get('.modal-content').should('be.visible');
    cy.get('input[name="precoAteUmaHora"]').type('10,00');
    cy.get('input[name="precoAposUmaHora"]').type('15,00');
    cy.get('button').contains('Salvar').click();

    cy.intercept('POST', '/api/estacionamento', {
      statusCode: 200,
      body: { success: true },
    }).as('postEstacionamento');

    cy.get('button').contains('Salvar').click();
    cy.wait('@postEstacionamento').its('response.statusCode').should('eq', 200);
    cy.get('input[placeholder="Nome completo"]').should('have.value', '');
    cy.get('input[placeholder="Placa do veículo"]').should('have.value', '');
  });
});
