# Projeto: Painel de Transparência Municipal

Este projeto é uma aplicação React com Bootstrap que permite visualizar indicadores de transparência com gráficos, tabelas e um cronograma Gantt interativo.

## Componentes principais:
- Upload de CSV com os dados dos critérios de transparência.
- Indicadores em cards (atendidos, não atendidos, parcialmente).
- Gráficos interativos (Pareto, Radar, Boxplot, etc.).
- Tabela detalhada dos critérios.
- Cronograma Gantt com modo fullscreen.

---

## REQUISITOS

- **Node.js**: v18.x ou superior (recomendado: v18.18.0 LTS)
- **npm** (Node Package Manager): v9.x ou superior
- **Navegador moderno** (Chrome, Edge, Firefox)

---

## INSTALAÇÃO E EXECUÇÃO

1. Clone este repositório ou extraia o projeto em uma pasta local:

   ```bash
   git clone <url-do-repositorio>
   # ou
   descompacte os arquivos.
   ```

2. Acesse a pasta do projeto via terminal:

   ```bash
   cd nome-do-projeto
   ```

3. Instale as dependências necessárias:

   ```bash
   npm install
   ```

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

5. Acesse a aplicação:

   Abra o navegador em: [http://localhost:5173](http://localhost:5173)

---

## ESTRUTURA DO PROJETO

```
- src/
  - components/
    - CSVUploader.jsx
    - IndicadoresCards.jsx
    - DashboardSummary.jsx
    - DataTable.jsx
    - SecretariaRadar.jsx
    - ParetoChart.jsx
    - BoxplotAtendimentoPorSecretaria.jsx
    - DispersaoPorCompetencia.jsx
    - GanttChart.jsx
    - (etc.)
  - App.jsx
  - App.css
- public/
  - favicon, index.html, etc.
- package.json
- vite.config.js (Vite usado como bundler)
```

---

## OBSERVAÇÕES IMPORTANTES

- O projeto utiliza o **Vite** para desenvolvimento rápido.
- A biblioteca de gráficos Gantt usada é **react-google-charts**.
- O cronograma Gantt possui suporte a fullscreen e scroll automático.
- Dados devem ser fornecidos via upload de CSV no formato esperado.

---

## CONTATO

**Dúvidas ou sugestões?**  
Entre em contato com a equipe de desenvolvimento.