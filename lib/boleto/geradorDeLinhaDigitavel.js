var formatarLinhaDigitavel = require('../formatacoesUtils').linhaDigitavel;

module.exports = function(codigoDeBarras, banco) {
	if(codigoDeBarras.length !== 44) {
		throw new Error('O código de barras precisa ter 44 digitos');
	}

	var geradorDeDigito = banco.getGeradorDeDigito(),
		linhaDigitavel = [];

	linhaDigitavel.push(codigoDeBarras.substring(0, 3));
	linhaDigitavel.push(codigoDeBarras.substring(3, 4));
    linhaDigitavel.push(codigoDeBarras.substring(19, 24));
	linhaDigitavel.push(geradorDeDigito.mod10(linhaDigitavel.join('')));

	linhaDigitavel.push(codigoDeBarras.substring(24, 34));
	linhaDigitavel.push(geradorDeDigito.mod10(linhaDigitavel.join('').substring(10, 20)));

	linhaDigitavel.push(codigoDeBarras.substring(34));
	linhaDigitavel.push(geradorDeDigito.mod10(linhaDigitavel.join('').substring(21, 31)));

	linhaDigitavel.push(codigoDeBarras.substring(4, 5));
	linhaDigitavel.push(codigoDeBarras.substring(5, 9));
	linhaDigitavel.push(codigoDeBarras.substring(9, 19));

	return formatarLinhaDigitavel(linhaDigitavel.join(''));
}

