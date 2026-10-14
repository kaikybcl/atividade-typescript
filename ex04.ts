
export {};

const itens: { nome: string; preco: number; quantidade: number }[] = [
  { nome: 'Arroz 5kg', preco: 28.90, quantidade: 1 },
  { nome: 'Feijão 1kg', preco: 8.49, quantidade: 2 },
  { nome: 'Leite 1L', preco: 4.99, quantidade: 6 },
  { nome: 'Café 500g', preco: 17.90, quantidade: 1 },
  { nome: 'Sabão em pó', preco: 12.50, quantidade: 1 }
];

// map transforma cada item em seu nome.
const nomes: string[] = itens.map(item => item.nome);

// filter seleciona os itens com preço unitário acima de R$ 10.
const caros = itens.filter(item => item.preco > 10);

// reduce acumula o valor total considerando as quantidades.
const total: number = itens.reduce(
  (acumulado, item) => acumulado + item.preco * item.quantidade,
  0
);

console.log(`Itens: ${nomes.join(', ')}`);
console.log(`Acima de R$ 10: ${caros.map(item => item.nome).join(', ')}`);
console.log(`Total da compra: R$ ${total.toFixed(2)}`);

const categorias: readonly string[] = [
  'Mercearia',
  'Laticínios',
  'Limpeza'
];

// Erro intencional:
// categorias.push('Bebidas');
// Erro: Property 'push' does not exist on type 'readonly string[]'.

// Matriz: cada array interno representa uma prateleira.
const despensa: number[][] = [
  [2, 0, 1],
  [4, 4],
  [1]
];

const itensNaDespensa = despensa.reduce(
  (totalPrateleira, prateleira) =>
    totalPrateleira + prateleira.reduce(
      (soma, quantidade) => soma + quantidade,
      0
    ),
  0
);

console.log(`Itens na despensa: ${itensNaDespensa}`);

// Desestruturação
const [primeiro, segundo] = itens;

// Spread cria um novo array sem alterar o original.
const novosItens = [
  ...itens,
  { nome: 'Detergente', preco: 2.50, quantidade: 1 }
];

console.log(`Primeiro: ${primeiro.nome}`);
console.log(`Segundo: ${segundo.nome}`);
console.log(`Quantidade original: ${itens.length}`);
console.log(`Quantidade nova: ${novosItens.length}`);
