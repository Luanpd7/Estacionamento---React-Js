"use client";
import React, { useState } from 'react';
import './App.css';
import ModalEntrada from './components/modal/modalEntrada'; // Comprovante de entrada
import ModalPrecos from './components/modal/modal'; // Modal de preços

function App() {
  const [showModalPrecos, setShowModalPrecos] = useState(false); // Controla o modal de preços
  const [showModalEntrada, setShowModalEntrada] = useState(false); // Controla o modal de comprovante
  const [modalInfo, setModalInfo] = useState({
    nome: '',
    placa: '',
    data: '',
    hora: '',
    precoAteUmaHora: '',
    precoAposUmaHora: ''
  });

  const [customerName, setCustomerName] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [prices, setPrices] = useState({
    untilOneHour: '',
    afterOneHour: ''
  });

  // Abrir/Fechar modal de preços
  const openModalPrecos = () => {
    setShowModalPrecos(true);
  };

  const closeModalPrecos = () => {
    setShowModalPrecos(false);
  };

  // Abrir/Fechar modal de comprovante de entrada
  const openModalEntrada = () => {
    setShowModalEntrada(true);
  };

  const closeModalEntrada = () => {
    setShowModalEntrada(false);
  };

  // Atualizar os preços
  const handleSavePrices = (untilOneHour, afterOneHour) => {
    setPrices({ untilOneHour, afterOneHour });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!customerName || !vehiclePlate || !prices.untilOneHour || !prices.afterOneHour) {
      alert('Preencha todos os campos antes de salvar.');
      return;
    }

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('pt-BR');
    const formattedTime = currentDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    try {
      const response = await fetch('/api/estacionamento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: customerName,
          placa: vehiclePlate,
          precoAteUmaHora: prices.untilOneHour.replace(',', '.'),
          precoAposUmaHora: prices.afterOneHour.replace(',', '.'),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setModalInfo({
          nome: customerName,
          placa: vehiclePlate,
          data: formattedDate,
          hora: formattedTime,
          precoAteUmaHora: prices.untilOneHour,
          precoAposUmaHora: prices.afterOneHour,
        });
        openModalEntrada(); // Exibir o comprovante de entrada

        // Limpar os campos após salvar
        setCustomerName('');
        setVehiclePlate('');
        setPrices({
          untilOneHour: '',
          afterOneHour: '',
        });
      } else {
        alert('Erro ao salvar os dados');
      }
    } catch (error) {
      alert('Erro na solicitação: ' + error.message);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1 className="title">Park Car</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Nome completo"
            className="input-field"
          />
          <input
            type="text"
            value={vehiclePlate}
            onChange={(e) => setVehiclePlate(e.target.value)}
            placeholder="Placa do veículo"
            className="input-field"
          />
          <button type="button" className="button" onClick={openModalPrecos}>
            Preços
          </button>
          <button type="submit" className="button">
            Salvar
          </button>
        </form>
      </div>
  
      {/* Modal para definir os preços */}
      <ModalPrecos
        showModal={showModalPrecos}
        savePrices={handleSavePrices}
        closeModal={closeModalPrecos}
      />

      {/* Modal para exibir as informações do cliente e estacionamento */}
      <ModalEntrada
        showModal={showModalEntrada}
        modalInfo={modalInfo}
        closeModal={closeModalEntrada}
      />
    </div>
  );
}

export default App;
