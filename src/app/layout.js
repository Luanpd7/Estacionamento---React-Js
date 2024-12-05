"use client";
import "bootstrap/dist/css/bootstrap.min.css";

export default function RootLayout({ children }) {
  const metadata = {
    title: "Park Car - Gerenciamento de Estacionamento",
    description: "Sistema de gerenciamento de estacionamento em Next.js",
  };

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        <nav>
          <a href="/dashboard">Dashboard</a>
          <a href="/register">Cadastro</a>
          <a href="/list">Consulta</a>
        </nav>
        <main>{children}</main>
        <style jsx>{`
          nav {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background-color: #333;
            padding: 1rem;
            display: flex;
            justify-content: start;
            z-index: 1000;
            gap: 1rem;
          }

          nav a {
            color: white;
            text-decoration: none;
          }

          nav a:hover {
            text-decoration: underline;
          }
        `}</style>
      </body>
    </html>
  );
}
