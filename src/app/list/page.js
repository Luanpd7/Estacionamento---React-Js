"use client";

import React, { useState, useEffect } from "react";
import "../css/App.css"; // Certifique-se de ajustar o caminho correto para o CSS
import ModalEntrada from "../components/modal/modalEntrada"; // Ajuste o caminho se necessário

export default function ConsultaPage() {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalInfo, setModalInfo] = useState(null);
  const [showModalEntrada, setShowModalEntrada] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editEntry, setEditEntry] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [qrCodeData, setQrCodeData] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  // Fetch dos dados
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

  // Ações de Detalhes
  const openModalEntrada = (entry) => {
    setModalInfo(entry);
    setShowModalEntrada(true);
  };

  const closeModalEntrada = () => {
    setShowModalEntrada(false);
    setModalInfo(null);
  };

  // Ações de Edição
  const openEditModal = (entry) => {
    setEditEntry(entry);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditEntry(null);
  };

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

  // Ações de Exclusão
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

  // Ações de Pagamento
  const openPaymentModal = (entry) => {
    setModalInfo(entry);
    setShowPaymentModal(true);
    setQrCodeData("");
    setSelectedPaymentMethod("");
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
  };

  const generateQrCode = () => {
    const paymentInfo = `Pagamento para ${modalInfo.nome} - Placa: ${modalInfo.placa}`;
    setQrCodeData(paymentInfo);
  };

  // Loading enquanto os dados não estão carregados
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
        {entries.length > 0 ? (
          entries.map((entry) => (
            <div key={entry.id} className="entry-item">
              <div className="entry-details">
                <span>Nome: {entry.nome}</span>
                <span>Placa: {entry.placa}</span>
                <span>Hora de Entrada: {entry.estacionamento?.horaEntrada || "N/A"}</span>
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
                  ✏
                </button>
                <button
                  className="icon-button red"
                  onClick={() => handleDelete(entry.id)}
                >
                  🗑
                </button>
                <button
                  className="icon-button payment"
                  onClick={() => openPaymentModal(entry)}
                >
                  💳
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhuma entrada encontrada.</p>
        )}
      </div>

      {/* Modal de Detalhes */}
      {showModalEntrada && modalInfo && (
        <ModalEntrada
          showModal={showModalEntrada}
          modalInfo={modalInfo}
          closeModal={closeModalEntrada}
        />
      )}

      {/* Modal de Edição */}
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

      {/* Modal de Pagamento */}
      {showPaymentModal && modalInfo && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Opções de Pagamento</h2>
            <p>
              Nome: {modalInfo.nome} <br />
              Placa: {modalInfo.placa}
            </p>
            <div className="payment-options">
              <button
                className="button"
                onClick={() => setSelectedPaymentMethod("Dinheiro")}
              >
                Dinheiro
              </button>
              <button className="button" onClick={generateQrCode}>
                Gerar QR Code
              </button>
            </div>
            {selectedPaymentMethod && (
              <p>
                Método Selecionado: <strong>{selectedPaymentMethod}</strong>
              </p>
            )}
            {qrCodeData && (
              <div className="qr-code-container">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
                    qrCodeData
                  )}&size=150x150`}
                  alt="QR Code"
                />
              </div>
            )}
            <button className="button" onClick={closePaymentModal}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
