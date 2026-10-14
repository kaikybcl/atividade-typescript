
export {};

enum StatusPedido {
  Recebido = 1,
  EmPreparo,
  SaiuParaEntrega,
  Entregue,
  Cancelado
}

enum FormaPagamento {
  PIX = 'PIX',
  CARTAO = 'CARTAO',
  DINHEIRO = 'DINHEIRO'
}

function mensagem(status: StatusPedido): string {
  switch (status) {
    case StatusPedido.Recebido:
      return 'Recebemos seu pedido!';
    case StatusPedido.EmPreparo:
      return 'Seu pedido está sendo preparado 🍳';
    case StatusPedido.SaiuParaEntrega:
      return 'O entregador está a caminho 🛵';
    case StatusPedido.Entregue:
      return 'Pedido entregue. Bom apetite!';
    case StatusPedido.Cancelado:
      return 'Seu pedido foi cancelado.';
  }
}

function avancar(status: StatusPedido): StatusPedido {
  switch (status) {
    case StatusPedido.Recebido:
      return StatusPedido.EmPreparo;
    case StatusPedido.EmPreparo:
      return StatusPedido.SaiuParaEntrega;
    case StatusPedido.SaiuParaEntrega:
      return StatusPedido.Entregue;
    case StatusPedido.Entregue:
    case StatusPedido.Cancelado:
      return status;
  }
}

let status: StatusPedido = StatusPedido.Recebido;

while (true) {
  console.log(`[${status} - ${StatusPedido[status]}] ${mensagem(status)}`);

  if (
    status === StatusPedido.Entregue ||
    status === StatusPedido.Cancelado
  ) {
    break;
  }

  status = avancar(status);
}

const pagamento: FormaPagamento = FormaPagamento.PIX;
console.log(`Pagamento: ${pagamento}`);

// Erro intencional:
// const pagamentoInvalido: FormaPagamento = 'PIX';
// Erro: Type '"PIX"' is not assignable to type 'FormaPagamento'.
