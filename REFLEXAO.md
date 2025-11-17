# Reflexão sobre o Projeto

## 1. Como você entende o papel dos componentes no React e de que forma o estado influencia a comunicação entre eles?

Componentes são peças reutilizáveis da interface. O estado é o que permite que eles "conversem", quando o estado muda, os componentes dependentes se atualizam. A comunicação acontece através de props (pai → filho) e callbacks (filho → pai). No dashboard, uso Context (`SessionProvider`) para compartilhar o estado do usuário logado entre componentes distantes sem precisar passar props manualmente.

## 2. O que são componentes no React e por que é importante quebrar a interface em partes menores?

Componentes são funções que retornam pedaços de UI. Quebrar em partes menores facilita a manutenção, reutilização e colaboração. No projeto, componentes como `StatusBadge` e `DataTable` aparecem em vários lugares, cada um com uma responsabilidade clara, tornando o código mais organizado e fácil de debugar.

## 3. O que são Hooks e qual a diferença entre useState e useEffect?

Hooks são funções que adicionam funcionalidades a componentes funcionais. `useState` guarda valores que podem mudar (ex: texto digitado em um campo). `useEffect` executa ações após a renderização (ex: buscar dados de uma API). No `useTicketDetail`, uso `useState` para o estado do ticket e `useEffect` para carregá-lo quando o ID muda.
