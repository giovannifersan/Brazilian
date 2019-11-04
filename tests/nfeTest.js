var nfe = require("../brazilian").nfe;

module.exports = {
    obterAutorizadorPorUf: {
        'Retorna resultados corretos quando é emissão normal': function(test) {
            test.equal(nfe.obterAutorizadorPorUf('AC'), 'svrs');
            test.equal(nfe.obterAutorizadorPorUf('AL'), 'svrs');
            test.equal(nfe.obterAutorizadorPorUf('AM'), 'am');
            test.equal(nfe.obterAutorizadorPorUf('AP'), 'svrs');
            test.equal(nfe.obterAutorizadorPorUf('BA'), 'ba');
            test.equal(nfe.obterAutorizadorPorUf('CE'), 'ce');
            test.equal(nfe.obterAutorizadorPorUf('DF'), 'svrs');
            test.equal(nfe.obterAutorizadorPorUf('ES'), 'svrs');
            test.equal(nfe.obterAutorizadorPorUf('GO'), 'go');
            test.equal(nfe.obterAutorizadorPorUf('MA'), 'svan');
            test.equal(nfe.obterAutorizadorPorUf('MG'), 'mg');
            test.equal(nfe.obterAutorizadorPorUf('MS'), 'ms');
            test.equal(nfe.obterAutorizadorPorUf('MT'), 'mt');
            test.equal(nfe.obterAutorizadorPorUf('PA'), 'svan');
            test.equal(nfe.obterAutorizadorPorUf('PB'), 'svrs');
            test.equal(nfe.obterAutorizadorPorUf('PE'), 'pe');
            test.equal(nfe.obterAutorizadorPorUf('PI'), 'svan');
            test.equal(nfe.obterAutorizadorPorUf('PR'), 'pr');
            test.equal(nfe.obterAutorizadorPorUf('RJ'), 'svrs');
            test.equal(nfe.obterAutorizadorPorUf('RN'), 'svrs');
            test.equal(nfe.obterAutorizadorPorUf('RO'), 'svrs');
            test.equal(nfe.obterAutorizadorPorUf('RR'), 'svrs');
            test.equal(nfe.obterAutorizadorPorUf('RS'), 'rs');
            test.equal(nfe.obterAutorizadorPorUf('SC'), 'svrs');
            test.equal(nfe.obterAutorizadorPorUf('SE'), 'svrs');
            test.equal(nfe.obterAutorizadorPorUf('SP'), 'sp');
            test.equal(nfe.obterAutorizadorPorUf('TO'), 'svrs');

            test.done();
        },

        'Retorna resultados corretos quando é emissão normal e estado é passado com letra minuscula': function(test) {
            test.equal(nfe.obterAutorizadorPorUf('ac'), 'svrs');
            test.equal(nfe.obterAutorizadorPorUf('al'), 'svrs');
            test.equal(nfe.obterAutorizadorPorUf('am'), 'am');
            test.equal(nfe.obterAutorizadorPorUf('ap'), 'svrs');
            test.equal(nfe.obterAutorizadorPorUf('ba'), 'ba');
            test.equal(nfe.obterAutorizadorPorUf('ce'), 'ce');
            test.equal(nfe.obterAutorizadorPorUf('df'), 'svrs');
            test.equal(nfe.obterAutorizadorPorUf('es'), 'svrs');
            test.equal(nfe.obterAutorizadorPorUf('go'), 'go');
            test.equal(nfe.obterAutorizadorPorUf('ma'), 'svan');
            test.equal(nfe.obterAutorizadorPorUf('mg'), 'mg');
            test.equal(nfe.obterAutorizadorPorUf('ms'), 'ms');
            test.equal(nfe.obterAutorizadorPorUf('mt'), 'mt');
            test.equal(nfe.obterAutorizadorPorUf('pa'), 'svan');
            test.equal(nfe.obterAutorizadorPorUf('pb'), 'svrs');
            test.equal(nfe.obterAutorizadorPorUf('pe'), 'pe');
            test.equal(nfe.obterAutorizadorPorUf('pi'), 'svan');
            test.equal(nfe.obterAutorizadorPorUf('pr'), 'pr');
            test.equal(nfe.obterAutorizadorPorUf('rj'), 'svrs');
            test.equal(nfe.obterAutorizadorPorUf('rn'), 'svrs');
            test.equal(nfe.obterAutorizadorPorUf('ro'), 'svrs');
            test.equal(nfe.obterAutorizadorPorUf('rr'), 'svrs');
            test.equal(nfe.obterAutorizadorPorUf('rs'), 'rs');
            test.equal(nfe.obterAutorizadorPorUf('sc'), 'svrs');
            test.equal(nfe.obterAutorizadorPorUf('se'), 'svrs');
            test.equal(nfe.obterAutorizadorPorUf('sp'), 'sp');
            test.equal(nfe.obterAutorizadorPorUf('to'), 'svrs');

            test.done();
        },

        'Retorna resultados corretos quando é emissão em contingência': function(test) {
            test.equal(nfe.obterAutorizadorPorUf('AC', true), 'svc-an');
            test.equal(nfe.obterAutorizadorPorUf('AL', true), 'svc-an');
            test.equal(nfe.obterAutorizadorPorUf('AM', true), 'svc-rs');
            test.equal(nfe.obterAutorizadorPorUf('AP', true), 'svc-an');
            test.equal(nfe.obterAutorizadorPorUf('BA', true), 'svc-rs');
            test.equal(nfe.obterAutorizadorPorUf('CE', true), 'svc-rs');
            test.equal(nfe.obterAutorizadorPorUf('DF', true), 'svc-an');
            test.equal(nfe.obterAutorizadorPorUf('ES', true), 'svc-an');
            test.equal(nfe.obterAutorizadorPorUf('GO', true), 'svc-rs');
            test.equal(nfe.obterAutorizadorPorUf('MA', true), 'svc-rs');
            test.equal(nfe.obterAutorizadorPorUf('MG', true), 'svc-an');
            test.equal(nfe.obterAutorizadorPorUf('MS', true), 'svc-rs');
            test.equal(nfe.obterAutorizadorPorUf('MT', true), 'svc-rs');
            test.equal(nfe.obterAutorizadorPorUf('PA', true), 'svc-rs');
            test.equal(nfe.obterAutorizadorPorUf('PB', true), 'svc-an');
            test.equal(nfe.obterAutorizadorPorUf('PE', true), 'svc-rs');
            test.equal(nfe.obterAutorizadorPorUf('PI', true), 'svc-rs');
            test.equal(nfe.obterAutorizadorPorUf('PR', true), 'svc-rs');
            test.equal(nfe.obterAutorizadorPorUf('RJ', true), 'svc-an');
            test.equal(nfe.obterAutorizadorPorUf('RN', true), 'svc-an');
            test.equal(nfe.obterAutorizadorPorUf('RO', true), 'svc-an');
            test.equal(nfe.obterAutorizadorPorUf('RR', true), 'svc-an');
            test.equal(nfe.obterAutorizadorPorUf('RS', true), 'svc-an');
            test.equal(nfe.obterAutorizadorPorUf('SC', true), 'svc-an');
            test.equal(nfe.obterAutorizadorPorUf('SE', true), 'svc-an');
            test.equal(nfe.obterAutorizadorPorUf('SP', true), 'svc-an');
            test.equal(nfe.obterAutorizadorPorUf('TO', true), 'svc-an');

            test.done();
        },

        'Retorna resultados corretos quando é emissão em contingência e estado é passado em letra minuscula': function(test) {
            test.equal(nfe.obterAutorizadorPorUf('ac', true), 'svc-an');
            test.equal(nfe.obterAutorizadorPorUf('al', true), 'svc-an');
            test.equal(nfe.obterAutorizadorPorUf('am', true), 'svc-rs');
            test.equal(nfe.obterAutorizadorPorUf('ap', true), 'svc-an');
            test.equal(nfe.obterAutorizadorPorUf('ba', true), 'svc-rs');
            test.equal(nfe.obterAutorizadorPorUf('ce', true), 'svc-rs');
            test.equal(nfe.obterAutorizadorPorUf('df', true), 'svc-an');
            test.equal(nfe.obterAutorizadorPorUf('es', true), 'svc-an');
            test.equal(nfe.obterAutorizadorPorUf('go', true), 'svc-rs');
            test.equal(nfe.obterAutorizadorPorUf('ma', true), 'svc-rs');
            test.equal(nfe.obterAutorizadorPorUf('mg', true), 'svc-an');
            test.equal(nfe.obterAutorizadorPorUf('ms', true), 'svc-rs');
            test.equal(nfe.obterAutorizadorPorUf('mt', true), 'svc-rs');
            test.equal(nfe.obterAutorizadorPorUf('pa', true), 'svc-rs');
            test.equal(nfe.obterAutorizadorPorUf('pb', true), 'svc-an');
            test.equal(nfe.obterAutorizadorPorUf('pe', true), 'svc-rs');
            test.equal(nfe.obterAutorizadorPorUf('pi', true), 'svc-rs');
            test.equal(nfe.obterAutorizadorPorUf('pr', true), 'svc-rs');
            test.equal(nfe.obterAutorizadorPorUf('rj', true), 'svc-an');
            test.equal(nfe.obterAutorizadorPorUf('rn', true), 'svc-an');
            test.equal(nfe.obterAutorizadorPorUf('ro', true), 'svc-an');
            test.equal(nfe.obterAutorizadorPorUf('rr', true), 'svc-an');
            test.equal(nfe.obterAutorizadorPorUf('rs', true), 'svc-an');
            test.equal(nfe.obterAutorizadorPorUf('sc', true), 'svc-an');
            test.equal(nfe.obterAutorizadorPorUf('se', true), 'svc-an');
            test.equal(nfe.obterAutorizadorPorUf('sp', true), 'svc-an');
            test.equal(nfe.obterAutorizadorPorUf('to', true), 'svc-an');

            test.done();
        },

        'Retorna null quando é passado um estado que não existe': function(test) {
            test.equal(nfe.obterAutorizadorPorUf(123, true), null);
            test.equal(nfe.obterAutorizadorPorUf('asdasdas'), null);
            test.equal(nfe.obterAutorizadorPorUf({}.itsUndefined, true), null);
            test.equal(nfe.obterAutorizadorPorUf(/whatAmIDoingHere/g), null);
            test.done();
        },
    },

    extrairDadosDaChaveDeAcesso: {
        'Verifica que retorno nulo caso seja passado algo que não é uma chave de acesso': function(test) {
            test.equal(nfe.extrairDadosDaChaveDeAcesso('gammasoft'), null);
            test.equal(nfe.extrairDadosDaChaveDeAcesso(42), null);
            test.done();
        },

        'Verifica que retorna dados adequadamente 1': function(test) {
            var chaveDeAcesso = '52150900132781000178551000000514051798110191',
                dados = nfe.extrairDadosDaChaveDeAcesso(chaveDeAcesso);

            test.deepEqual(dados, {
                uf: 52,
                dataDeEmissao: '1509',
                cnpj: '00132781000178',
                modelo: '55',
                serie: 100,
                numero: 51405,
                tipoDeEmissao: '1',
                numeroAleatorio: '798110191'
            });

            test.done();
        },

        'Verifica que retorna dados adequadamente 2': function(test) {
            var chaveDeAcesso = '53150719950366000150550010000000101003800022',
                dados = nfe.extrairDadosDaChaveDeAcesso(chaveDeAcesso);

            test.deepEqual(dados, {
                uf: 53,
                dataDeEmissao: '1507',
                cnpj: '19950366000150',
                modelo: '55',
                serie: 1,
                numero: 10,
                tipoDeEmissao: '1',
                numeroAleatorio: '003800022'
            });

            test.done();
        },
    },

    obterMensagemPorCodigo: {
        'Verifica que retorna mensagens': function(test) {
            test.equal(nfe.obterMensagemPorCodigo(100), 'Autorizado o uso da NF-e');
            test.equal(nfe.obterMensagemPorCodigo(999), 'Rejeição: Erro não catalogado');

            test.done();
        },

        'Verifica que pode-se passar o código como string': function(test) {
            test.equal(nfe.obterMensagemPorCodigo('100'), 'Autorizado o uso da NF-e');
            test.equal(nfe.obterMensagemPorCodigo('999'), 'Rejeição: Erro não catalogado');

            test.done();
        },

        'Verifica que retornar undefined se o código não for encontrado': function(test) {
            test.equal(typeof nfe.obterMensagemPorCodigo(42), 'undefined');
            test.done();
        },
    },

	obterProdutosEspecificos: {
		'Verifica que retorna corretamente os produtos especificos': function(test) {
			var produtosEspecificos = nfe.obterProdutosEspecificos();

			test.equal(produtosEspecificos.length, 4);
			test.done();
		},
	},

    gerarDadosDaNfe: {
        'Verifica geração dos dados da NF-e': function(test) {
            var dadosDaNfe = nfe.gerarDadosDaNfe({
                uf: 'SP',
                tipoDeEmissao: 5,
                cnpj: '05.481.336/0001-37',
                valorDaNfe: 'R$ 25.680,00',
                destaqueDeIcmsProprio: true,
                destaqueDeIcmsPorST: false,
                dataDeEmissao: new Date(2015, 3, 11),
            });

            test.equal(dadosDaNfe, '355054813360001370000000256800012119');
            test.done();
        },

        'Verifica geração dos dados da NF-e passando o dia como string': function(test) {
            var dadosDaNfe = nfe.gerarDadosDaNfe({
                uf: 'SP',
                tipoDeEmissao: 5,
                cnpj: '05481336000137',
                valorDaNfe: 25680,
                destaqueDeIcmsProprio: true,
                destaqueDeIcmsPorST: false,
                dataDeEmissao: '11',
            });

            test.equal(dadosDaNfe, '355054813360001370000000256800012119');
            test.done();
        }
    },

	gerarChaveDeAcesso: {
		"Verifica geração de chave de acesso": function(test){
			var chave = nfe.gerarChaveDeAcesso({
				uf: "GO",
				dataDeEmissao: new Date(2013, 8),
				cnpj: "00132781000178",
				modelo: "55",
				serie: 100,
				numero: 20614,
				tipoDeEmissao: 1,
				numeroAleatorio: "50115201"
			});

			test.equal(chave, "52130900132781000178551000000206141501152010");
			test.done();
		},

        "Verifica geração de chave de acesso quando CNPJ tem mascara": function(test){
            var chave = nfe.gerarChaveDeAcesso({
                uf: "GO",
                dataDeEmissao: new Date(2013, 8),
                cnpj: "00.132.781/0001-78",
                modelo: "55",
                serie: 100,
                numero: 20614,
                tipoDeEmissao: 1,
                numeroAleatorio: "50115201"
            });

            test.equal(chave, "52130900132781000178551000000206141501152010");
            test.done();
        },

		"Verifica que pode-se gerar a chave passando o codigo da UF": function(test){
			var chave = nfe.gerarChaveDeAcesso({
				uf: 52,
				dataDeEmissao: new Date(2013, 8),
				cnpj: "00132781000178",
				modelo: "55",
				serie: 100,
				numero: 20614,
				tipoDeEmissao: 1,
				numeroAleatorio: "50115201"
			});

			test.equal(chave, "52130900132781000178551000000206141501152010");
			test.done();
		},

		"Verifica que pode-se gerar a chave passando o nome da UF": function(test){
			var chave = nfe.gerarChaveDeAcesso({
				uf: "Goiás",
				dataDeEmissao: new Date(2013, 8),
				cnpj: "00132781000178",
				modelo: "55",
				serie: 100,
				numero: 20614,
				tipoDeEmissao: 1,
				numeroAleatorio: "50115201"
			});

			test.equal(chave, "52130900132781000178551000000206141501152010");
			test.done();
		}
	},

	formatarNumero: {
		"Verifica formatação do número da Nfe": function(test){
			test.equal(nfe.formatarNumero(15380), "000.015.380");
			test.equal(nfe.formatarNumero(215380), "000.215.380");
			test.equal(nfe.formatarNumero(1215380), "001.215.380");
			test.equal(nfe.formatarNumero(0), "000.000.000");
			test.equal(nfe.formatarNumero(1), "000.000.001");

			test.done();
		}
	},

	formatarSerie: {
		"Verifica formatação da série da Nfe": function(test){
			test.equal(nfe.formatarSerie(1), "001");
			test.equal(nfe.formatarSerie(100), "100");
			test.equal(nfe.formatarSerie(105), "105");
			test.equal(nfe.formatarSerie(50), "050");
			test.equal(nfe.formatarSerie(2), "002");

			test.done();
		}
	},

	formatarChaveDeAcesso: {
		"Verifica formatação da chave de acesso": function(test){
			test.equal(nfe.formatarChaveDeAcesso("52131000132781000178551000000153401000153408"), "5213 1000 1327 8100 0178 5510 0000 0153 4010 0015 3408");
			test.done();
		},

		"Verifica que devolve a mesma string passada caso não tenham 44 caracteres": function(test){
			test.equal(nfe.formatarChaveDeAcesso("5213100013278100017851000000153401000153408"), "5213100013278100017851000000153401000153408");
			test.done();
		},

		"Verifica que devolve a mesma string passada caso não tenham apenas números": function(test){
			test.equal(nfe.formatarChaveDeAcesso("5213100013278100017A551000000153401000153408"), "5213100013278100017A551000000153401000153408");
			test.done();
		}
	},

    formatarDadosDaNfe: {
        "Verifica formatação dos dados da nfe": function(test){
            test.equal(nfe.formatarDadosDaNfe("355054813360001370000000256800012119"), "3550 5481 3360 0013 7000 0000 2568 0001 2119");
            test.done();
        },

        // "Verifica que devolve a mesma string passada caso não tenham 44 caracteres": function(test){
        //     test.equal(nfe.formatarDadosDaNfe(""), "");
        //     test.done();
        // },

        // "Verifica que devolve a mesma string passada caso não tenham apenas números": function(test){
        //     test.equal(nfe.formatarDadosDaNfe(""), "");
        //     test.done();
        // }
    },

	validarChaveDeAcesso: {
		"Verifica que valida-se chaves validas": function(test){
			test.ok(nfe.validarChaveDeAcesso("52131000132781000178551000000153401000153408"));
			test.ok(nfe.validarChaveDeAcesso("52130900132781000178551000000206141501152010"));
			test.ok(nfe.validarChaveDeAcesso("52130900132781000178551000000207461000410105"));
			test.ok(nfe.validarChaveDeAcesso("52130900132781000178551000000213461000120002"));
			test.ok(nfe.validarChaveDeAcesso("52130900132781000178551000000208151879100705"));

			test.done();
		},

		"Verifica que não valida-se chaves inválidas": function(test){
			test.ok(!nfe.validarChaveDeAcesso("5213100013781000178551000000153401000153408"));
			test.ok(!nfe.validarChaveDeAcesso("52130900132781000178551000000206141501152011"));
			test.ok(!nfe.validarChaveDeAcesso("52130900132781000178551000000207461S00410105"));
			test.ok(!nfe.validarChaveDeAcesso("521309001327810001785510000002134610500120002"));
			test.ok(!nfe.validarChaveDeAcesso("52130900112781000178551000000208151879100705"));

			test.done();
		}
	},

	calcularDigitoVerificador: {
		"Verifica que digito é calculado corretamente": function(test){

			test.equal(nfe.calcularDigitoVerificador("5213100013278100017855100000015340100015340"), 8);
			test.equal(nfe.calcularDigitoVerificador("5213090013278100017855100000020614150115201"), 0);
			test.equal(nfe.calcularDigitoVerificador("5213090013278100017855100000020746100041010"), 5);
			test.equal(nfe.calcularDigitoVerificador("5213090013278100017855100000021346100012000"), 2);
			test.equal(nfe.calcularDigitoVerificador("5213090013278100017855100000020815187910070"), 5);

			test.done();
		},

		"Verifica que se não for uma string com 43 caracteres retorna 'false'": function(test){
			test.equal(nfe.calcularDigitoVerificador("52131000132781000178551000000153401000153403"), false);
			test.done();
		},

		"Verifica que se não for uma string não numérica retorna 'false'": function(test){
			test.equal(nfe.calcularDigitoVerificador("52130900132781000178A5100000020815187910070"), false);
			test.done();
		}
	},

	reduzirBaseDeCalculo: {
		'Verifica que calculo de reducao esta correto': function(test) {
			test.equal(nfe.reduzirBaseDeCalculo(100, 0.03, 0.17), 17.64705882352941);
			test.done();
		},
	},

	issqn: {
		'Verifica que quantidade de servicos esta correta': function(test) {
			test.equal(nfe.issqn.listaDeServicos('array').length, 193);
			test.equal(Object.keys(nfe.issqn.listaDeServicos('hash')).length, 193);
			test.done();
		},

		'Verifica que quantidade de tipos de tributação está correta': function(test) {
			test.equal(nfe.issqn.tiposDeTributacao.length, 4);
			test.done();
		}
	},

	icms: {
		'Verifica que retorna quantidade correta de STs para SIMPLES': function(test) {
			test.equal(nfe.icms.obterSituacoesTributarias('simples').length, 10);
			test.done();
		},

		'Verifica que retorna quantidade correta de STs para regime NORMAL': function(test) {
			test.equal(nfe.icms.obterSituacoesTributarias('normal').length, 11);
			test.done();
		},

		'Verifica que retorna quantidade correta de STs para ambos os regimes': function(test) {
			test.equal(nfe.icms.obterSituacoesTributarias().length, 21);
			test.done();
		}
	},

	pis: {
		'Verifica que retorna quantidade correta de STs': function(test) {
			test.equal(nfe.pis.obterSituacoesTributarias().length, 33);
			test.done();
		},
	},

	ipi: {
		'Verifica que retorna quantidade correta de STs': function(test) {
			test.equal(nfe.ipi.obterSituacoesTributarias().length, 14);
			test.done();
		},
	},

	cofins: {
		'Verifica que retorna quantidade correta de STs': function(test) {
			test.equal(nfe.cofins.obterSituacoesTributarias().length, 33);
			test.done();
		},
	},

	obterOrigens: {
		'Verifique que retorna quantidade correta de origens': function(test) {
			test.equal(nfe.obterOrigens().length, 9);
			test.done();
		},
	}
};
