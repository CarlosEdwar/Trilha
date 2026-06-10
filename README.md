# Raízes do Sul de Minas — Sistema de Pedidos

Aplicação React para sistema de pedidos de uma rede de lanchonetes, com design minimalista em verde e preto.

## Visão Geral

Protótipo funcional de um sistema de delivery com as seguintes características:

- **Design Minimalista**: Paleta de cores verde (#22C55E) e preto (#000000)
- **Mobile-First**: Layout otimizado para dispositivos móveis
- **Transições Suaves**: Animações discretas e elegantes
- **Dados Mockados**: Produtos, unidades e campanhas pré-configurados

## Funcionalidades

### 1. Autenticação
- Login e cadastro de usuários
- Credenciais demo disponíveis na tela de login
- Persistência de sessão via localStorage
- 50 pontos de boas-vindas no cadastro

### 2. Seleção de Unidades
Três unidades disponíveis no Sul de Minas:
- **Raízes Lambari** — Lambari
- **Raízes São Lourenço** — São Lourenço
- **Raízes Carmo** — Carmo de Minas

### 3. Cardápio Digital
- Filtragem por categoria (Burgers, Combos, Bebidas, Acompanhamentos, Sobremesas)
- Busca por nome ou descrição
- Badges indicativas ("Mais Pedido", "Top Combo", "Novidade")
- Adição/remoção de itens ao carrinho com feedback visual

### 4. Programa de Fidelidade — Clube Raízes
- Acumule 1 ponto a cada R$1,00 gasto
- Resgate: 50 pontos = R$5,00 de desconto
- Cada ponto vale R$0,10
- Exibição de pontos na navbar

### 5. Checkout e Pagamento
- Carrinho com controle de quantidade
- Cupons promocionais (ex: SERTAO20 — 20% OFF acima de R$40)
- Simulação de gateway de pagamento externo
- Métodos: Pix, Cartão, Dinheiro

### 6. Acompanhamento de Pedidos
- Timeline visual com 4 estágios:
  1. 📥 Pedido Recebido
  2. 👨‍🍳 Em Preparo
  3. ✅ Pronto
  4. 🛵 Entregue
- Progressão automática simulada
- Histórico de pedidos

## Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Navbar.jsx       # Barra de navegação
│   ├── ProtectedRoute.jsx # Proteção de rotas
│   └── Toast.jsx        # Notificações
├── context/             # Context API
│   ├── AuthContext.jsx  # Autenticação e pontos
│   ├── CartContext.jsx  # Carrinho e pedidos
│   ├── ChannelContext.jsx # Canal (Web/App/Totem)
│   └── ToastContext.jsx # Sistema de notificações
├── data/
│   └── seed.js          # Dados mockados
├── pages/               # Páginas
│   ├── AuthPage.jsx     # Login/Cadastro
│   ├── UnitSelectPage.jsx # Seleção de unidade
│   ├── MenuPage.jsx     # Cardápio
│   ├── CheckoutPage.jsx # Finalização
│   └── TrackingPage.jsx # Acompanhamento
├── App.jsx              # Rotas e providers
└── index.css            # Estilos globais
```

## Tecnologias

- **React 19** — Biblioteca UI
- **React Router DOM 6** — Navegação
- **Tailwind CSS 3** — Estilização
- **Lucide React** — Ícones
- **Vite** — Build tool
- **localStorage** — Persistência

## Como Executar

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview
npm run preview
```

## Fluxo de Uso

1. **Login** → Acesse `/auth` com credenciais demo (`demo@raizes.com` / `123456`)
2. **Unidade** → Escolha uma das 3 unidades
3. **Cardápio** → Navegue, busque e adicione itens
4. **Checkout** → Revise, aplique cupom/pontos, pague
5. **Tracking** → Acompanhe o status do pedido

## Design System

### Cores
- **Primária**: Verde (#22C55E)
- **Superfície**: Preto (#000000)
- **Card**: Preto suave (#0A0A0A)
- **Borda**: Branco transparente (6%)

### Tipografia
- **Família**: Inter
- **Pesos**: 400, 500, 600, 700

### Princípios
- Minimalismo visual
- Contraste adequado
- Transições sutis (250-300ms)
- Mobile-first

## Projeto Acadêmico

Este é um protótipo para fins educacionais. Dados e funcionalidades de pagamento são simulados.
