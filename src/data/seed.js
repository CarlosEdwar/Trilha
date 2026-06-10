/* Dados centrais — unidades, categorias e produtos da rede Raízes do Sul de Minas */
export const UNITS = [
  { id: 'lambari',     name: 'Raízes Lambari',     city: 'Lambari',           address: 'Rua Comendador Gomes, 150 — Centro', phone: '(35) 3000-1001', hours: '10h–22h' },
  { id: 'saolourenco', name: 'Raízes São Lourenço', city: 'São Lourenço',      address: 'Av. Delfim Moreira, 320',          phone: '(35) 3000-1002', hours: '10h–22h' },
  { id: 'carmo',       name: 'Raízes Carmo',        city: 'Carmo de Minas',    address: 'Rua do Rosário, 88',               phone: '(35) 3000-1003', hours: '11h–23h' },
];

export const CATEGORIES = [
  { id: 'burgers',  label: 'Burgers',   icon: '🍔' },
  { id: 'combos',   label: 'Combos',    icon: '🎯' },
  { id: 'drinks',   label: 'Bebidas',   icon: '🥤' },
  { id: 'sides',    label: 'Acompanhamentos', icon: '🍟' },
  { id: 'desserts', label: 'Sobremesas', icon: '🍨' },
];

export const CAMPAIGNS = [
  { 
    id: 'c1', 
    title: 'Festival do Sertão', 
    description: 'Use o cupom SERTAO20 e ganhe 20% de desconto em qualquer pedido acima de R$ 40,00!', 
    code: 'SERTAO20', 
    minAmount: 40, 
    discountPercent: 20 
  }
];

export const PRODUCTS = [
  { id: 'p1',  category: 'burgers',  name: 'Sertão Classic',      desc: 'Blend 160g, queijo coalho, alface, tomate e melaço de cana',  price: 28.90, units: ['lambari','saolourenco','carmo'], badge: null },
  { id: 'p2',  category: 'burgers',  name: 'Sertão Smash',        desc: 'Duplo smash 2×100g, bacon crocante, onion crispy e maionese defumada', price: 39.90, units: ['lambari','carmo'],            badge: 'Mais Pedido' },
  { id: 'p3',  category: 'burgers',  name: 'Sertão BBQ',          desc: 'Blend 180g, molho barbecue de rapadura, cebola caramelizada e queijo manteiga', price: 35.90, units: ['saolourenco','carmo'],                  badge: null },
  { id: 'p4',  category: 'burgers',  name: 'Sertão Chicken',      desc: 'Frango empanado crocante, molho ranch, coleslaw e picles',     price: 32.90, units: ['lambari','saolourenco','carmo'], badge: null },
  { id: 'p5',  category: 'combos',   name: 'Combo Classic',      desc: 'Sertão Classic + Fritas Médias + Refrigerante 300ml',           price: 44.90, units: ['lambari','saolourenco','carmo'], badge: null },
  { id: 'p6',  category: 'combos',   name: 'Combo Smash',        desc: 'Sertão Smash + Fritas Grandes + Refrigerante 400ml',            price: 56.90, units: ['lambari','carmo'],            badge: 'Top Combo' },
  { id: 'p7',  category: 'combos',   name: 'Combo Família',      desc: '2 Sertão Classic + 2 Fritas + 2 Refrigerantes',                 price: 89.90, units: ['lambari','saolourenco','carmo'], badge: null },
  { id: 'p8',  category: 'drinks',   name: 'Refrigerante 300ml', desc: 'Coca-Cola, Fanta Laranja, Sprite ou Guaraná Antarctica',       price:  7.90, units: ['lambari','saolourenco','carmo'], badge: null },
  { id: 'p9',  category: 'drinks',   name: 'Milk Shake 400ml',   desc: 'Chocolate, Morango ou Baunilha com cobertura e chantilly',     price: 18.90, units: ['lambari','saolourenco','carmo'], badge: null },
  { id: 'p10', category: 'drinks',   name: 'Suco Natural 300ml', desc: 'Maracujá, Acerola ou Goiaba — feito na hora',                  price: 12.90, units: ['carmo'],                    badge: null },
  { id: 'p11', category: 'sides',    name: 'Fritas Pequenas',    desc: 'Batata palito crocante com sal e páprica defumada',            price:  9.90, units: ['lambari','saolourenco','carmo'], badge: null },
  { id: 'p12', category: 'sides',    name: 'Fritas Grandes',     desc: 'Porção generosa com molho especial da casa',                  price: 15.90, units: ['lambari','saolourenco','carmo'], badge: null },
  { id: 'p13', category: 'sides',    name: 'Onion Rings',        desc: 'Anéis de cebola empanados crocantes com molho barbecue',      price: 14.90, units: ['lambari','carmo'],            badge: null },
  { id: 'p14', category: 'desserts', name: 'Brownie Quente',     desc: 'Brownie de chocolate com sorvete de creme e calda de caramelo', price: 19.90, units: ['lambari','saolourenco','carmo'], badge: 'Novidade' },
  { id: 'p15', category: 'desserts', name: 'Casquinha',          desc: 'Sorvete artesanal nos sabores do dia — casquinha ou pote',     price:  8.90, units: ['saolourenco','carmo'],           badge: null },
];

export const ORDER_STATUSES = [
  { key: 'received',  label: 'Pedido Recebido',   icon: '📥', color: 'text-blue-400' },
  { key: 'preparing', label: 'Em Preparo',         icon: '👨‍🍳', color: 'text-yellow-400' },
  { key: 'ready',     label: 'Pronto',             icon: '✅', color: 'text-green-400' },
  { key: 'delivered', label: 'Entregue',           icon: '🛵', color: 'text-primary' },
];

/* Progressão simulada de status (ms) */
export const STATUS_DELAYS = [10000, 20000, 30000];
