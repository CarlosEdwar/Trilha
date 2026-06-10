# Raízes do Nordeste - Sistema de Pedidos

Aplicação React para sistema de pedidos de uma rede de lanchonetes, proposto como trabalho da trilha Frontend.

## Requisitos Implementados

### 1. Cadastro e Autenticação de Usuários
- **Localização**: `/auth`
- **Funcionalidades**:
  - Registro de novos usuários com nome, e-mail e senha
  - Login com validação de credenciais
  - Persistência de sessão via localStorage
  - Proteção de rotas privadas (ProtectedRoute)
  - 50 pontos de boas-vindas no cadastro

### 2. Visualização de Cardápio por Unidade
- **Localização**: `/menu`
- **Funcionalidades**:
  - Seleção de unidade antes de acessar o cardápio (`/`)
  - Filtragem dinâmica de produtos por unidade selecionada
  - Busca por nome ou descrição de produtos
  - Filtro por categorias (Burgers, Combos, Bebidas, Acompanhamentos, Sobremesas)
  - Exibição de badges ("Mais Pedido", "Top Combo", "Novidade")
  - Adição/remoção de itens ao carrinho com feedback visual

### 3. Realização de Pedidos (Fluxo Completo)
- **Localização**: `/checkout`
- **Funcionalidades**:
  - Visualização completa do carrinho
  - Controle de quantidade por item
  - Aplicação de cupons promocionais (ex: SERTAO20)
  - Cálculo automático de descontos
  - Resumo de valores (subtotal, descontos, total)

### 4. Programa de Fidelização (Pontos, Descontos e Benefícios)
- **Implementação**: Clube Raízes
- **Funcionalidades**:
  - Acumulo de pontos: 1 ponto por R$1,00 gasto
  - Resgate de pontos: 50 pontos = R$5,00 de desconto
  - Cada ponto vale R$0,10
  - Exibição de pontos na Navbar
  - Opção de usar pontos no checkout
  - Histórico de pontos persistido no localStorage
  - Pontos de boas-vindas (50 pts)

### 5. Promoções e Campanhas
- **Dados**: `src/data/seed.js` - CAMPAIGNS
- **Funcionalidades**:
  - Banner de campanhas visível no cardápio
  - Cupons com código, percentual de desconto e valor mínimo
  - Validação de cupom no checkout
  - Exemplo ativo: `SERTAO20` - 20% OFF em pedidos acima de R$40,00

### 6. Solicitação de Pagamento por Serviço Externo (Simulado)
- **Localização**: `/checkout`
- **Implementação**:
  - Modal simulando gateway de pagamento externo
  - Estados visuais: "Processando..." → "Pagamento Aprovado"
  - Delay simulado de 2.5s para processamento
  - Ícones e mensagens que representam integração externa
  - Métodos de pagamento: Pix, Cartão, Dinheiro
  - **Nota**: Não há processamento real de pagamento, apenas representação do fluxo

### 7. Acompanhamento do Status do Pedido
- **Localização**: `/tracking`
- **Funcionalidades**:
  - Timeline visual com 4 estágios:
    1. 📥 Pedido Recebido
    2. 👨‍🍳 Em Preparo
    3. ✅ Pronto
    4. 🛵 Entregue
  - Progressão automática simulada com delays configuráveis
  - Exibição de histórico de pedidos
  - Detalhes do pedido (itens, unidade, horário, valor)
  - Ordenação por data (mais recentes primeiro)

### 8. Conformidade Explícita com a LGPD
- **Localização**: `/lgpd`
- **Página Completa de Privacidade**:
  - Compromisso com privacidade dos dados
  - Princípios da LGPD seguidos (Finalidade, Transparência, Necessidade, Segurança)
  - Dados coletados explicitados (Cadastro, Pedidos, Navegação)
  - Direitos do titular (Art. 18): Acesso, Correção, Exclusão, Portabilidade, Revogação
  - Canais para exercer direitos (e-mail, telefone, endereço)
  - Bases legais para tratamento (Consentimento, Execução de Contrato, Legítimo Interesse)
  - Link acessível via ícone de escudo (🛡️) na Navbar

## Arquitetura do Projeto

### Estrutura de Diretórios
```
src/
├── components/          # Componentes reutilizáveis
│   ├── Navbar.jsx       # Barra de navegação com links e informações do usuário
│   ├── ProtectedRoute.jsx # HOC para proteção de rotas
│   └── Toast.jsx        # Notificações toast
├── context/             # Context API para estado global
│   ├── AuthContext.jsx  # Autenticação e pontos de fidelidade
│   ├── CartContext.jsx  # Carrinho, pedidos e status
│   ├── ChannelContext.jsx # Detecção de canal (Web/App/Totem)
│   └── ToastContext.jsx # Sistema de notificações
├── data/
│   └── seed.js          # Dados centrais (unidades, produtos, campanhas)
├── pages/               # Páginas da aplicação
│   ├── AuthPage.jsx     # Login/Cadastro
│   ├── UnitSelectPage.jsx # Seleção de unidade
│   ├── MenuPage.jsx     # Cardápio completo
│   ├── CheckoutPage.jsx # Finalização com pagamento simulado
│   ├── TrackingPage.jsx # Acompanhamento de pedidos
│   └── LGPDPage.jsx     # Página de conformidade LGPD
├── App.jsx              # Rotas e providers
└── index.css            # Estilos globais Tailwind
```

### Tecnologias Utilizadas
- **React 19** - Biblioteca UI
- **React Router DOM 6** - Navegação e rotas
- **Tailwind CSS 3** - Estilização
- **Lucide React** - Ícones
- **Vite** - Build tool
- **localStorage** - Persistência de dados

## Como Executar

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview da build
npm run preview
```

## Fluxo de Uso

1. **Acesso Inicial** → Redirecionado para `/auth`
2. **Cadastro/Login** → Preenche formulário e autentica
3. **Seleção de Unidade** → Escolhe uma das 4 unidades
4. **Cardápio** → Navega, busca e adiciona itens ao carrinho
5. **Checkout** → Revisa pedido, aplica cupom/pontos, seleciona pagamento
6. **Pagamento Simulado** → Modal com loading e aprovação
7. **Tracking** → Acompanha status do pedido em tempo real simulado
8. **LGPD** → Acessa página de privacidade a qualquer momento via Navbar


## Projeto Acadêmico
