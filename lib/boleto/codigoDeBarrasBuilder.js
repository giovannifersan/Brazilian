var brazilianutils = require('brazilianutils'),
	insert = brazilianutils.string.insert;

module.exports = (function() {
	function CodigoDeBarrasBuilder(boleto) {
		var codigoDeBarras = [],
			banco = boleto.getBanco();

		codigoDeBarras.push(banco.getNumeroFormatado());
		codigoDeBarras.push(boleto.getCodigoEspecieMoeda());
		codigoDeBarras.push(boleto.getFatorVencimento());
		codigoDeBarras.push(boleto.getValorFormatado());

		this._banco = banco;
		this._codigoDeBarras = codigoDeBarras.join('');
	}

	CodigoDeBarrasBuilder.prototype.comCampoLivre = function(campoLivre) {
		var codigoDeBarras = this._codigoDeBarras,
			banco = this._banco,
			geradorDeDigito = banco.getGeradorDeDigito();

        if(Array.isArray(campoLivre)) {
            campoLivre = campoLivre.join('');
        }

        if(!campoLivre.length) {
            throw new Error('Campo livre está vazio');
        }

		codigoDeBarras += campoLivre;

		var digito = geradorDeDigito.mod11(codigoDeBarras);
		codigoDeBarras = insert(codigoDeBarras, 4, digito);

		if(codigoDeBarras.length !== 44) {
			throw new Error([
				'Erro na geração do código de barras.',
				'Número de dígitos diferente de 44.',
				'Verifique se todos os dados foram preenchidos corretamente.',
				'Tamanho encontrado: ' + codigoDeBarras.length,
                'Valor encontrado: ' + codigoDeBarras
			].join(' '));
		}

		return codigoDeBarras;
	}

	return CodigoDeBarrasBuilder;
})();
