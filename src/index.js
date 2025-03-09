// Função que implementa o algoritmo de Luhn para validação do número do cartão
function luhnCheck(cardNumber) {
    let sum = 0;
    let shouldDouble = false;
    // Percorre os dígitos de trás para frente
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i), 10);
      if (shouldDouble) {
        digit *= 2;
        // Se o resultado for maior que 9, subtrai 9
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    // Se a soma total for múltiplo de 10, o cartão é válido segundo Luhn
    return (sum % 10 === 0);
  }
  
  // Função para identificar a bandeira do cartão utilizando expressões regulares
  function getCardBrand(cardNumber) {
    // Remove quaisquer caracteres não numéricos
    const num = cardNumber.replace(/\D/g, '');
  
    // Lista de padrões para as principais bandeiras:
    const patterns = {
      // Visa: começa com 4 e possui 13 ou 16 dígitos (aceitando também o caso de 16 dígitos conforme solicitado)
      Visa: /^4\d{12}(\d{3})?$/,
      // MasterCard: pode começar com 51 a 55 ou com números do range 2221-2720, sempre com 16 dígitos
      MasterCard: /^(5[1-5]\d{14}|2(2[2-9]\d{12}|[3-6]\d{13}|7[01]\d{12}|720\d{12}))$/,
      // American Express (Amex): começa com 34 ou 37 e possui 15 dígitos
      Amex: /^3[47]\d{13}$/,
      // Diners Club: padrões conhecidos para 14 dígitos
      Diners: /^3(0[0-5]|[68]\d)\d{11}$/,
      // Discover: inicia com 6011, 65 ou alguns intervalos do 622 e possui 16 dígitos
      Discover: /^6(?:011|5\d{2}|22(?:2[1-9]|[3-9]\d)|2[3-6]\d|27[01]|2720)\d{12}$/,
      // JCB: normalmente começa com 35 e possui 16 dígitos
      JCB: /^(?:352[89]|35[3-8]\d)\d{12}$/,
      // Elo: possui diversos intervalos de IIN conhecidos e geralmente 16 dígitos
      Elo: /^(4011(78|79)|4312(74|75)|4389(35|36)|4514(16|17)|4573(93|94)|5041(75|76)|6277(80|81)|6362(97|98)|6363(68|69))\d{10}$/,
      // Hipercard: pode iniciar com 606282 ou com 3841 e possui 16 ou 19 dígitos
      Hipercard: /^(606282\d{10}(\d{3})?|3841\d{15})$/
    };
  
    // Percorre os padrões e retorna a bandeira se houver correspondência
    for (const brand in patterns) {
      if (patterns[brand].test(num)) {
        return brand;
      }
    }
    return 'Bandeira desconhecida';
  }
  
  // Função principal que valida e exibe os resultados
  function validarCartao(cardNumber) {
    // Remove espaços e outros caracteres não numéricos
    const num = cardNumber.replace(/\D/g, '');
    const brand = getCardBrand(cardNumber);
    const isValid = luhnCheck(num);
  
    console.log(`Número do cartão: ${cardNumber}`);
    console.log(`Bandeira: ${brand}`);
    console.log(`Válido: ${isValid ? 'SIM' : 'NÃO'}`);
  }
  
  // Exemplos de teste:
  validarCartao('4111111111111111'); // Visa com 16 dígitos
  validarCartao('5500000000000004'); // MasterCard
  validarCartao('340000000000009');  // American Express 