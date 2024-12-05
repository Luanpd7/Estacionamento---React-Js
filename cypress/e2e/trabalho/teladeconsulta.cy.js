describe('Teste da Tela de Consulta', () => {
  beforeEach(() => {
    // Acessa a URL da tela de consulta
    cy.visit('/list');
  });

  it('Deve exibir o título da página corretamente', () => {
    cy.contains('Consulta de Entradas').should('be.visible');
  });

  it('Deve carregar as entradas corretamente', () => {
    // Simula que a lista está carregada
    cy.intercept('GET', '/api/estacionamento', {
      statusCode: 200,
      body: [
        {
          id: 1,
          nome: 'João Silva',
          placa: 'ABC-1234',
          data: '2024-12-01',
          hora: '14:00',
        },
        {
          id: 2,
          nome: 'Maria Oliveira',
          placa: 'XYZ-5678',
          data: '2024-12-01',
          hora: '15:00',
        },
      ],
    });

    // Aguarda o carregamento da lista
    cy.wait(200);
    cy.get('.entry-item').should('have.length', 2);

    // Verifica o conteúdo das entradas
    cy.contains('João Silva').should('be.visible');
    cy.contains('Maria Oliveira').should('be.visible');
  });

  it('Deve abrir o modal de detalhes ao clicar em "Detalhes"', () => {
    // Simula os dados da API
    cy.intercept('GET', '/api/estacionamento', {
      statusCode: 200,
      body: [
        {
          id: 1,
          nome: 'João Silva',
          placa: 'ABC-1234',
          data: '2024-12-01',
          hora: '14:00',
        },
      ],
    });

    cy.wait(200);

    // Clica no botão de detalhes
    cy.get('.icon-button.green').click();
    cy.contains('Detalhes').should('be.visible'); // Verifica o modal
  });

  it('Deve abrir o modal de edição ao clicar em "Editar"', () => {
    // Simula os dados da API
    cy.intercept('GET', '/api/estacionamento', {
      statusCode: 200,
      body: [
        {
          id: 1,
          nome: 'João Silva',
          placa: 'ABC-1234',
          data: '2024-12-01',
          hora: '14:00',
        },
      ],
    });

    cy.wait(200);

    // Clica no botão de editar
    cy.get('.icon-button.edit').click();
    cy.contains('Editar Entrada').should('be.visible'); // Verifica o modal
  });

  it('Deve excluir uma entrada ao clicar em "Excluir"', () => {
    // Simula os dados da API
    cy.intercept('GET', '/api/estacionamento', {
      statusCode: 200,
      body: [
        {
          id: 1,
          nome: 'João Silva',
          placa: 'ABC-1234',
          data: '2024-12-01',
          hora: '14:00',
        },
      ],
    });

    // Simula a exclusão
    cy.intercept('DELETE', '/api/estacionamento?id=1', {
      statusCode: 200,
      body: { message: 'Entrada excluída com sucesso' },
    });

    cy.wait(200);

    // Clica no botão de excluir
    cy.get('.icon-button.red').click();

    // Verifica se a entrada foi removida
    cy.contains('João Silva').should('not.exist');
  });
});
