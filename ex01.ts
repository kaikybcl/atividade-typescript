
export {};

// 1. Tipos explícitos
const nomeProduto1: string = 'Pão francês';
const precoUnitario1: number = 0.75;
let quantidade1: number = 12;

const nomeProduto2: string = 'Bolo de cenoura';
const precoUnitario2: number = 18.5;
const quantidade2: number = 2;

// 2. Inferência de tipos
const aberta = true;
// Tipo inferido pelo TypeScript: boolean.

// 3. Cálculos
const subtotal1 = precoUnitario1 * quantidade1;
const subtotal2 = precoUnitario2 * quantidade2;
const total = subtotal1 + subtotal2;

// 4. Separadores numéricos
const paesVendidos = 1_250_000;

// 5. Número hexadecimal
const categoria = 0x1A;

console.log(
  `${nomeProduto1}: ${quantidade1} x R$ ${precoUnitario1.toFixed(2)} = R$ ${subtotal1.toFixed(2)}`
);
console.log(
  `${nomeProduto2}: ${quantidade2} x R$ ${precoUnitario2.toFixed(2)} = R$ ${subtotal2.toFixed(2)}`
);
console.log(`Total: R$ ${total.toFixed(2)}`);
console.log(`Padaria aberta? ${aberta}`);
console.log(`Pães vendidos no ano: ${paesVendidos}`);
console.log(`Categoria: ${categoria}`);

// Erro intencional:
// quantidade1 = 'doze';
// Erro: Type 'string' is not assignable to type 'number'.
