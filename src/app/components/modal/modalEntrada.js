"use client"; // Certifica-se que é um Client Component
import React from 'react';

const ModalEntrada = ({ showModal, modalInfo, closeModal }) => {
  if (!showModal) return null;

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Comprovante de entrada</h2>
        <div className="modal-details">
          <div className="modal-field">
            <label>Nome</label>
            <p>{modalInfo.nome}</p>
          </div>
          <div className="modal-field">
            <label>Placa do veículo</label>
            <p>{modalInfo.placa}</p>
          </div>
          <div className="modal-field">
            <label>Data</label>
            <p>{modalInfo.data}</p>
          </div>
          <div className="modal-field">
            <label>Hora</label>
            <p>{modalInfo.hora}</p>
          </div>
        </div>
        <button onClick={closeModal} className="button">
          Fechar
        </button>
      </div>
    </div>
  );
};

export default ModalEntrada;
