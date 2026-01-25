# 🛡️ LemurLog - Sistema de Autenticação & Auditoria

O **LemurLog** é uma plataforma Full Stack robusta desenvolvida para gerenciamento de usuários e controle de acesso. O projeto utiliza as versões mais recentes do ecossistema Node.js, com foco em segurança, performance e escalabilidade.



## 🚀 Tecnologias

### Backend (API)
- **NestJS**: Framework progressivo para Node.js focado em arquitetura modular.
- **Prisma 7**: ORM de última geração com suporte nativo a Query Compiler.
- **PostgreSQL**: Banco de dados relacional robusto.
- **JWT (JSON Web Tokens)**: Autenticação baseada em tokens.
- **Bcrypt**: Criptografia avançada para hashing de senhas.

### Frontend
- **React 18**: Biblioteca líder para construção de interfaces.
- **TypeScript**: Tipagem estática para maior segurança no desenvolvimento.
- **Vite**: Ferramenta de build e servidor de desenvolvimento ultra-rápido.
- **Tailwind CSS**: Estilização moderna e responsiva.
- **Lucide React**: Biblioteca de ícones elegantes.

---

## 🛠️ Configuração e Instalação

### Pré-requisitos
- Node.js (v20.x ou superior)
- PostgreSQL (rodando localmente ou via Docker)

### 1. Preparação do Banco de Dados
No diretório `backend`, configure seu arquivo `.env`:
```env
DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/NOME_DO_BANCO?schema=public"
JWT_SECRET="sua_chave_secreta_aqui"