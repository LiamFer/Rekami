# Rekami

**Rekami** é um aplicativo focado em fornecer **recomendações inteligentes de animes e mangás** para os usuários, combinando uma experiência de autenticação moderna com um sistema inteligente de sugestões. O nome vem da junção de "Recomendações" + "Animes/Mangás".

---

## 📌 Objetivo

Criar uma plataforma onde os usuários possam:

- Se autenticar usando métodos modernos (incluindo Google OAuth).
- Receber recomendações personalizadas de animes e mangás com base em suas preferências e histórico.
- Interagir com um backend robusto em NestJS.
- Contar com um microserviço em Python (em desenvolvimento) para gerar as recomendações utilizando Machine Learning/NLP.

---

## 🧠 Tecnologias Utilizadas

### Backend (`/Server/Backend`)
- **NestJS** (Framework principal do backend)
- **TypeScript**
- **JWT** (para autenticação com tokens)
- **OAuth2 com Google** (login via conta Google)
- **Redis** (cache e armazenamento de tokens de refresh)
- **Cloudinary** (armazenamento de imagens)
- **TypeORM** (mapeamento do banco de dados relacional)
- **PostgreSQL** (banco de dados relacional)
- **Podman** (Containerizar Redis e Postgres)
- **Jinkan** – Biblioteca para buscar dados detalhados de animes e mangás a partir de diversas fontes (MyAnimeList, Anilist, etc.)

### Microserviço de Recomendação (`/Server/Microservices`)
- **Python** (ainda em desenvolvimento)
- **FastAPI** (será o framework principal para expor a API de recomendação)
- **Scikit-learn / Pandas / Numpy** (para lógica de recomendação com Machine Learning)
- **NLP** para interpretar gostos e tags dos animes/mangás

---

## 📂 Estrutura de Pastas

```bash
Rekami
├─ LICENSE
├─ README.md
└─ Server
   ├─ Backend
   │  ├─ src
   │  │  ├─ Config/              # Configurações de JWT e tokens de refresh
   │  │  ├─ Database/            # Módulo e entidades do banco de dados
   │  │  ├─ DTO/                 # Data Transfer Objects (DTOs)
   │  │  ├─ guards/              # Guards para autenticação (JWT, Google, etc.)
   │  │  ├─ Modules/
   │  │  │  ├─ Auth/             # Lógica de autenticação
   │  │  │  ├─ Redis/            # Módulo Redis
   │  │  │  ├─ User/             # Lógica relacionada a usuários
   │  │  │  └─ Cloudinary/       # Upload de imagens para Cloudinary
   │  │  ├─ Strategies/          # Estratégias de autenticação (JWT, Google, etc.)
   │  │  ├─ utils/               # Utilitários como manipuladores de resposta
   │  │  └─ main.ts              # Arquivo principal do app
   │  ├─ dist/                   # Código transpilado (JS)
   │  ├─ .env                    # Variáveis de ambiente
   │  ├─ database.sh             # Script para iniciar/configurar banco
   │  ├─ package.json            # Dependências e scripts
   │  └─ tsconfig.json           # Configuração do TypeScript
   └─ Microservices
       └─ (em desenvolvimento)
```

## 🔐 Autenticação

A aplicação suporta:

- Login tradicional (e-mail/senha)
- Login via Google com OAuth2
- Tokens JWT para autenticação de sessão
- Tokens de refresh armazenados no Redis para manter sessões ativas de forma segura

---

## 🤖 Recomendação

O sistema de recomendação será fornecido por um **microserviço em Python** que irá:

- Receber as preferências e histórico dos usuários
- Processar dados com algoritmos de aprendizado de máquina
- Retornar uma lista personalizada de animes e mangás recomendados
- Comunicar-se com o backend principal via API REST


