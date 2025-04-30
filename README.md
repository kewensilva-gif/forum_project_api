# Forum Project API

API RESTful para um sistema de fórum de perguntas e respostas, desenvolvida com [NestJS](https://nestjs.com/) e [Prisma ORM](https://www.prisma.io/), com suporte a autenticação, usuários, perguntas e respostas. O banco de dados utilizado é o PostgreSQL, acessível localmente ou via Docker.

---

## 🧾 Funcionalidades

- Cadastro e autenticação de usuários com JWT
- Criação de perguntas e respostas
- Relacionamentos entre usuários, perguntas e respostas
- Validações com [`class-validator`](https://github.com/typestack/class-validator)
- Documentação automática da API com [`Swagger`](https://swagger.io/) via NestJS
- Integração com Prisma ORM
- Suporte a Docker e Docker Compose

---

## 🧱 Tecnologias

- **NestJS** (estrutura do projeto)
- **Prisma ORM** (acesso ao banco de dados)
- **PostgreSQL** (persistência dos dados)
- **JWT** (autenticação)
- **Docker** (ambiente de execução)
- **Swagger** (documentação de API)
- **class-validator** (validações de DTOs)
- **TypeScript**

---

## 📦 Instalação sem Docker

### 1. Clone o projeto

```bash
git clone https://github.com/kewensilva-gif/forum_project_api
cd forum_project_api
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o ambiente

Crie um arquivo `.env` na raiz com o seguinte conteúdo:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/forum_db?schema=public"
```

> Certifique-se de que o PostgreSQL esteja rodando localmente e o banco `forum_db` exista.

### 4. Rode as migrações e gere o cliente do Prisma

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Inicie o servidor

```bash
npm run start:dev
```

A API estará disponível em:  
📍 `http://localhost:3000`

A documentação Swagger estará em:  
📘 `http://localhost:3000/api`

---

## 🐳 Instalação com Docker

### 1. Configure seu `.env`

```env
DATABASE_URL="postgresql://postgres:postgres@db:5432/forum_db?schema=public"
```

### 2. Execute os containers

```bash
docker compose up --build
```

- API: `http://localhost:4000`
- Swagger: `http://localhost:4000/api`
- PostgreSQL: `localhost:5432`

---

## 📁 Estrutura de Pastas

```
src/
├── auth/             # Módulo de autenticação (login/registro com JWT)
├── users/            # Módulo de usuários
├── questions/        # Módulo de perguntas
├── answers/          # Módulo de respostas
├── main.ts           # Ponto de entrada
```

---

## 🔍 Scripts úteis

```bash
npm run start           # Inicia a aplicação
npm run start:dev       # Inicia em modo de desenvolvimento
npm run build           # Compila o projeto
npm run format          # Formata o código
npm run test            # Executa os testes unitários
```

---

## 🛠 Requisitos

- Node.js >= 20
- PostgreSQL (se rodar localmente)
- Docker (se preferir containerizar)

---

## 📚 Prisma

Alguns comandos úteis:

```bash
npx prisma generate          # Gera cliente Prisma
npx prisma migrate dev       # Executa migrações no banco local
npx prisma studio            # Abre interface visual do Prisma
```

---

## 📖 Swagger

Após iniciar o projeto, acesse a documentação da API interativa via Swagger em:

```
http://localhost:3000/api
```

Se estiver usando Docker:

```
http://localhost:4000/api
```

---

## ✍️ Licença

Distribuído sob a licença [MIT](./LICENSE). Veja `LICENSE` para mais informações.

---

## 🤝 Contribuições

Pull requests são bem-vindos. Para grandes mudanças, por favor abra uma issue primeiro para discutir o que você gostaria de mudar.