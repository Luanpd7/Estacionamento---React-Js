import React, { useEffect, useState } from 'react';

function ModalEstacionamentos({ showModal, closeModal }) {
  const [estacionamentos, setEstacionamentos] = useState([]);

  useEffect(() => {
    if (showModal) {
      // Função para buscar estacionamentos em andamento
      const fetchEstacionamentos = async () => {
        try {
          const response = await fetch('/api/estacionamentos');
          const data = await response.json();
          setEstacionamentos(data);
        } catch (error) {
          console.error('Erro ao buscar estacionamentos:', error);
        }
      };

      fetchEstacionamentos();
    }
  }, [showModal]);

  if (!showModal) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Estacionamentos em Andamento</h2>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Placa</th>
              <th>Data</th>
              <th>Hora</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {estacionamentos.map((estacionamento) => (
              <tr key={estacionamento.id}>
                <td>{estacionamento.nome}</td>
                <td>{estacionamento.placa}</td>
                <td>{estacionamento.data}</td>
                <td>{estacionamento.hora}</td>
                <td>
                  {/* Adicione aqui os botões de editar ou excluir */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={closeModal}>Fechar</button>
      </div>
    </div>
  );
}

export default ModalEstacionamentos;
