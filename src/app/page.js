"use client";
import React, { useState, useEffect } from 'react';
import './App.css';
import ModalEntrada from './components/modal/modalEntrada';
import ModalPrecos from './components/modal/modal';

function App() {
  const [showModalPrecos, setShowModalPrecos] = useState(false);
  const [showModalEntrada, setShowModalEntrada] = useState(false);
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
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch('/api/estacionamento');
        const data = await response.json();
        setEntries(data);
      } catch (error) {
        console.error('Erro ao buscar entradas:', error);
      }
    };
    fetchEntries();
  }, []);

  const openModalPrecos = () => setShowModalPrecos(true);
  const closeModalPrecos = () => setShowModalPrecos(false);
  const openModalEntrada = () => setShowModalEntrada(true);
  const closeModalEntrada = () => setShowModalEntrada(false);

  const handleSavePrices = (untilOneHour, afterOneHour) => {
    setPrices({ untilOneHour, afterOneHour });
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/estacionamento?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== id));
      } else {
        alert('Erro ao excluir a entrada');
      }
    } catch (error) {
      console.error('Erro na solicitação de exclusão:', error);
      alert('Erro ao excluir a entrada');
    }
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
        openModalEntrada();

        setCustomerName('');
        setVehiclePlate('');
        setPrices({
          untilOneHour: '',
          afterOneHour: '',
        });

        setEntries((prevEntries) => [...prevEntries, data]);
      } else {
        alert('Erro ao salvar os dados');
      }
    } catch (error) {
      alert('Erro na solicitação: ' + error.message);
    }
  };

  return (
    <div className="main-container">
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

      <ModalPrecos
        showModal={showModalPrecos}
        savePrices={handleSavePrices}
        closeModal={closeModalPrecos}
      />

      <ModalEntrada
        showModal={showModalEntrada}
        modalInfo={modalInfo}
        closeModal={closeModalEntrada}
      />

      <div className="scroll-view">
        {entries.map((entry) => (
          <div key={entry.id} className="entry-item">
            <div className="entry-details">
              <span>Nome: {entry.nome}</span>
              <span>Placa: {entry.placa}</span>
              <span>Data: {entry.data}</span>
              <span>Hora: {entry.hora}</span>
            </div>
            <div className="entry-actions">
              <button className="icon-button green">✔</button>
              <button className="icon-button edit">✏</button>
              <button className="icon-button red" onClick={() => handleDelete(entry.id)}>🗑</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
