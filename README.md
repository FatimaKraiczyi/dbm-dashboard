# DBM Dashboard

Painel web que ilustra a operação de um help desk, permitindo que perfis administrativos e técnicos acompanhem chamados, clientes e serviços adicionais de forma integrada.

## 💡 Ideia da solução
- Demonstrar uma arquitetura modular inspirada em Clean Architecture (camadas domain, data, infra, presentation e main).
- Simular integrações através de repositórios em memória, preservando atenção na experiência de usuário e nas regras de domínio.
- Reforçar padrões de UI consistentes usando Material UI, componentes reutilizáveis e tipagem forte com TypeScript.

## 🧰 Tecnologias utilizadas
- React 19 + React Router 7 para composição de páginas e roteamento declarativo.
- TypeScript estrito com path alias `@/*` para imports legíveis.
- Vite 7 como bundler/dev server.
- Material UI 7 + Emotion para componentes visuais, tema customizado e estilização.
- ESLint (`@eslint/js`, `@stylistic/eslint-plugin`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`) para qualidade de código.

## 📂 Arquitetura em camadas
- `domain`: modelos tipados (`Ticket`, `Client`, `User`) e contratos dos casos de uso.
- `data`: orquestra a lógica de cada caso de uso (listar, atualizar status, adicionar/remover serviços adicionais).
- `infra`: stores baseados em `localStorage`, com atrasos artificiais para simular chamadas assíncronas e persistência entre sessões.
- `presentation`: componentes React, hooks (`useTicketList`, `useTicketDetail`, `useClientList`), contextos e páginas.
- `main`: bootstrap da aplicação, factories e configuração de rotas protegidas.


## ✅ Pré-requisitos
- Node.js 20+
- npm 9+ **ou** Yarn 1.22+

## 🚀 Como executar
```bash
# npm
npm install
npm run dev

# Yarn
yarn install
yarn dev
```