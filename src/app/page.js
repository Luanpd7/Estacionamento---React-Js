"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "1234") {
      localStorage.setItem("user", JSON.stringify({ username }));
      router.push("/dashboard"); // Redireciona para o dashboard após login
    } else {
      setErrorMessage("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f4f4f4" }}>
      <form onSubmit={handleLogin} style={{ background: "#fff", padding: "2rem", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", textAlign: "center", width: "100%", maxWidth: "300px" }}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ display: "block", margin: "1rem 0", padding: "0.5rem", width: "100%", border: "1px solid #ccc", borderRadius: "4px" }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: "block", margin: "1rem 0", padding: "0.5rem", width: "100%", border: "1px solid #ccc", borderRadius: "4px" }}
        />
        <button
          type="submit"
          style={{ padding: "0.5rem 1rem", backgroundColor: "#3498db", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Entrar
        </button>
        {errorMessage && <p style={{ color: "red", marginTop: "1rem" }}>{errorMessage}</p>}
      </form>
    </div>
  );
}


