
export {};

type Leitura = [cidade: string, temperatura: number];

const leituras: Leitura[] = [
  ['Porto Velho', 34],
  ['Curitiba', 12],
  ['Manaus', 31],
  ['Porto Alegre', 9],
  ['Natal', 29]
];

function extremos(temps: number[]): [number, number] {
  return [Math.min(...temps), Math.max(...temps)];
}

for (const [cidade, temp] of leituras) {
  console.log(`${cidade}: ${temp}°C`);
}

const temperaturas = leituras.map(([, temperatura]) => temperatura);
const [minima, maxima] = extremos(temperaturas);

type ContatoImprensa = [
  nome: string,
  telefone: string,
  email?: string
];

const contato1: ContatoImprensa = [
  'Ana',
  '69999990000',
  'ana@exemplo.com'
];

const contato2: ContatoImprensa = [
  'Carlos',
  '69988880000'
];

// Cidade seguida de qualquer quantidade de temperaturas.
type Historico = [cidade: string, ...temperaturas: number[]];

const historico: Historico = [
  'Porto Velho',
  22, 24, 26, 28, 25, 23, 23
];

const valores = historico.slice(1);
const media = valores.reduce((soma, temp) => soma + temp, 0)
  / valores.length;

console.log(
  `Mínima: ${minima}°C | Máxima: ${maxima}°C | Média: ${media.toFixed(1)}°C`
);

const capitalOficial: readonly [string, string] = [
  'RO',
  'Porto Velho'
];

// Erro intencional:
// capitalOficial[1] = 'Ji-Paraná';
// Erro: Cannot assign to '1' because it is a read-only property.
