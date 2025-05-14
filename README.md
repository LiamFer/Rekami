# 📚 Rekami

[![React](https://img.shields.io/badge/Frontend-React-%61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![NestJS](https://img.shields.io/badge/Backend-NestJS-E0234E?logo=nestjs&logoColor=white)](https://nestjs.com/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Cache-Redis-DC382D?logo=redis&logoColor=white)](https://redis.io/)
[![Podman](https://img.shields.io/badge/Container-Podman-89A1C8?logo=podman&logoColor=white)](https://podman.io/)
[![JWT](https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Cloudinary](https://img.shields.io/badge/Images-Cloudinary-3448C5?logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![Google OAuth](https://img.shields.io/badge/Auth-GoogleOAuth-4285F4?logo=google&logoColor=white)](https://developers.google.com/identity)
[![Python](https://img.shields.io/badge/Microservice-Python-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![Ant Design](https://img.shields.io/badge/UI-AntDesign-0170FE?logo=antdesign&logoColor=white)](https://ant.design/)
[![JikanAPI](https://img.shields.io/badge/API-Jikan-1B1F23?logo=graphql&logoColor=white)](https://jikan.moe/)

---

## ✨ Sobre o Projeto

**Rekami** é um aplicativo focado em fornecer **recomendações inteligentes de animes e mangás** para os usuários, combinando uma experiência de autenticação moderna com um sistema inteligente de sugestões.

- 🌐 **Frontend** em React com Ant Design.
- 🛠 **Backend** em NestJS com autenticação JWT + Refresh Token e Google OAuth.
- 🧠 **Recomendações** baseadas em interesses com um microserviço em Python.
- 🖼 **Fotos de perfil** armazenadas via Cloudinary.
- 📦 Banco de dados MongoDB e PostgreSQL, ambos containerizados com **Podman**.
- ⚡ Armazenamento de cache com Redis.
- 📡 Integração com **Jikan API** para obter dados sobre animes.

---

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


