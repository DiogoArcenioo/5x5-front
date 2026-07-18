# 5x5 Front

Frontend Next.js do 5x5. Ele serve o jogo e o painel administrativo e encaminha `/api/*` ao backend Nest.

## Desenvolvimento

Com o backend rodando na porta `3000`:

```powershell
npm install
npm run dev
```

Abra `http://localhost:3001`. A variável `BACKEND_URL` está definida em `.env.local` para o ambiente local.

O healthcheck próprio do frontend está disponível em `http://localhost:3001/health`.

## Produção

Variáveis necessárias:

```dotenv
BACKEND_URL=http://servico-backend:3000
```

O login administrativo é validado pelo backend usando os usuários e sessões armazenados no PostgreSQL. O Dockerfile gera a saída standalone do Next e expõe a porta `3001`.
