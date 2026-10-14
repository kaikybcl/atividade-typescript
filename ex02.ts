
export {};

const nomeDigitado: string = ' maria da silva ';

function formatarNome(nome: string): string {
  const palavras = nome.trim().split(' ').filter(Boolean);

  return palavras
    .map((palavra, indice) => {
      const minuscula = palavra.toLowerCase();

      if (
        indice > 0 &&
        ['da', 'de', 'do'].includes(minuscula)
      ) {
        return minuscula;
      }

      return minuscula.charAt(0).toUpperCase() + minuscula.slice(1);
    })
    .join(' ');
}

const precoLido = '12.40';
const quantidadeLida = '3un';

const preco = Number(precoLido);
const quantidade = parseInt(quantidadeLida, 10);

const clienteFidelidade: boolean = true;
const numeroCupom = 42;

const subtotal = preco * quantidade;
const desconto = clienteFidelidade ? subtotal * 0.05 : 0;
const total = subtotal - desconto;

const cupom = `CUPOM Nº ${String(numeroCupom).padStart(6, '0')}
Cliente: ${formatarNome(nomeDigitado)}
Item: ${quantidade} x R$ ${preco.toFixed(2)}
Subtotal: R$ ${subtotal.toFixed(2)}
Desconto fidelidade: R$ ${desconto.toFixed(2)}
TOTAL: R$ ${total.toFixed(2)}`;

console.log(cupom);
