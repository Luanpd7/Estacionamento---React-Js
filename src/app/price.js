import React from 'react';
import './modal.css'; // Crie o CSS separado para o modal ou mantenha no App.css

function Modal({ showModal, closeModal }) {
  if (!showModal) return null; // Se o modal não deve ser exibido, retorne null

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Preços</h2>
        <form>
          <label>Até 1 hora estacionado</label>
          <input type="text" className="input-field" placeholder="Até 1 hora" />
          <label>Após 1 hora</label>
          <input type="text" className="input-field" placeholder="Após 1 hora" />
          <div className="modal-buttons">
            <button type="submit" className="button">Salvar</button>
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
