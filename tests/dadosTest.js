var brazilianutils = require('brazilianutils'),
    groupBySync = brazilianutils.array.groupBySync,
    values = brazilianutils.object.values,
    dados = require('../brazilian').dados;

var existsSync = (process.version.indexOf('v0.6') !== -1 ? require('path').existsSync : existsSync = require('fs').existsSync);

module.exports = {

    siglas: {
        'Verifica que retorna um object e tem o numero correto de siglas': function(test) {
            var siglas = dados.siglas;
            test.equals(Object.keys(siglas).length, 33);
            test.done();
        },
    },

    cnaesArray: {
        'Verifica o numero correto de CNAES e que todos tem 7 digitos': function(test) {
            var cnaes = require(dados.cnaesArray),
                quantidade = 0;

            cnaes.forEach(function(cnae) {
                quantidade++;
                test.equal(cnae.codigo.length, 7);
            });

            test.equal(1318, quantidade);
            test.done();
        },
    },

    cnaesHash: {
        'Verifica o numero correto de CNAEs e que todos tem 7 digitos': function(test) {
            var cnaes = Object.keys(require(dados.cnaesHash));

            cnaes.forEach(function(cnae) {
                test.equal(cnae.length, 7);
            });

            test.equal(1318, cnaes.length);
            test.done();
        },
    },

    ncmsArray: {
        // Atenção: Os seguintes NCMS são os únicos que não possuem 8 digitos
        //
        // 4810
        // 48101
        // 481013
        // 4810138
        // 030289
        // v09096290

        'Verifica que é fornecido o caminho ao invés do objeto': function(test) {
            test.equal(typeof dados.ncmsArray, 'string')
            test.done();
        },

        'Verifica a quantidade de ncms': function(test) {
            var ncms = require(dados.ncmsArray);

            test.equal(ncms.length, 12028);
            test.done();
        },
    },

    ncmsDicionario: {
        // Será removido em 01/01/2016

        // Atenção: Os seguintes NCMS são os únicos que não possuem 8 digitos
        //
        // 4810
        // 48101
        // 481013
        // 4810138
        // 030289
        // v09096290

        'Verifica que é fornecido o caminho ao invés do objeto': function(test) {
            test.equal(typeof dados.ncmsDicionario, 'string')
            test.done();
        },

        'Verifica a quantidade de ncms': function(test) {
            var ncms = require(dados.ncmsDicionario);

            test.equal(Object.keys(ncms).length, 12025); //3 código estão repetidos nesta listagem
            test.done();
        },
    },

    ncmsHash: {
        // Atenção: Os seguintes NCMS são os únicos que não possuem 8 digitos
        //
        // 4810
        // 48101
        // 481013
        // 4810138
        // 030289
        // v09096290

        'Verifica que é fornecido o caminho ao invés do objeto': function(test) {
            test.equal(typeof dados.ncmsHash, 'string')
            test.done();
        },

        'Verifica a quantidade de ncms': function(test) {
            var ncms = require(dados.ncmsHash);

            test.equal(Object.keys(ncms).length, 12025); //3 código estão repetidos nesta listagem
            test.done();
        },
    },

    codigosDDD: {
        'Existem 67 DDDs e eles são do tipo número': function(test) {

            dados.codigosDDD.forEach(function(ddd) {
                test.ok(typeof ddd === 'number');
            });

            test.expect(67);
            test.done();
        },
    },

    codigosDDDDicionario: {
        'Existem 67 DDDs e eles arrays com estados': function(test) {
            Object.keys(dados.codigosDDDDicionario).forEach(function(ddd) {
                var estados = dados.codigosDDDDicionario[ddd];

                test.ok(Array.isArray(estados));
                estados.forEach(function(estado) {
                    test.ok(dados.siglasDosEstados.indexOf(estado) > -1);
                });
            });

            test.done();
        },
    },

    naturezasJuridicas: {
        'Verifica que existe o número correto de naturezas jurídicas': function(test){
            test.equal(dados.naturezasJuridicas.length, 66);

            test.done();
        },

        'Verifica que todas as naturezas jurídicas são dos únicos 5 tipos possíveis': function(test) {
            var tiposDeNaturezaJuridica = ['Administração Pública',
                                           'Entidades Empresariais',
                                           'Entidades Sem Fins Lucrativos',
                                           'Pessoas Físicas',
                                           'Instituições Extraterritoriais'];

            dados.naturezasJuridicas.forEach(function(naturezaJuridica) {
                test.notEqual(tiposDeNaturezaJuridica.indexOf(naturezaJuridica.tipo), -1);
            });

            test.done();
        }
    },

    codigosDasNaturezasJuridicas: {
        'Verifica que existe o número correto de códigos de natureza jurídica': function(test) {
            dados.codigosDasNaturezasJuridicas.forEach(function(nj) {
                test.ok(nj);
            });

            test.expect(66);
            test.done();
        },
    },

    regioes: {
        'Verifica que uma string com o caminho é fornecido ao invés de um objeto': function(test) {
            test.equal(typeof dados.regioes, 'string');
            test.ok(existsSync(dados.regioes));

            test.done();
        }
    },

    bancosArray: {
        //FONTE: http://www.febraban.org.br/bancos.asp
        //DATA: 29/07/2014

        'Verifica que uma string com o caminho é fornecido ao invés de um objeto': function(test) {
            test.equal(typeof dados.bancosArray, 'string');
            test.ok(existsSync(dados.bancosArray));

            test.done();
        },

        'Verifica que o número correto de bancos é retornado': function(test) {
            var bancos = require(dados.bancosArray);

            test.equal(bancos.length, 215);
            test.done();
        }
    },

    obterBancosComCodigo: {
        'Verifica que apenas bancos com codigo febraban são retornados': function(test) {
            var bancosComCodigo = dados.obterBancosComCodigo();

            bancosComCodigo.forEach(function(banco) {
                test.ok(banco.codigo !== '');
            });

            test.equal(bancosComCodigo.length, 175);
            test.done();
        },

        'Verifica que não existem bancos repetidos (com o mesmo código mais de uma vez)': function(test) {
            var bancosComCodigo = dados.obterBancosComCodigo();

            values(groupBySync(bancosComCodigo, function(banco) {
                return banco.codigo;
            })).forEach(function(bancos) {
                test.equal(bancos.length, 1);
            });

            test.done();
        }
    },

    obterBancoPorCodigo: {
        'Verifica que encontra corretamente o banco solicitado': function(test) {
            test.equal(dados.obterBancoPorCodigo('001').nome, 'Banco do Brasil S.A.');
            test.equal(dados.obterBancoPorCodigo('341').nome, 'Itaú Unibanco S.A.');
            test.equal(dados.obterBancoPorCodigo('237').nome, 'Banco Bradesco S.A.');
            test.done();
        },

        'Verifica que retorna nulo caso passe um código inexistente': function(test) {
            test.equal(dados.obterBancoPorCodigo('XXX'), null);
            test.done();
        },

        'Verifica que retorna nulo caso passe string vazia': function(test) {
            test.equal(dados.obterBancoPorCodigo(''), null);
            test.done();
        }
    },

    obterBancosPorNome: {
        'Verifica que se obtem os bancos desejados passando apenas uma parte do nome': function(test) {
            test.equal(dados.obterBancosPorNome('   brasil  ').length, 47);
            test.equal(dados.obterBancosPorNome('bradésç   ').length, 3);
            test.equal(dados.obterBancosPorNome('itau').length, 7);

            test.done();
        }
    },

    municipiosDicionario: {
        // Será removido em 01/01/0216
        'Verifica que uma string com o caminho é fornecido ao invés de um objeto': function(test){
            test.equal(typeof dados.municipiosDicionario, 'string');
            test.ok(existsSync(dados.municipiosDicionario));

            test.done();
        }
    },

    municipiosHash: {
        'Verifica que uma string com o caminho é fornecido ao invés de um objeto': function(test){
            test.equal(typeof dados.municipiosHash, 'string');
            test.ok(existsSync(dados.municipiosHash));

            test.done();
        }
    },

    municipiosArray: {
        'Verifica que uma string com o caminho é fornecido ao invés de um objeto': function(test){
            test.equal(typeof dados.municipiosArray, 'string');
            test.ok(existsSync(dados.municipiosArray));

            test.done();
        }
    },

    paisesArray: {
        'Verifica que uma string com o caminho é fornecido ao invés de um objeto': function(test){
            test.equal(typeof dados.paisesArray, 'string');
            test.ok(existsSync(dados.paisesArray));

            test.done();
        },

        'Verifica que contém os 249 países permitidos no último layout da NF-e': function(test) {
            var paisesArray = require(dados.paisesArray);
            test.equal(paisesArray.length, 249);
            test.done();
        }
    },

    paisesHash: {
        'Verifica que uma string com o caminho é fornecido ao invés de um objeto': function(test){
            test.equal(typeof dados.paisesHash, 'string');
            test.ok(existsSync(dados.paisesHash));

            test.done();
        },

        'Verifica que contém os 249 países permitidos no último layout da NF-e': function(test) {
            var paisesHash = require(dados.paisesHash);
            test.equal(Object.keys(paisesHash).length, 249);
            test.done();
        }
    },

    cfopsDicionario: {
        // Será removido em 01/01/2016
        'Verifica que uma string com o caminho é fornecido ao invés de um objeto': function(test){
            test.equal(typeof dados.cfopsDicionario, 'string');
            test.ok(existsSync(dados.cfopsDicionario));

            test.done();
        }
    },

    cfopsHash: {
        'Verifica que uma string com o caminho é fornecido ao invés de um objeto': function(test){
            test.equal(typeof dados.cfopsHash, 'string');
            test.ok(existsSync(dados.cfopsHash));

            test.done();
        }
    },

    cfopsArray: {
        'Verifica que uma string com o caminho é fornecido ao invés de um objeto': function(test){
            test.equal(typeof dados.cfopsArray, 'string');
            test.ok(existsSync(dados.cfopsArray));

            test.done();
        }
    },

    tabelaIbgeDeEstados: {
        'Verifica que existem 27 estados': function(test){
            test.equal(dados.tabelaIbgeDeEstados.length, 27);
            test.done();
        }
    },

    obterEstadosPorRegiao: {
        'Verifica que estados corretos são retornados': function(test){
            test.deepEqual(dados.obterEstadosPorRegiao('norte'),
                    [
                        { codigo: 12, regiao: 'Norte', nome: 'Acre', abreviacao: 'AC' },
                        { codigo: 16, regiao: 'Norte', nome: 'Amapá', abreviacao: 'AP' },
                        { codigo: 13, regiao: 'Norte', nome: 'Amazonas', abreviacao: 'AM' },
                        { codigo: 15, regiao: 'Norte', nome: 'Pará', abreviacao: 'PA' },
                        { codigo: 11, regiao: 'Norte', nome: 'Rondônia', abreviacao: 'RO' },
                        { codigo: 14, regiao: 'Norte', nome: 'Roraima', abreviacao: 'RR' },
                        { codigo: 17, regiao: 'Norte', nome: 'Tocantins', abreviacao: 'TO' }
                    ]);

            test.deepEqual(dados.obterEstadosPorRegiao('nordeste'),
                    [
                        { codigo: 27, regiao: 'Nordeste', nome: 'Alagoas', abreviacao: 'AL' },
                        { codigo: 29, regiao: 'Nordeste', nome: 'Bahia', abreviacao: 'BA' },
                        { codigo: 23, regiao: 'Nordeste', nome: 'Ceará', abreviacao: 'CE' },
                        { codigo: 21, regiao: 'Nordeste', nome: 'Maranhão', abreviacao: 'MA' },
                        { codigo: 25, regiao: 'Nordeste', nome: 'Paraíba', abreviacao: 'PB' },
                        { codigo: 26, regiao: 'Nordeste', nome: 'Pernambuco', abreviacao: 'PE' },
                        { codigo: 22, regiao: 'Nordeste', nome: 'Piauí', abreviacao: 'PI' },
                        { codigo: 24, regiao: 'Nordeste', nome: 'Rio Grande do Norte', abreviacao: 'RN' },
                        { codigo: 28, regiao: 'Nordeste', nome: 'Sergipe', abreviacao: 'SE' },
                    ]);

            test.deepEqual(dados.obterEstadosPorRegiao('sudeste'),
                    [
                        { codigo: 32, regiao: 'Sudeste', nome: 'Espírito Santo', abreviacao: 'ES' },
                        { codigo: 31, regiao: 'Sudeste', nome: 'Minas Gerais', abreviacao: 'MG' },
                        { codigo: 33, regiao: 'Sudeste', nome: 'Rio de Janeiro', abreviacao: 'RJ' },
                        { codigo: 35, regiao: 'Sudeste', nome: 'São Paulo', abreviacao: 'SP' }
                    ]);

            test.deepEqual(dados.obterEstadosPorRegiao('sul'),
                    [
                        { codigo: 41, regiao: 'Sul', nome: 'Paraná', abreviacao: 'PR' },
                        { codigo: 43, regiao: 'Sul', nome: 'Rio Grande do Sul', abreviacao: 'RS' },
                        { codigo: 42, regiao: 'Sul', nome: 'Santa Catarina', abreviacao: 'SC' }
                    ]);

            test.deepEqual(dados.obterEstadosPorRegiao('centro-Oeste'),
                    [
                        { codigo: 53, regiao: 'Centro-Oeste', nome: 'Distrito Federal', abreviacao: 'DF' },
                        { codigo: 52, regiao: 'Centro-Oeste', nome: 'Goiás', abreviacao: 'GO' },
                        { codigo: 51, regiao: 'Centro-Oeste', nome: 'Mato Grosso', abreviacao: 'MT' },
                        { codigo: 50, regiao: 'Centro-Oeste', nome: 'Mato Grosso do Sul', abreviacao: 'MS' }
                    ]);

            test.done();
        }
    },

    siglasDosEstados: {
        'Verifica que contém 27 siglas': function(test){
            test.equal(dados.siglasDosEstados.length, 27);

            test.done();
        }
    },

    obterEstado: {
        'Verifica que pode-se obter o estado pelo código ibge': function(test){
            test.deepEqual(dados.obterEstado(11), { codigo: 11, regiao: 'Norte', nome: 'Rondônia', abreviacao: 'RO' });
            test.deepEqual(dados.obterEstado(12), { codigo: 12, regiao: 'Norte', nome: 'Acre', abreviacao: 'AC' });
            test.deepEqual(dados.obterEstado(13), { codigo: 13, regiao: 'Norte', nome: 'Amazonas', abreviacao: 'AM' });
            test.deepEqual(dados.obterEstado(14), { codigo: 14, regiao: 'Norte', nome: 'Roraima', abreviacao: 'RR' });
            test.deepEqual(dados.obterEstado(15), { codigo: 15, regiao: 'Norte', nome: 'Pará', abreviacao: 'PA' });
            test.deepEqual(dados.obterEstado(16), { codigo: 16, regiao: 'Norte', nome: 'Amapá', abreviacao: 'AP' });
            test.deepEqual(dados.obterEstado(17), { codigo: 17, regiao: 'Norte', nome: 'Tocantins', abreviacao: 'TO' });
            test.deepEqual(dados.obterEstado(21), { codigo: 21, regiao: 'Nordeste', nome: 'Maranhão', abreviacao: 'MA' });
            test.deepEqual(dados.obterEstado(22), { codigo: 22, regiao: 'Nordeste', nome: 'Piauí', abreviacao: 'PI' });
            test.deepEqual(dados.obterEstado(23), { codigo: 23, regiao: 'Nordeste', nome: 'Ceará', abreviacao: 'CE' });
            test.deepEqual(dados.obterEstado(24), { codigo: 24, regiao: 'Nordeste', nome: 'Rio Grande do Norte', abreviacao: 'RN' });
            test.deepEqual(dados.obterEstado(25), { codigo: 25, regiao: 'Nordeste', nome: 'Paraíba', abreviacao: 'PB' });
            test.deepEqual(dados.obterEstado(26), { codigo: 26, regiao: 'Nordeste', nome: 'Pernambuco', abreviacao: 'PE' });
            test.deepEqual(dados.obterEstado(27), { codigo: 27, regiao: 'Nordeste', nome: 'Alagoas', abreviacao: 'AL' });
            test.deepEqual(dados.obterEstado(28), { codigo: 28, regiao: 'Nordeste', nome: 'Sergipe', abreviacao: 'SE' });
            test.deepEqual(dados.obterEstado(29), { codigo: 29, regiao: 'Nordeste', nome: 'Bahia', abreviacao: 'BA' });
            test.deepEqual(dados.obterEstado(31), { codigo: 31, regiao: 'Sudeste', nome: 'Minas Gerais', abreviacao: 'MG' });
            test.deepEqual(dados.obterEstado(32), { codigo: 32, regiao: 'Sudeste', nome: 'Espírito Santo', abreviacao: 'ES' });
            test.deepEqual(dados.obterEstado(33), { codigo: 33, regiao: 'Sudeste', nome: 'Rio de Janeiro', abreviacao: 'RJ' });
            test.deepEqual(dados.obterEstado(35), { codigo: 35, regiao: 'Sudeste', nome: 'São Paulo', abreviacao: 'SP' });
            test.deepEqual(dados.obterEstado(41), { codigo: 41, regiao: 'Sul', nome: 'Paraná', abreviacao: 'PR' });
            test.deepEqual(dados.obterEstado(42), { codigo: 42, regiao: 'Sul', nome: 'Santa Catarina', abreviacao: 'SC' });
            test.deepEqual(dados.obterEstado(43), { codigo: 43, regiao: 'Sul', nome: 'Rio Grande do Sul', abreviacao: 'RS' });
            test.deepEqual(dados.obterEstado(50), { codigo: 50, regiao: 'Centro-Oeste', nome: 'Mato Grosso do Sul', abreviacao: 'MS' });
            test.deepEqual(dados.obterEstado(51), { codigo: 51, regiao: 'Centro-Oeste', nome: 'Mato Grosso', abreviacao: 'MT' });
            test.deepEqual(dados.obterEstado(52), { codigo: 52, regiao: 'Centro-Oeste', nome: 'Goiás', abreviacao: 'GO' });
            test.deepEqual(dados.obterEstado(53), { codigo: 53, regiao: 'Centro-Oeste', nome: 'Distrito Federal', abreviacao: 'DF' });

            test.done();
        },

        'Verifica que pode-se obter o estado pelo código do município': function(test) {

            test.deepEqual(dados.obterEstado('3552205'), { codigo: 35, regiao: 'Sudeste', nome: 'São Paulo', abreviacao: 'SP' });

            test.done();
        },

        'Verifica que pode-se obter o estado pela abreviação do uf': function(test){
            test.deepEqual(dados.obterEstado('RO'), { codigo: 11, regiao: 'Norte', nome: 'Rondônia', abreviacao: 'RO' });
            test.deepEqual(dados.obterEstado('AC'), { codigo: 12, regiao: 'Norte', nome: 'Acre', abreviacao: 'AC' });
            test.deepEqual(dados.obterEstado('AM'), { codigo: 13, regiao: 'Norte', nome: 'Amazonas', abreviacao: 'AM' });
            test.deepEqual(dados.obterEstado('RR'), { codigo: 14, regiao: 'Norte', nome: 'Roraima', abreviacao: 'RR' });
            test.deepEqual(dados.obterEstado('PA'), { codigo: 15, regiao: 'Norte', nome: 'Pará', abreviacao: 'PA' });
            test.deepEqual(dados.obterEstado('AP'), { codigo: 16, regiao: 'Norte', nome: 'Amapá', abreviacao: 'AP' });
            test.deepEqual(dados.obterEstado('TO'), { codigo: 17, regiao: 'Norte', nome: 'Tocantins', abreviacao: 'TO' });
            test.deepEqual(dados.obterEstado('MA'), { codigo: 21, regiao: 'Nordeste', nome: 'Maranhão', abreviacao: 'MA' });
            test.deepEqual(dados.obterEstado('PI'), { codigo: 22, regiao: 'Nordeste', nome: 'Piauí', abreviacao: 'PI' });
            test.deepEqual(dados.obterEstado('CE'), { codigo: 23, regiao: 'Nordeste', nome: 'Ceará', abreviacao: 'CE' });
            test.deepEqual(dados.obterEstado('RN'), { codigo: 24, regiao: 'Nordeste', nome: 'Rio Grande do Norte', abreviacao: 'RN' });
            test.deepEqual(dados.obterEstado('PB'), { codigo: 25, regiao: 'Nordeste', nome: 'Paraíba', abreviacao: 'PB' });
            test.deepEqual(dados.obterEstado('PE'), { codigo: 26, regiao: 'Nordeste', nome: 'Pernambuco', abreviacao: 'PE' });
            test.deepEqual(dados.obterEstado('AL'), { codigo: 27, regiao: 'Nordeste', nome: 'Alagoas', abreviacao: 'AL' });
            test.deepEqual(dados.obterEstado('SE'), { codigo: 28, regiao: 'Nordeste', nome: 'Sergipe', abreviacao: 'SE' });
            test.deepEqual(dados.obterEstado('BA'), { codigo: 29, regiao: 'Nordeste', nome: 'Bahia', abreviacao: 'BA' });
            test.deepEqual(dados.obterEstado('MG'), { codigo: 31, regiao: 'Sudeste', nome: 'Minas Gerais', abreviacao: 'MG' });
            test.deepEqual(dados.obterEstado('ES'), { codigo: 32, regiao: 'Sudeste', nome: 'Espírito Santo', abreviacao: 'ES' });
            test.deepEqual(dados.obterEstado('RJ'), { codigo: 33, regiao: 'Sudeste', nome: 'Rio de Janeiro', abreviacao: 'RJ' });
            test.deepEqual(dados.obterEstado('SP'), { codigo: 35, regiao: 'Sudeste', nome: 'São Paulo', abreviacao: 'SP' });
            test.deepEqual(dados.obterEstado('PR'), { codigo: 41, regiao: 'Sul', nome: 'Paraná', abreviacao: 'PR' });
            test.deepEqual(dados.obterEstado('SC'), { codigo: 42, regiao: 'Sul', nome: 'Santa Catarina', abreviacao: 'SC' });
            test.deepEqual(dados.obterEstado('RS'), { codigo: 43, regiao: 'Sul', nome: 'Rio Grande do Sul', abreviacao: 'RS' });
            test.deepEqual(dados.obterEstado('MS'), { codigo: 50, regiao: 'Centro-Oeste', nome: 'Mato Grosso do Sul', abreviacao: 'MS' });
            test.deepEqual(dados.obterEstado('MT'), { codigo: 51, regiao: 'Centro-Oeste', nome: 'Mato Grosso', abreviacao: 'MT' });
            test.deepEqual(dados.obterEstado('GO'), { codigo: 52, regiao: 'Centro-Oeste', nome: 'Goiás', abreviacao: 'GO' });
            test.deepEqual(dados.obterEstado('DF'), { codigo: 53, regiao: 'Centro-Oeste', nome: 'Distrito Federal', abreviacao: 'DF' });

            test.done();
        },

        'Verifica que pode-se obter o estado pelo nome': function(test){
            test.deepEqual(dados.obterEstado('Rondônia'), { codigo: 11, regiao: 'Norte', nome: 'Rondônia', abreviacao: 'RO' });
            test.deepEqual(dados.obterEstado('Acre'), { codigo: 12, regiao: 'Norte', nome: 'Acre', abreviacao: 'AC' });
            test.deepEqual(dados.obterEstado('Amazonas'), { codigo: 13, regiao: 'Norte', nome: 'Amazonas', abreviacao: 'AM' });
            test.deepEqual(dados.obterEstado('Roraima'), { codigo: 14, regiao: 'Norte', nome: 'Roraima', abreviacao: 'RR' });
            test.deepEqual(dados.obterEstado('Pará'), { codigo: 15, regiao: 'Norte', nome: 'Pará', abreviacao: 'PA' });
            test.deepEqual(dados.obterEstado('Amapá'), { codigo: 16, regiao: 'Norte', nome: 'Amapá', abreviacao: 'AP' });
            test.deepEqual(dados.obterEstado('Tocantins'), { codigo: 17, regiao: 'Norte', nome: 'Tocantins', abreviacao: 'TO' });
            test.deepEqual(dados.obterEstado('Maranhão'), { codigo: 21, regiao: 'Nordeste', nome: 'Maranhão', abreviacao: 'MA' });
            test.deepEqual(dados.obterEstado('Piauí'), { codigo: 22, regiao: 'Nordeste', nome: 'Piauí', abreviacao: 'PI' });
            test.deepEqual(dados.obterEstado('Ceará'), { codigo: 23, regiao: 'Nordeste', nome: 'Ceará', abreviacao: 'CE' });
            test.deepEqual(dados.obterEstado('Rio Grande do Norte'), { codigo: 24, regiao: 'Nordeste', nome: 'Rio Grande do Norte', abreviacao: 'RN' });
            test.deepEqual(dados.obterEstado('Paraíba'), { codigo: 25, regiao: 'Nordeste', nome: 'Paraíba', abreviacao: 'PB' });
            test.deepEqual(dados.obterEstado('Pernambuco'), { codigo: 26, regiao: 'Nordeste', nome: 'Pernambuco', abreviacao: 'PE' });
            test.deepEqual(dados.obterEstado('Alagoas'), { codigo: 27, regiao: 'Nordeste', nome: 'Alagoas', abreviacao: 'AL' });
            test.deepEqual(dados.obterEstado('Sergipe'), { codigo: 28, regiao: 'Nordeste', nome: 'Sergipe', abreviacao: 'SE' });
            test.deepEqual(dados.obterEstado('Bahia'), { codigo: 29, regiao: 'Nordeste', nome: 'Bahia', abreviacao: 'BA' });
            test.deepEqual(dados.obterEstado('Minas Gerais'), { codigo: 31, regiao: 'Sudeste', nome: 'Minas Gerais', abreviacao: 'MG' });
            test.deepEqual(dados.obterEstado('Espírito Santo'), { codigo: 32, regiao: 'Sudeste', nome: 'Espírito Santo', abreviacao: 'ES' });
            test.deepEqual(dados.obterEstado('Rio de Janeiro'), { codigo: 33, regiao: 'Sudeste', nome: 'Rio de Janeiro', abreviacao: 'RJ' });
            test.deepEqual(dados.obterEstado('São Paulo'), { codigo: 35, regiao: 'Sudeste', nome: 'São Paulo', abreviacao: 'SP' });
            test.deepEqual(dados.obterEstado('Paraná'), { codigo: 41, regiao: 'Sul', nome: 'Paraná', abreviacao: 'PR' });
            test.deepEqual(dados.obterEstado('Santa Catarina'), { codigo: 42, regiao: 'Sul', nome: 'Santa Catarina', abreviacao: 'SC' });
            test.deepEqual(dados.obterEstado('Rio Grande do Sul'), { codigo: 43, regiao: 'Sul', nome: 'Rio Grande do Sul', abreviacao: 'RS' });
            test.deepEqual(dados.obterEstado('Mato Grosso do Sul'), { codigo: 50, regiao: 'Centro-Oeste', nome: 'Mato Grosso do Sul', abreviacao: 'MS' });
            test.deepEqual(dados.obterEstado('Mato Grosso'), { codigo: 51, regiao: 'Centro-Oeste', nome: 'Mato Grosso', abreviacao: 'MT' });
            test.deepEqual(dados.obterEstado('Goiás'), { codigo: 52, regiao: 'Centro-Oeste', nome: 'Goiás', abreviacao: 'GO' });
            test.deepEqual(dados.obterEstado('Distrito Federal'), { codigo: 53, regiao: 'Centro-Oeste', nome: 'Distrito Federal', abreviacao: 'DF' });

            test.done();
        }
    },

    feriadosNacionaisArray: {
    	'Verifica que retorna-se a string com o caminho para o dados': function(test) {
    		test.equal(typeof dados.feriadosNacionaisArray, 'string');
    		test.done();
    	},

    	'Verifica que o caminho esta correto e pode-se fazer require': function(test) {

    		test.doesNotThrow(function() {
    			var feriados = require(dados.feriadosNacionaisArray);
    		})

    		test.done();
    	},

    	'Verifica que existem apenas 8 feriados nacionais': function(test) {
    		var feriados = require(dados.feriadosNacionaisArray);

    		test.equal(feriados.length, 8);
    		test.done();
    	},
    },

    feriadosEstaduaisHash: {
    	'Verifica que retorna-se a string com o caminho para o dados': function(test) {
    		test.equal(typeof dados.feriadosEstaduaisHash, 'string');
    		test.done();
    	},

       	'Verifica que o caminho esta correto e pode-se fazer require': function(test) {

    		test.doesNotThrow(function() {
    			var feriados = require(dados.feriadosEstaduaisHash);
    		})

    		test.done();
    	},

    	'Verifica que o hash possui 27 chaves (uma para cada estado)': function(test) {
    		var feriadosEstaduais = require(dados.feriadosEstaduaisHash);

    		test.equal(Object.keys(feriadosEstaduais).length, 27);
    		test.done();
    	},
    },

    eFeriadoEstadual: {

    },

    obterFeriados: {
        'Verifica que os feriados nacionais e estaduais são retornados corretamente': function(test) {
        	var feriadosNacionaisExpected = [
                { data: "01/01", descricao: "Confraternização Universal" },
                { data: "21/04", descricao: "Tiradentes" },
                { data: "01/05", descricao: "Dia do Trabalho" },
                { data: "07/09", descricao: "Independência do Brasil" },
                { data: "12/10", descricao: "Nossa Senhora Aparecida" },
                { data: "02/11", descricao: "Finados" },
                { data: "15/11", descricao: "Proclamação da República" },
                { data: "25/12", descricao: "Natal" }
            ];

            test.deepEqual(dados.obterFeriados(), feriadosNacionaisExpected);

            test.deepEqual(dados.obterFeriados('AC'), feriadosNacionaisExpected.concat([
                { data: "23/01", descricao: "Dia do evangélico" },
                { data: "08/03", descricao: "Alusivo ao Dia Internacional da Mulher" },
                { data: "15/06", descricao: "Aniversário do estado" },
                { data: "05/09", descricao: "Dia da Amazônia" }
            ]));

            test.deepEqual(dados.obterFeriados('AL'), feriadosNacionaisExpected.concat([
                { data: "24/06", descricao: "São João" },
                { data: "29/06", descricao: "São Pedro" },
                { data: "16/09", descricao: "Emancipação política" },
                { data: "20/11", descricao: "Morte de Zumbi dos Palmares" }
            ]));

            test.deepEqual(dados.obterFeriados('AP'), feriadosNacionaisExpected.concat([
                { data: "19/03", descricao: "Dia de São José, santo padroeiro do Estado do Amapá" },
                { data: "13/09", descricao: "Criação do Território Federal (Data Magna do estado)" }
            ]));

            test.deepEqual(dados.obterFeriados('AM'), feriadosNacionaisExpected.concat([
                { data: "05/09", descricao: "Elevação do Amazonas à categoria de província" },
                { data: "20/11", descricao: "Dia da Consciência Negra" }
            ]));

            test.deepEqual(dados.obterFeriados('BA'), feriadosNacionaisExpected.concat([
                { data: "02/07", descricao: "Independência da Bahia (Data magna do estado)" }
            ]));

            test.deepEqual(dados.obterFeriados('CE'), feriadosNacionaisExpected.concat([
                { data: "25/03", descricao: "Data magna do estado (data da abolição da escravidão no Ceará)" }
           	]));

            test.deepEqual(dados.obterFeriados('DF'), feriadosNacionaisExpected.concat([
                { data: "21/04", descricao: "Fundação de Brasília" },
                { data: "30/11", descricao: "Dia do evangélico" }
	        ]));

            test.deepEqual(dados.obterFeriados('MA'), feriadosNacionaisExpected.concat([
                { data: "28/06", descricao: "Adesão do Maranhão à independência do Brasil" }
            ]));

            test.deepEqual(dados.obterFeriados('MT'), feriadosNacionaisExpected.concat([
                { data: "20/11", descricao: "Dia da Consciência Negra" }
            ]));

            test.deepEqual(dados.obterFeriados('MS'), feriadosNacionaisExpected.concat([
                { data: "11/10", descricao: "Criação do estado" }
           	]));

            test.deepEqual(dados.obterFeriados('MG'), feriadosNacionaisExpected.concat([
                { data: "21/04", descricao: "Data magna do estado" }
           	]));

            test.deepEqual(dados.obterFeriados('PA'), feriadosNacionaisExpected.concat([
                { data: "15/08", descricao: "Adesão do Grão-Pará à independência do Brasil (data magna)" }
            ]));

            test.deepEqual(dados.obterFeriados('PB'), feriadosNacionaisExpected.concat([
                { data: "26/07", descricao: "Homenagem à memória do ex-presidente João Pessoa" },
                { data: "05/08", descricao: "Fundação do Estado em 1585" }
           	]));

            test.deepEqual(dados.obterFeriados('PR'), feriadosNacionaisExpected.concat([
                { data: "19/12", descricao: "Emancipação política (emancipação do Paraná)" }
            ]));

            test.deepEqual(dados.obterFeriados('PE'), feriadosNacionaisExpected.concat([]));

            test.deepEqual(dados.obterFeriados('PI'), feriadosNacionaisExpected.concat([
                { data: "19/10", descricao: "Dia do Piauí" }
           	]));

            test.deepEqual(dados.obterFeriados('RJ'), feriadosNacionaisExpected.concat([
                { data: "23/04", descricao: "Dia de São Jorge" },
                { data: "20/11", descricao: "Dia da Consciência Negra" }
           	]));

            test.deepEqual(dados.obterFeriados('RN'), feriadosNacionaisExpected.concat([
                { data: "03/10", descricao: "Mártires de Cunhaú e Uruaçu" }
            ]));

            test.deepEqual(dados.obterFeriados('RS'), feriadosNacionaisExpected.concat([
                { data: "20/09", descricao: "Proclamação da República Rio-Grandense" }
         	]));

            test.deepEqual(dados.obterFeriados('RO'), feriadosNacionaisExpected.concat([
            	{ data: "04/01", descricao: "Criação do estado (data magna)" },
                { data: "18/06", descricao: "Dia do evangélico" }
            ]));

            test.deepEqual(dados.obterFeriados('RR'), feriadosNacionaisExpected.concat([
                { data: "05/10", descricao: "Criação do estado" }
            ]));

            test.deepEqual(dados.obterFeriados('SC'), feriadosNacionaisExpected.concat([]));

            test.deepEqual(dados.obterFeriados('SP'), feriadosNacionaisExpected.concat([
                { data: "09/07", descricao: "Revolução Constitucionalista de 1932 (Data magna do estado)" }
           	]));

            test.deepEqual(dados.obterFeriados('SE'), feriadosNacionaisExpected.concat([
        	    { data: "08/07", descricao: "Autonomia política de Sergipe" }
           	]));

            test.deepEqual(dados.obterFeriados('TO'), feriadosNacionaisExpected.concat([
                { data: "05/10", descricao: "Criação do estado" },
                { data: "18/03", descricao: "Autonomia do Estado (criação da Comarca do Norte)" },
                { data: "08/09", descricao: "Padroeira do Estado (Nossa Senhora da Natividade)" }
            ]));

            test.done();
        }
    },

    eFeriado: {
        "Verifica que é feriado": function(test) {
            test.ok(dados.eFeriado("01/01"));
            test.ok(dados.eFeriado(new Date(2014, 0, 1)));
            test.ok(dados.eFeriado("07/09"));
            test.ok(dados.eFeriado(new Date(2014, 8, 7)));
			test.ok(dados.eFeriado("21/04"));
            test.ok(dados.eFeriado(new Date(2014, 3, 21)));
            test.ok(dados.eFeriado("01/01", "AC"));
            test.ok(dados.eFeriado("23/01", "ac"));
            test.ok(dados.eFeriado("29/06", "AL"));
            test.ok(dados.eFeriado("19/03", "ap"));
            test.ok(dados.eFeriado("05/09", "AM"));
            test.ok(dados.eFeriado("02/07", "ba"));
            test.ok(dados.eFeriado("25/03", "CE"));
            test.ok(dados.eFeriado("21/04", "df"));
            test.ok(dados.eFeriado("28/06", "MA"));
            test.ok(dados.eFeriado("20/11", "mt"));
            test.ok(dados.eFeriado("11/10", "MS"));
            test.ok(dados.eFeriado("21/04", "mg"));
            test.ok(dados.eFeriado("15/08", "PA"));
            test.ok(dados.eFeriado("26/07", "pb"));
            test.ok(dados.eFeriado("19/12", "PR"));
            test.ok(dados.eFeriado("19/10", "pi"));
            test.ok(dados.eFeriado("23/04", "RJ"));
            test.ok(dados.eFeriado("03/10", "rn"));
            test.ok(dados.eFeriado("20/09", "RS"));
            test.ok(dados.eFeriado("04/01", "ro"));
            test.ok(dados.eFeriado("05/10", "RR"));
            test.ok(dados.eFeriado("09/07", "sp"));
            test.ok(dados.eFeriado("08/07", "SE"));
            test.ok(dados.eFeriado("05/10", "to"));

            test.done();
        },

        "Retorna false para para data que não é feriado": function(test) {
            test.ok(!dados.eFeriado("22/01", "AC"));
            test.ok(!dados.eFeriado("27/06", "AL"));
            test.ok(!dados.eFeriado("20/03", "AP"));
            test.ok(!dados.eFeriado("06/09", "AM"));
            test.ok(!dados.eFeriado("03/07", "BA"));
            test.ok(!dados.eFeriado("26/03", "CE"));
            test.ok(!dados.eFeriado("22/04", "DF"));
            test.ok(!dados.eFeriado("27/06", "MA"));
            test.ok(!dados.eFeriado("23/11", "MT"));
            test.ok(!dados.eFeriado("22/04", "MG"));
            test.ok(!dados.eFeriado("16/08", "PA"));
            test.ok(!dados.eFeriado("27/07", "PB"));
            test.ok(!dados.eFeriado("20/02", "PR"));
            test.ok(!dados.eFeriado("20/10", "PI"));
            test.ok(!dados.eFeriado("24/04", "RJ"));
            test.ok(!dados.eFeriado("04/10", "RN"));
            test.ok(!dados.eFeriado("21/09", "RS"));
            test.ok(!dados.eFeriado("05/01", "RO"));
            test.ok(!dados.eFeriado("06/10", "RR"));
            test.ok(!dados.eFeriado("10/07", "SP"));
            test.ok(!dados.eFeriado("09/07", "SE"));
            test.ok(!dados.eFeriado("06/10", "TO"));

            test.done();
        }
    }
};
