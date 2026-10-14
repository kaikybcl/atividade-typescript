
export {};

let paciente: {
  readonly cpf: string;
  nome: string;
  idade: number;
  plano: boolean;
  alergias?: string[];
  contatoEmergencia?: {
    nome: string;
    telefone: string;
  };
};

paciente = {
  cpf: '123.456.789-00',
  nome: 'Ana Souza',
  idade: 34,
  plano: true,
  alergias: ['dipirona', 'lactose'],
  contatoEmergencia: {
    nome: 'Carlos Souza',
    telefone: '69999990000'
  }
};

const paciente2: {
  readonly cpf: string;
  nome: string;
  idade: number;
  plano: boolean;
  alergias?: string[];
  contatoEmergencia?: {
    nome: string;
    telefone: string;
  };
} = {
  cpf: '987.654.321-00',
  nome: 'Carlos Lima',
  idade: 61,
  plano: false
};

function resumo(
  p: { nome: string; idade: number; alergias?: string[] }
): string {
  const descricao = p.alergias
    ? `Alergias: ${p.alergias.join(', ')}`
    : 'Sem alergias registradas';

  return `${p.nome}, ${p.idade} anos. ${descricao}`;
}

console.log(resumo(paciente));
console.log(resumo(paciente2));

// Erro intencional 1:
// paciente.cpf = '111.222.333-44';
// Erro: Cannot assign to 'cpf' because it is a read-only property.

// Erro intencional 2:
// paciente.peso = 70;
// Erro: Property 'peso' does not exist on the declared object type.

// Reflexão: object x Object x {}
let dados: object = paciente;

// console.log(dados.nome);
// Erro: Property 'nome' does not exist on type 'object'.
// 'object' aceita objetos, mas não declara quais propriedades eles possuem.

// {} aceita qualquer valor não nulo ou indefinido, incluindo números.
let x: {} = 10;

// object exige um valor não primitivo.
// let y: object = 10;
// Erro: Type 'number' is not assignable to type 'object'.
