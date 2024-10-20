
import './modal.css'; // Crie o CSS separado para o modal ou mantenha no App.css
import React, { useState } from 'react';

// Função para formatar valores como dinheiro
const formatCurrency = (value) => {
  if (!value) return '';
  
  const cleanValue = value.replace(/[^\d]/g, ''); // Remove caracteres não numéricos
  const options = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
  
  // Formata o valor para dinheiro
  return new Intl.NumberFormat('pt-BR', options).format(cleanValue / 100);
};

function Modal({ showModal, closeModal, savePrices }) {
  const [untilOneHour, setUntilOne] = useState('');
  const [afterOneHour, setAfterOne] = useState('');

  if (!showModal) return null; // Se o modal não deve ser exibido, retorne null

  const handleUntilOneChange = (event) => {
    const formattedValue = formatCurrency(event.target.value);
    setUntilOne(formattedValue);
  };

  const handleAfterOneChange = (event) => {
    const formattedValue = formatCurrency(event.target.value);
    setAfterOne(formattedValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validação: Se algum dos campos estiver vazio, não salvar
    if (!untilOneHour || !afterOneHour) {
      alert('Preencha todos os campos de preço.');
      return;
    }
    // Passa os dados para a função do App.js
    savePrices(untilOneHour, afterOneHour);
    closeModal();
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Preços</h2>
        <form onSubmit={handleSubmit}>
          <label className="label-modal">Até 1 hora estacionado</label>
          <input
            type="text"
            value={untilOneHour}
            onChange={handleUntilOneChange}
            className="input-field"
            placeholder="Até 1 hora"
          />
          <label className="label-modal">Após 1 hora</label>
          <input
            type="text"
            value={afterOneHour}
            onChange={handleAfterOneChange}
            className="input-field"
            placeholder="Após 1 hora"
          />
          <div className="modal-buttons">
            <button type="submit" className="button">
              Salvar
            </button>
            <button type="button" className="button cancel" onClick={closeModal}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
