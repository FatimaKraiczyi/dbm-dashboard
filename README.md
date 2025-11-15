# DBM Dashboard

Aplicação web desenvolvida com propósito de simular o acompanhamento de chamados e clientes.

## 💡 Ideia da solução
- Reproduzir uma visão de painel operacional com navegação lateral fixa.
- Exibir a lista de chamados com status, técnico responsável e valores formatados.
- Disponibilizar um detalhe completo do chamado com serviços adicionais e totais calculados dinamicamente.
- Incluir uma página de clientes com diálogo de edição para evidenciar o fluxo de estado e modais.
- Mockar integrações através de repositórios em memória para manter o foco na apresentação e na arquitetura.

## 🧰 Tecnologias utilizadas
- React 19 com React Router para roteamento da aplicação.
- TypeScript no modo estrito e path alias `@/*` para imports curtos.
- Vite como bundler e dev server.
- Material UI 7 + Emotion para UI e theming.
- ESLint (`@eslint/js`, `@stylistic`, hooks) para padronizar o código.

## 🎯 O que a solução demonstra
- Separação em camadas (`domain`, `data`, `infra`, `presentation`, `main`) inspirada em Clean Architecture.
- Hooks e contextos próprios (`useTickets`, `TicketProvider`) para encapsular estado assíncrono.
- Componentes reutilizáveis (DataTable, StatusBadge, Layout/Sidebar) com estilização consistente.
- Simulação de cenários assíncronos via datasources mockados com atraso artificial.

## 📂 Estrutura resumida
```
src/
├── domain        # Modelos e contratos de casos de uso
├── data          # Implementações dos casos de uso
├── infra         # Repositórios e datasources em memória
├── presentation  # Componentes React, páginas, hooks, estilos
└── main          # Bootstrap, tema e roteamento
```

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