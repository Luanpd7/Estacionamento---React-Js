describe("Teste de Tela de Login - http://localhost:3000/", () => {
  beforeEach(() => {
    // Visita a URL da tela de login
    cy.visit("http://localhost:3000/");
  });

  it("Deve exibir a tela de login corretamente", () => {
    // Verifica se os elementos principais da tela de login estão visíveis
    cy.contains("Login").should("be.visible");
    cy.get("input[placeholder='Usuário']").should("be.visible");
    cy.get("input[placeholder='Senha']").should("be.visible");
    cy.get("button").contains("Entrar").should("be.visible");
  });

  it("Deve exibir uma mensagem de erro para credenciais inválidas", () => {
    // Preenche o formulário com credenciais inválidas
    cy.get("input[placeholder='Usuário']").type("usuarioInvalido");
    cy.get("input[placeholder='Senha']").type("senhaErrada");
    cy.get("button").contains("Entrar").click();

    // Verifica se a mensagem de erro é exibida
    cy.contains("Credenciais inválidas. Tente novamente.").should("be.visible");
  });

  it("Deve redirecionar para o dashboard ao fazer login com credenciais válidas", () => {
    // Preenche o formulário com credenciais válidas
    cy.get("input[placeholder='Usuário']").type("admin");
    cy.get("input[placeholder='Senha']").type("1234");
    cy.get("button").contains("Entrar").click();

    // Verifica o redirecionamento para o dashboard
    cy.url().should("include", "/dashboard");
    cy.contains("Estatísticas do Estacionamento").should("be.visible");
  });
});
