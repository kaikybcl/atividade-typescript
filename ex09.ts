
export {};

const respostaOk =
  '{"cidade":"Porto Velho","temperatura":34,"umidade":0.62}';

const respostaQuebrada =
  '{"cidade":"Porto Velho","temperatura":"quente"}';

const respostaInvalida = '{ cidade: Porto Velho ';

// Versão insegura: any desativa a maior parte da verificação de tipos.
function lerComAny(json: string): void {
  const dados: any = JSON.parse(json);
  console.log(dados.temperatura.toFixed(1));
}

// Ao chamar lerComAny(respostaQuebrada), ocorre em execução:
// TypeError: dados.temperatura.toFixed is not a function
// Isso acontece porque temperatura é string, não number.

// never representa uma função que nunca retorna normalmente.
function falhar(mensagem: string): never {
  throw new Error(mensagem);
}

type Clima = {
  cidade: string;
  temperatura: number;
};

function lerClima(json: string): Clima {
  let dados: unknown;

  try {
    dados = JSON.parse(json) as unknown;
  } catch {
    return falhar('JSON malformado');
  }

  if (
    typeof dados !== 'object' ||
    dados === null ||
    !('cidade' in dados) ||
    !('temperatura' in dados)
  ) {
    return falhar('dados inválidos');
  }

  if (
    typeof dados.cidade !== 'string' ||
    typeof dados.temperatura !== 'number'
  ) {
    return falhar('campo "temperatura" inválido');
  }

  return {
    cidade: dados.cidade,
    temperatura: dados.temperatura
  };
}

function testar(json: string): void {
  try {
    const clima = lerClima(json);
    console.log(
      `${clima.cidade}: ${clima.temperatura.toFixed(1)}°C`
    );
  } catch (erro: unknown) {
    if (erro instanceof Error) {
      console.log(`Erro: ${erro.message}`);
    } else {
      console.log('Erro desconhecido');
    }
  }
}

testar(respostaOk);
testar(respostaQuebrada);
testar(respostaInvalida);
