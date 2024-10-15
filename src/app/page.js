import React from 'react';
import './App.css'; // Certifique-se de criar o arquivo CSS



function App() {
  return (


    <div className="container">
      <div className="form-container">
        <h1 className="title">Park Car</h1>
        <form>
          <input
            type="text"
            placeholder="Nome completo"
            className="input-field"
          />
          <input
            type="text"
            placeholder="Placa do veículo"
            className="input-field"
          />
          <button type="button" className="button" >
            Preços
          </button>
          <button type="submit" className="button">
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
