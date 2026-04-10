const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const logoPath = path.join(__dirname, "logo-dataside.avif");
const logoImage = fs.readFileSync(logoPath);

const html = `
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hello World Time Dataside</title>
    <style>
      :root {
        --dataside-blue: #0d6efd;
        --dataside-dark: #0b1f3a;
        --dataside-light: #ffffff;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        font-family: Arial, Helvetica, sans-serif;
        background: linear-gradient(135deg, var(--dataside-dark), var(--dataside-blue));
        color: var(--dataside-light);
      }

      .card {
        width: min(92vw, 760px);
        padding: 48px 36px;
        border-radius: 20px;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
        text-align: center;
      }

      .logo {
        width: min(220px, 50vw);
        height: auto;
        margin-bottom: 22px;
        filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.35));
      }

      h1 {
        margin: 0 0 12px;
        font-size: clamp(2rem, 5vw, 3.5rem);
        letter-spacing: 0.5px;
      }

      .highlight {
        color: #9fd0ff;
      }

      p {
        margin: 0;
        font-size: clamp(1rem, 2vw, 1.2rem);
        opacity: 0.95;
      }
    </style>
  </head>
  <body>
    <main class="card">
      <img src="/logo-dataside.avif" alt="Logo Dataside" class="logo" />
      <h1>Hello World <span class="highlight">Time Dataside</span></h1>
      <p>Mini app Node.js para seu laboratorio de Docker e Kubernetes.</p>
    </main>
  </body>
</html>
`;

const server = http.createServer((req, res) => {
  if (req.url === "/logo-dataside.avif") {
    res.writeHead(200, { "Content-Type": "image/avif" });
    res.end(logoImage);
    return;
  }

  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(html);
});

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
