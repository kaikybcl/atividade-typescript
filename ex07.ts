
export {};

type Notificador = (
  destinatario: string,
  mensagem: string
) => void;

const porEmail: Notificador = (destinatario, mensagem) => {
  console.log(`[E-MAIL] para ${destinatario}: ${mensagem}`);
};

const porSms: Notificador = (destinatario, mensagem) => {
  if (mensagem.length > 160) {
    console.log('SMS ignorado: mensagem longa');
    return;
  }

  console.log(`[SMS] para ${destinatario}: ${mensagem}`);
};

const porApp: Notificador = (destinatario, mensagem) => {
  console.log(`[APP] para ${destinatario}: ${mensagem}`);
};

function notificarTodos(
  destinatarios: string[],
  mensagem: string,
  enviar: Notificador
): void {
  destinatarios.forEach(destinatario => {
    enviar(destinatario, mensagem);
  });
}

const mensagemReuniao = 'Reunião de pais sexta às 19h';

notificarTodos(
  ['ana@escola.com'],
  mensagemReuniao,
  porEmail
);

notificarTodos(
  ['joao.resp'],
  mensagemReuniao,
  porApp
);

notificarTodos(
  ['(69) 99999-0000'],
  'A'.repeat(161),
  porSms
);

// Erro intencional:
// function teste(): void { return 10; }
// Erro: Type 'number' is not assignable to type 'void'.

// Retorno de valor em callback void:
const contar: Notificador = (d, m) => m.length;

// É aceito porque uma função contextualizada como void pode retornar
// um valor que o chamador simplesmente ignora.
