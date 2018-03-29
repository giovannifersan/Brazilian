var geradorDeDigitoPadrao = require('../../lib/boleto/geradorDeDigitoPadrao');

module.exports = {
	'Verifica a geração de dígitos mod11': function(test) {
		test.equal(5, geradorDeDigitoPadrao.mod11('0019386000000040000000001207113000900020618'));
		test.equal(6, geradorDeDigitoPadrao.mod11('2379316800000001002949060000000000300065800'));
		test.equal(3, geradorDeDigitoPadrao.mod11('0000039104766'));
		test.equal(3, geradorDeDigitoPadrao.mod11('3999100100001200000351202000003910476618602'));
		test.equal(1, geradorDeDigitoPadrao.mod11('3999597400000001002461722000000001934404542'));

		test.done();
	},

	'Verifica a geração de dígitos mod10': function(test) {
		test.equal(9, geradorDeDigitoPadrao.mod10('237929490'));
		test.equal(4, geradorDeDigitoPadrao.mod10('6000000000'));
		test.equal(9, geradorDeDigitoPadrao.mod10('0300065800'));
		test.equal(8, geradorDeDigitoPadrao.mod10('399903512'));

		test.done();
	}
}