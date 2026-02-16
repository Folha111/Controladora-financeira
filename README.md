# Monetix

Aplicativo web de **gestao financeira pessoal** construido com React e TypeScript. Permite controlar receitas, despesas, investimentos, orcamentos e metas financeiras de forma simples e intuitiva.

## Funcionalidades

- **Dashboard** — Visao geral com cards de resumo (receitas, despesas, saldo, investimentos) e graficos interativos
- **Transacoes** — Cadastro, edicao e exclusao de receitas e despesas com categorizacao
- **Investimentos** — Acompanhamento de acoes, renda fixa, fundos, criptomoedas e imoveis com calculo de rentabilidade
- **Orcamentos** — Definicao de limites mensais por categoria com alerta de estouro
- **Metas** — Criacao de objetivos financeiros com acompanhamento de progresso
- **Relatorios** — Relatorios detalhados com exportacao em PDF e CSV
- **Autenticacao** — Login com protecao por senha e persistencia de sessao
- **Configuracoes** — Alteracao de senha e limpeza de dados

## Stack Tecnologica

| Camada | Tecnologias |
|---|---|
| **Framework** | React 19, TypeScript 5.9, Vite 7 |
| **Estado** | Zustand 5 |
| **Estilizacao** | Tailwind CSS 4, shadcn/ui, Radix UI |
| **Graficos** | Chart.js, react-chartjs-2 |
| **Roteamento** | React Router DOM 7 |
| **Exportacao** | jsPDF, jspdf-autotable |
| **Utilitarios** | date-fns, uuid, Lucide React (icones) |

## Pre-requisitos

- [Node.js](https://nodejs.org/) >= 18
- npm >= 9

## Instalacao e Execucao

```bash
# Clonar o repositorio
git clone <url-do-repositorio>
cd monetix

# Instalar dependencias
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

O app estara disponivel em `http://localhost:5173`.

### Credenciais padrao

| Usuario | Senha |
|---|---|
| `admin` | `123` |

## Scripts Disponiveis

| Comando | Descricao |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento com HMR |
| `npm run build` | Compila TypeScript e gera o bundle de producao em `/dist` |
| `npm run preview` | Serve o build de producao localmente |
| `npm run lint` | Executa o ESLint para verificar qualidade do codigo |

## Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── ui/              # Componentes reutilizaveis (shadcn/ui)
│   ├── layout/          # Shell, Sidebar, Header, MobileNav
│   ├── dashboard/       # Cards e graficos do dashboard
│   ├── transactions/    # CRUD de transacoes
│   ├── investments/     # Gestao de investimentos
│   ├── budgets/         # Gestao de orcamentos
│   ├── goals/           # Gestao de metas
│   ├── reports/         # Relatorios e exportacao
│   └── shared/          # Componentes compartilhados
├── pages/               # Paginas da aplicacao
├── store/               # Stores Zustand (estado global)
├── hooks/               # Custom hooks por dominio
├── services/            # Camada de servicos (mock)
│   ├── mock/            # Implementacoes mock
│   ├── reportExport/    # Exportacao PDF/CSV
│   └── interfaces/      # Contratos dos servicos
├── mocks/               # Dados de exemplo
├── types/               # Definicoes de tipos TypeScript
└── utils/               # Funcoes utilitarias (calculos, formatacao)
```

## Arquitetura

A aplicacao segue uma arquitetura em camadas:

```
Pages → Custom Hooks → Zustand Store → Service Layer → Dados (in-memory)
```

- **Pages** — Componentes de pagina que orquestram a UI
- **Hooks** — Encapsulam logica de estado e inicializacao por dominio
- **Stores** — Gerenciamento de estado global com Zustand
- **Services** — Abstracoes para operacoes de dados (preparadas para integracao com backend)
- **Dados** — Armazenamento em memoria com localStorage para autenticacao

## Rotas

| Rota | Pagina |
|---|---|
| `/` | Dashboard |
| `/transacoes` | Transacoes |
| `/investimentos` | Investimentos |
| `/orcamentos` | Orcamentos |
| `/metas` | Metas |
| `/relatorios` | Relatorios |
| `/configuracoes` | Configuracoes |

## Modelos de Dados

### Transacao
- `id`, `type` (income/expense), `category`, `description`, `amountCents`, `date`, `createdAt`

### Investimento
- `id`, `type` (stocks/fixed_income/funds/crypto/real_estate/other), `name`, `amountCents`, `currentValueCents`, `date`, `createdAt`

### Orcamento
- `id`, `category`, `limitCents`, `month` (YYYY-MM)

### Meta
- `id`, `title`, `targetCents`, `currentCents`, `deadline`, `createdAt`

> Valores monetarios sao armazenados em **centavos** (`amountCents`) para evitar problemas de precisao com ponto flutuante.

## Build de Producao

```bash
npm run build
```

O bundle otimizado sera gerado na pasta `/dist`, pronto para deploy em qualquer servidor de arquivos estaticos (Vercel, Netlify, etc.).

## Licenca

Este projeto e de uso privado.
