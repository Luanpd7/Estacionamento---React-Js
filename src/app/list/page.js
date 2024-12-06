"use client";

import React, { useState, useEffect } from "react";
import "../css/App.css";
import ModalEntrada from "../components/modal/modalEntrada";;
import PaymentModal from "../components/PaymentModal";

export default function ConsultaPage() {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalInfo, setModalInfo] = useState(null);
  const [showModalEntrada, setShowModalEntrada] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editEntry, setEditEntry] = useState(null);
  const [valorTotal, setValorTotal] = useState(0);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch("/api/estacionamento");
        if (!response.ok) throw new Error("Erro ao buscar dados");
        const data = await response.json();
        setEntries(data);
      } catch (error) {
        console.error("Erro ao buscar entradas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntries();
  }, []);

  // Abrir Modal de Detalhes
  const openModalEntrada = (entry) => {
    setModalInfo(entry);
    setShowModalEntrada(true);
  };

  const closeModalEntrada = () => setShowModalEntrada(false);

  // Abrir Modal de Pagamento
  const openPaymentModal = (entry) => {
    setModalInfo(entry);
    setShowPaymentModal(true);

    const now = new Date();
    const entryTime = new Date(entry.estacionamento.horaEntrada);
    const timeDiff = Math.abs(now - entryTime) / (1000 * 60 * 60); // Em horas

    const valorCalculado =
      timeDiff <= 1
        ? entry.estacionamento.precoAteUmaHora
        : entry.estacionamento.precoAteUmaHora +
          (timeDiff - 1) * entry.estacionamento.precoAposUmaHora;

    setValorTotal(valorCalculado);
  };

  const closePaymentModal = () => setShowPaymentModal(false);

  // Abrir Modal de Edição
  const openEditModal = (entry) => {
    setEditEntry(entry);
    setShowEditModal(true);
  };

  const closeEditModal = () => setShowEditModal(false);

  const handleEditSubmit = async () => {
    try {
      const response = await fetch("/api/estacionamento", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editEntry.id,
          nome: editEntry.nome,
          placa: editEntry.placa,
          precoAteUmaHora: parseFloat(editEntry.estacionamento?.precoAteUmaHora || 0),
          precoAposUmaHora: parseFloat(editEntry.estacionamento?.precoAposUmaHora || 0),
        }),
      });

      if (response.ok) {
        const updatedEntry = await response.json();
        setEntries((prevEntries) =>
          prevEntries.map((entry) =>
            entry.id === updatedEntry.id ? updatedEntry : entry
          )
        );
        closeEditModal();
      } else {
        alert("Erro ao atualizar entrada");
      }
    } catch (error) {
      console.error("Erro ao atualizar entrada:", error);
      alert("Erro ao atualizar entrada");
    }
  };

  // Exclusão
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/estacionamento?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setEntries((prevEntries) =>
          prevEntries.filter((entry) => entry.id !== id)
        );
      } else {
        alert("Erro ao excluir a entrada");
      }
    } catch (error) {
      console.error("Erro na solicitação de exclusão:", error);
      alert("Erro ao excluir a entrada");
    }
  };

  if (isLoading) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container">
      <h1 className="title">Consulta de Entradas</h1>
      <div className="scroll-view">
        {entries.map((entry) => (
          <div key={entry.id} className="entry-item">
            <div className="entry-details">
              <span>Nome: {entry.nome}</span>
              <span>Placa: {entry.placa}</span>
            </div>
            <div className="entry-actions">
              <button
                className="icon-button green"
                onClick={() => openModalEntrada(entry)}
              >
                Detalhes
              </button>
              <button
                className="icon-button edit"
                onClick={() => openEditModal(entry)}
              >
                ✏ Editar
              </button>
              <button
                className="icon-button red"
                onClick={() => handleDelete(entry.id)}
              >
                🗑 Excluir
              </button>
              <button
                className="icon-button payment"
                onClick={() => openPaymentModal(entry)}
              >
                💳 Dinheiro
              </button>
            </div>
          </div>
        ))}
      </div>
      <ModalEntrada
        showModal={showModalEntrada}
        modalInfo={modalInfo}
        closeModal={closeModalEntrada}
      />
      <PaymentModal
        show={showPaymentModal}
        modalInfo={modalInfo}
        valorTotal={valorTotal}
        closeModal={closePaymentModal}
      />
      {showEditModal && editEntry && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Editar Entrada</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEditSubmit();
              }}
            >
              <label>Nome:</label>
              <input
                type="text"
                value={editEntry.nome || ""}
                onChange={(e) =>
                  setEditEntry({ ...editEntry, nome: e.target.value })
                }
                className="input-field"
              />
              <label>Placa:</label>
              <input
                type="text"
                value={editEntry.placa || ""}
                onChange={(e) =>
                  setEditEntry({ ...editEntry, placa: e.target.value })
                }
                className="input-field"
              />
              <button type="submit" className="button">
                Salvar
              </button>
              <button type="button" className="button" onClick={closeEditModal}>
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
