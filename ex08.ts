
export {};

let codigo: number | string = 42;

function formatarCodigo(c: number | string): string {
  if (typeof c === 'number') {
    return `CLI-${String(c).padStart(4, '0')}`;
  }

  // Neste ponto, c é string.
  if (/^\d+$/.test(c)) {
    return `CLI-${c.padStart(4, '0')}`;
  }

  return c;
}

type TamanhoCamiseta = 'P' | 'M' | 'G' | 'GG';

const camiseta: TamanhoCamiseta = 'M';

// Erro intencional:
// const tamanhoInvalido: TamanhoCamiseta = 'XG';
// Erro: Type '"XG"' is not assignable to type 'TamanhoCamiseta'.

type Regiao =
  | 'norte'
  | 'nordeste'
  | 'centro-oeste'
  | 'sudeste'
  | 'sul';

function calcularFrete(regiao: Regiao): number {
  switch (regiao) {
    case 'norte':
      return 25;
    case 'nordeste':
      return 20;
    case 'centro-oeste':
      return 18;
    case 'sudeste':
      return 12;
    case 'sul':
      return 15;
  }
}

const complemento: string | null = null;

function limparTelefone(tel: string | number): string {
  return String(tel).replace(/\D/g, '');
}

const endereco = 'Rua das Flores, 100';
const regiao: Regiao = 'sul';

console.log(
  `Cliente: ${formatarCodigo(codigo)} | Camiseta: ${camiseta}`
);
console.log(
  `Entrega: ${endereco} - ${complemento ?? '(sem complemento)'}`
);
console.log(`Frete para o sul: R$ ${calcularFrete(regiao).toFixed(2)}`);
console.log(`Telefone: ${limparTelefone('(69) 99999-0000')}`);

// Inferência de literais:
const r = 'sul';
calcularFrete(r); // Aceito: const mantém o tipo literal 'sul'.

let r2 = 'sul';
// calcularFrete(r2);
// Erro: string não pode ser atribuída ao tipo literal 'sul'.
// let r2 = 'sul' infere string, pois a variável pode ser alterada.

// Correção:
const r3: Regiao = 'sul';
calcularFrete(r3);
