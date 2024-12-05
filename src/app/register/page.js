"use client";
import React, { useState, useEffect } from "react";
import "../css/App.css";

function App() {
  const [customerName, setCustomerName] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [prices, setPrices] = useState({
    untilOneHour: "",
    afterOneHour: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!customerName || !vehiclePlate || !prices.untilOneHour || !prices.afterOneHour) {
      alert("Preencha todos os campos antes de salvar.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/estacionamento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: customerName,
          placa: vehiclePlate,
          precoAteUmaHora: prices.untilOneHour,
          precoAposUmaHora: prices.afterOneHour,
        }),
      });

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        setCustomerName("");
        setVehiclePlate("");
        setPrices({ untilOneHour: "", afterOneHour: "" });
      } else {
        alert("Erro ao salvar os dados");
      }
    } catch (error) {
      console.error("Erro na solicitação:", error);
      alert("Erro ao salvar os dados");
    } finally {
      setIsLoading(false);
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
          <input
            type="number"
            value={prices.untilOneHour}
            onChange={(e) => setPrices({ ...prices, untilOneHour: e.target.value })}
            placeholder="Preço até 1 hora"
            className="input-field"
          />
          <input
            type="number"
            value={prices.afterOneHour}
            onChange={(e) => setPrices({ ...prices, afterOneHour: e.target.value })}
            placeholder="Preço após 1 hora"
            className="input-field"
          />
          <button type="submit" className="button">
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
