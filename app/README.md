# Mini App Node.js - Hello World

Mini aplicacao Node.js para laboratorio com Docker e Kubernetes.

## Estrutura

- `index.js`: servidor HTTP que responde "Hello World from Node.js!"
- `package.json`: scripts e metadados do projeto
- `Dockerfile`: imagem da aplicacao
- `.dockerignore`: arquivos ignorados no build da imagem

## Pre-requisitos

- Docker Desktop (ou Docker Engine + CLI) para build e execucao em container

## Como rodar (Docker)

### 1) Build da imagem

```bash
docker build -t aula1-dataside-lab .
```

### 2) Executar container

```bash
docker run --rm -p 3000:3000 --name aula1-dataside-container aula1-dataside-lab
```

### 3) Testar aplicacao

Abra no navegador:

- [http://localhost:3000](http://localhost:3000)

Ou teste por terminal:

```bash
curl http://localhost:3000
```

## Comandos uteis

Listar containers em execucao:

```bash
docker ps
```

Parar container em execucao:

```bash
docker stop <container_id>
```

Acessar o terminal do container em execucao:

```bash
docker exec -it aula1-dataside-container sh
```

## Observacoes para laboratorio Kubernetes

- Esta aplicacao expoe a porta `3000`.
- O `Dockerfile` usa `node:20-alpine` para manter a imagem leve.
- Para usar no Kubernetes, publique a imagem em um registry (Docker Hub, ECR, ACR etc.) e atualize o `deployment.yaml`.
