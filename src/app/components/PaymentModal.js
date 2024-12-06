import React, { useState } from "react";
import ModalBase from "./modal/ModalBase";

function PaymentModal({ show, modalInfo, closeModal, valorTotal }) {
  const [valorRecebido, setValorRecebido] = useState(0);
  const [troco, setTroco] = useState(0);

  const handleValorRecebido = (e) => {
    const recebido = parseFloat(e.target.value) || 0;
    setValorRecebido(recebido);
    setTroco(recebido - valorTotal);
  };

  return (
    <ModalBase show={show} onClose={closeModal}>
      <h2>Pagamento em Dinheiro</h2>
      <p>
        Nome: {modalInfo?.nome} <br />
        Placa: {modalInfo?.placa}
      </p>
      <p>Valor Total: R$ {valorTotal.toFixed(2).replace(".", ",")}</p>
      <label htmlFor="valorRecebido">Valor Recebido:</label>
      <input
        type="number"
        id="valorRecebido"
        className="input-field"
        value={valorRecebido}
        onChange={handleValorRecebido}
      />
      <p>Troco: R$ {(troco > 0 ? troco : 0).toFixed(2).replace(".", ",")}</p>
      <button className="button" onClick={closeModal}>
        Fechar
      </button>
    </ModalBase>
  );
}

export default PaymentModal;
