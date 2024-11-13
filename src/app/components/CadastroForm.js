import React, { useState } from "react";

const CadastroForm = () => {
  const [formData, setFormData] = useState({
    number: "",
    occupied: false,
    establishmentId: "",
    inPCD: false,
  });

  // Função para atualizar os valores dos campos
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar os dados
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Number:</label>
        <input
          type="text"
          name="number"
          value={formData.number}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Occupied:</label>
        <input
          type="checkbox"
          name="occupied"
          checked={formData.occupied}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Establishment ID:</label>
        <input
          type="number"
          name="establishmentId"
          value={formData.establishmentId}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>PCD (Pessoa com Deficiência):</label>
        <input
          type="checkbox"
          name="inPCD"
          checked={formData.inPCD}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default CadastroForm;
