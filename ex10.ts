
export {};

// 1. Aliases e tuplas

type Placa = string;
type Periodo = [entrada: number, saida: number];

// 2. União discriminada

type Carro = {
  readonly placa: Placa;
  tipo: 'carro';
  portas: 2 | 4;
};

type Moto = {
  readonly placa: Placa;
  tipo: 'moto';
  cilindradas: number;
};

type Caminhao = {
  readonly placa: Placa;
  tipo: 'caminhao';
  eixos: number;
};

type Veiculo = Carro | Moto | Caminhao;

// 3. Enum e ticket

enum SituacaoTicket {
  Aberto = 'ABERTO',
  Pago = 'PAGO'
}

type Ticket = {
  veiculo: Veiculo;
  periodo: Periodo;
  selo: boolean;
  situacao: SituacaoTicket;
  valor?: number;
};

// 4. Erros de validação

function falhar(mensagem: string): never {
  throw new Error(mensagem);
}

// 5. Cálculo da tarifa

function calcularTarifa(v: Veiculo, horas: number): number {
  const horasCobradas = Math.max(1, Math.ceil(horas));

  switch (v.tipo) {
    case 'carro':
      return 8 + (horasCobradas - 1) * 5;

    case 'moto':
      return 4 + (horasCobradas - 1) * 2;

    case 'caminhao':
      return 15 + (horasCobradas - 1) * 10;

    default: {
      const _naoTratado: never = v;
      return _naoTratado;
    }
  }
}

// 6. Fechamento do ticket: cria um objeto novo.

function fecharTicket(t: Ticket): Ticket {
  const horas = Math.max(1, t.periodo[1] - t.periodo[0]);

  let valor = calcularTarifa(t.veiculo, horas);

  if (t.selo) {
    valor *= 0.5;
  }

  return {
    ...t,
    valor,
    situacao: SituacaoTicket.Pago
  };
}

// 7. Registro

function registrar(msg: string): void {
  console.log(msg);
}

// 8. Leitura e validação de JSON externo

function lerVeiculo(json: string): Veiculo {
  let dados: unknown;

  try {
    dados = JSON.parse(json) as unknown;
  } catch {
    return falhar('JSON malformado');
  }

  if (typeof dados !== 'object' || dados === null) {
    return falhar('objeto de veículo inválido');
  }

  if (!('placa' in dados) || typeof dados.placa !== 'string') {
    return falhar('placa inválida');
  }

  if (!('tipo' in dados) || typeof dados.tipo !== 'string') {
    return falhar('tipo inválido');
  }

  switch (dados.tipo) {
    case 'carro':
      if (
        !('portas' in dados) ||
        (dados.portas !== 2 && dados.portas !== 4)
      ) {
        return falhar('quantidade de portas inválida');
      }

      return {
        placa: dados.placa,
        tipo: 'carro',
        portas: dados.portas
      };

    case 'moto':
      if (
        !('cilindradas' in dados) ||
        typeof dados.cilindradas !== 'number' ||
        !Number.isFinite(dados.cilindradas) ||
        dados.cilindradas < 0
      ) {
        return falhar('cilindradas inválidas');
      }

      return {
        placa: dados.placa,
        tipo: 'moto',
        cilindradas: dados.cilindradas
      };

    case 'caminhao':
      if (
        !('eixos' in dados) ||
        typeof dados.eixos !== 'number' ||
        !Number.isInteger(dados.eixos) ||
        dados.eixos < 1
      ) {
        return falhar('quantidade de eixos inválida');
      }

      return {
        placa: dados.placa,
        tipo: 'caminhao',
        eixos: dados.eixos
      };

    default:
      return falhar(`tipo "${dados.tipo}" desconhecido`);
  }
}

// 9. Dados de entrada: os veículos chegam como JSON.

const veiculosJson = [
  '{"placa":"ABC1D23","tipo":"carro","portas":4}',
  '{"placa":"MOT0A12","tipo":"moto","cilindradas":160}',
  '{"placa":"CAM9Z99","tipo":"caminhao","eixos":3}',
  '{"placa":"XYZ4E56","tipo":"carro","portas":2}'
];

const periodos: Periodo[] = [
  [8, 11],
  [9, 10],
  [7, 12],
  [14, 16]
];

const selos = [false, false, false, true];

// 10. Leitura, fechamento e relatório.

const tickets: Ticket[] = veiculosJson.map((json, indice) => ({
  veiculo: lerVeiculo(json),
  periodo: periodos[indice],
  selo: selos[indice],
  situacao: SituacaoTicket.Aberto
}));

const fechados = tickets.map(fecharTicket);

fechados.forEach(ticket => {
  const horas = Math.max(1, ticket.periodo[1] - ticket.periodo[0]);
  const valor = ticket.valor ?? 0;
  const desconto = ticket.selo ? ' (selo -50%)' : '';

  registrar(
    `[${ticket.situacao}] ${ticket.veiculo.placa} ` +
    `(${ticket.veiculo.tipo}) - ${horas}h - ` +
    `R$ ${valor.toFixed(2)}${desconto}`
  );
});

const faturamento = fechados
  .filter(ticket => ticket.situacao === SituacaoTicket.Pago)
  .reduce((soma, ticket) => soma + (ticket.valor ?? 0), 0);

const entradas = fechados.reduce(
  (contagem, ticket) => {
    switch (ticket.veiculo.tipo) {
      case 'carro':
        contagem.carro++;
        break;
      case 'moto':
        contagem.moto++;
        break;
      case 'caminhao':
        contagem.caminhao++;
        break;
    }

    return contagem;
  },
  { carro: 0, moto: 0, caminhao: 0 }
);

registrar(`Faturamento: R$ ${faturamento.toFixed(2)}`);
registrar(
  `Entradas: carro=${entradas.carro}, ` +
  `moto=${entradas.moto}, caminhao=${entradas.caminhao}`
);

// 11. Teste de tipo desconhecido.

try {
  lerVeiculo('{"placa":"BIC1234","tipo":"bicicleta"}');
} catch (erro: unknown) {
  if (erro instanceof Error) {
    registrar(`Erro ao ler veículo: ${erro.message}`);
  }
}

// 12. Teste conceitual de exaustividade.
//
// Se acrescentarmos:
// type Van = {
//   readonly placa: Placa;
//   tipo: 'van';
//   lugares: number;
// };
//
// type VeiculoAmpliado = Veiculo | Van;
//
// E substituirmos o parâmetro de calcularTarifa por VeiculoAmpliado,
// sem acrescentar um case 'van', a linha abaixo dará erro:
//
// const _naoTratado: never = v;
//
// Isso garante que todo tipo possível da união seja tratado.
