"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [totalEstacionamentos, setTotalEstacionamentos] = useState(0);
  const [receitaDiaria, setReceitaDiaria] = useState(0);
  const router = useRouter(); // Certifique-se de importar o useRouter corretamente

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/estacionamento");
        if (!response.ok) throw new Error("Erro ao buscar dados");

        const data = await response.json();
        setTotalEstacionamentos(data.length);
        setReceitaDiaria(data.receitaDiaria); 
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <div
      className="container-fluid vh-100 d-flex flex-column p-3"
      style={{ backgroundColor: "#F1F2E9" }}
    >
      <h1 className="text-center mb-4">Estatísticas do Estacionamento</h1>

      <div className="row flex-grow-1">
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Total de Entradas</h5>
              <p className="card-text display-4 text-primary">
                {totalEstacionamentos}
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Vagas Disponíveis</h5>
              <p className="card-text display-4 text-success">
                {30 - totalEstacionamentos}
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Receita Diária</h5>
              <p className="card-text display-4 text-danger">
              R$ {(receitaDiaria || 0).toFixed(2).replace(".", ",")}
                </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="text-center mt-auto">
        <small>© 2024 Estacionamento Park Car</small>
      </footer>
    </div>
  );
}
