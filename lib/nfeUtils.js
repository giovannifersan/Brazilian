'use strict';

var formatacoes = require('./formatacoesUtils'),
    validacoes = require("./validacoesUtils"),
	dados = require("./dadosUtils"),
    sUtils = require("brazilianutils").string,
    mUtils = require("brazilianutils").math,

    util = require('util');

function formatarSerie(serie){
	return sUtils.pad(serie, 3, "0");
}
module.exports.formatarSerie = formatarSerie;

function formatarNumero(numero){
	return sUtils.pad(numero, 9, "0").split("").reduce(function(ultimo, atual, indice){
		if(indice % 3 === 0) {
			return ultimo + "." + atual;
		}

		return ultimo + atual;
	});
}
module.exports.formatarNumero = formatarNumero;

function formatar(chave){
    var naoTem44Numeros = !/^[0-9]{44}$/.test(chave),
        naoTem36Numeros = !/^[0-9]{36}$/.test(chave);

	if(naoTem36Numeros && naoTem44Numeros) {
        return chave;
    }

	return chave.split('').reduceRight(function(elemento, anterior){
		var temp = anterior + elemento;
	    if(temp.replace(/\s/g, '').length % 4 === 0) {
	    	return ' ' + temp;
	    }

	    return temp;
	}).substr(1);
}
module.exports.formatarChaveDeAcesso = formatar;
module.exports.formatarDadosDaNfe = formatar;

// Fonte: http://www.nfe.fazenda.gov.br/portal/disponibilidade.aspx?versao=0.00&tipoConteudo=Skeuqr8PQBY=
function obterAutorizadorPorUf(uf, eContingencia) {
    if(typeof eContingencia === 'undefined') {
        eContingencia = false;
    }

    var autorizadoresNormais = {
            am: 'am', ba: 'ba', ce: 'ce',
            go: 'go', mg: 'mg', ms: 'ms',
            mt: 'mt', pe: 'pe', pr: 'pr',
            rs: 'rs', sp: 'sp',

            ma: 'svan', pa: 'svan', pi: 'svan',

            ac: 'svrs', al: 'svrs', ap: 'svrs',
            df: 'svrs', es: 'svrs', pb: 'svrs',
            rj: 'svrs', rn: 'svrs', ro: 'svrs',
            rr: 'svrs', sc: 'svrs', se: 'svrs',
            to: 'svrs'
        },

        autorizadoresEmContingencia = {
            ac: 'svc-an', al: 'svc-an', ap: 'svc-an',
            df: 'svc-an', es: 'svc-an', mg: 'svc-an',
            pb: 'svc-an', rj: 'svc-an', rn: 'svc-an',
            ro: 'svc-an', rr: 'svc-an', rs: 'svc-an',
            sc: 'svc-an', se: 'svc-an', sp: 'svc-an',
            to: 'svc-an',

            am: 'svc-rs', ba: 'svc-rs', ce: 'svc-rs',
            go: 'svc-rs', ma: 'svc-rs', ms: 'svc-rs',
            mt: 'svc-rs', pa: 'svc-rs', pe: 'svc-rs',
            pi: 'svc-rs', pr: 'svc-rs'
        },

        autorizadores = eContingencia ? autorizadoresEmContingencia : autorizadoresNormais;

    uf = uf && uf.toLowerCase ? uf.toLowerCase() : '';
    return autorizadores[uf] || null;
}

module.exports.obterAutorizadorPorUf = obterAutorizadorPorUf;

function obterMensagemPorCodigo(codigo) {
    return {
        100: 'Autorizado o uso da NF-e',
        101: 'Cancelamento de NF-e homologado',
        102: 'Inutilização de número homologado',
        103: 'Lote recebido com sucesso',
        104: 'Lote processado',
        105: 'Lote em processamento',
        106: 'Lote não localizado',
        107: 'Serviço em Operação',
        108: 'Serviço Paralisado Momentaneamente (curto prazo)',
        109: 'Serviço Paralisado sem Previsão',
        110: 'Uso Denegado',
        111: 'Consulta cadastro com uma ocorrência',
        112: 'Consulta cadastro com mais de uma ocorrência',
        124: 'DPEC recebido pelo Sistema de Contingência Eletrônica',
        125: 'DPEC localizado',
        126: 'Inexiste DPEC para o número de registro de DPEC informado',
        127: 'Inexiste DPEC para a chave de acesso da NF-e informada',
        128: 'Lote de Evento Processado',
        135: 'Evento registrado e vinculado a NF-e',
        136: 'Evento registrado, mas não vinculado a NF-e',
        201: 'Rejeição: O numero máximo de numeração de NF-e a inutilizar ultrapassou o limite',
        202: 'Rejeição: Falha no reconhecimento da autoria ou integridade do arquivo digital',
        203: 'Rejeição: Emissor não habilitado para emissão da NF-e',
        204: 'Rejeição: Duplicidade de NF-e',
        205: 'Rejeição: NF-e está denegada na base de dados da SEFAZ',
        206: 'Rejeição: NF-e já está inutilizada na Base de dados da SEFAZ',
        207: 'Rejeição: CNPJ do emitente inválido',
        208: 'Rejeição: CNPJ do destinatário inválido',
        209: 'Rejeição: IE do emitente inválida',
        210: 'Rejeição: IE do destinatário inválida',
        211: 'Rejeição: IE do substituto inválida',
        212: 'Rejeição: Data de emissão NF-e posterior a data de recebimento',
        213: 'Rejeição: CNPJ-Base do Emitente difere do CNPJ-Base do Certificado Digital',
        214: 'Rejeição: Tamanho da mensagem excedeu o limite estabelecido',
        215: 'Rejeição: Falha no schema XML',
        216: 'Rejeição: Chave de Acesso difere da cadastrada',
        217: 'Rejeição: NF-e não consta na base de dados da SEFAZ',
        218: 'Rejeição: NF-e já esta cancelada na base de dados da SEFAZ',
        219: 'Rejeição: Circulação da NF-e verificada',
        220: 'Rejeição: NF-e autorizada há mais de 7 dias (168 horas)',
        // 220: 'Rejeição: Destinatário com identificação igual à identificação do emitente',
        221: 'Rejeição: Confirmado o recebimento da NF-e pelo destinatário',
        222: 'Rejeição: Protocolo de Autorização de Uso difere do cadastrado',
        223: 'Rejeição: CNPJ do transmissor do lote difere do CNPJ do transmissor da consulta',
        224: 'Rejeição: A faixa inicial é maior que a faixa final',
        225: 'Rejeição: Falha no Schema XML do lote de NFe',
        226: 'Rejeição: Código da UF do Emitente diverge da UF autorizadora',
        227: 'Rejeição: Erro na Chave de Acesso - Campo Id – falta a literal NFe',
        228: 'Rejeição: Data de Emissão muito atrasada',
        229: 'Rejeição: IE do emitente não informada',
        230: 'Rejeição: IE do emitente não cadastrada',
        231: 'Rejeição: IE do emitente não vinculada ao CNPJ',
        232: 'Rejeição: IE do destinatário não informada',
        233: 'Rejeição: IE do destinatário não cadastrada',
        234: 'Rejeição: IE do destinatário não vinculada ao CNPJ',
        235: 'Rejeição: Inscrição SUFRAMA inválida',
        236: 'Rejeição: Chave de Acesso com dígito verificador inválido',
        237: 'Rejeição: CPF do destinatário inválido',
        238: 'Rejeição: Cabeçalho - Versão do arquivo XML superior a Versão vigente',
        239: 'Rejeição: Cabeçalho - Versão do arquivo XML não suportada',
        240: 'Rejeição: Cancelamento/Inutilização - Irregularidade Fiscal do Emitente',
        241: 'Rejeição: Um número da faixa já foi utilizado',
        242: 'Rejeição: Cabeçalho - Falha no Schema XML',
        243: 'Rejeição: XML Mal Formado',
        244: 'Rejeição: CNPJ do Certificado Digital difere do CNPJ da Matriz e do CNPJ do Emitente',
        245: 'Rejeição: CNPJ Emitente não cadastrado',
        246: 'Rejeição: CNPJ Destinatário não cadastrado',
        247: 'Rejeição: Sigla da UF do Emitente diverge da UF autorizadora',
        248: 'Rejeição: UF do Recibo diverge da UF autorizadora',
        249: 'Rejeição: UF da Chave de Acesso diverge da UF autorizadora',
        250: 'Rejeição: UF diverge da UF autorizadora',
        251: 'Rejeição: UF/Município destinatário não pertence a SUFRAMA',
        252: 'Rejeição: Ambiente informado diverge do Ambiente de recebimento',
        253: 'Rejeição: Digito Verificador da chave de acesso composta inválida',
        254: 'Rejeição: NF-e complementar não possui NF referenciada',
        255: 'Rejeição: NF-e complementar possui mais de uma NF referenciada',
        256: 'Rejeição: Uma NF-e da faixa já está inutilizada na Base de dados da SEFAZ',
        257: 'Rejeição: Solicitante não habilitado para emissão da NF-e',
        258: 'Rejeição: CNPJ da consulta inválido',
        259: 'Rejeição: CNPJ da consulta não cadastrado como contribuinte na UF',
        260: 'Rejeição: IE da consulta inválida',
        261: 'Rejeição: IE da consulta não cadastrada como contribuinte na UF',
        262: 'Rejeição: UF não fornece consulta por CPF',
        263: 'Rejeição: CPF da consulta inválido',
        264: 'Rejeição: CPF da consulta não cadastrado como contribuinte na UF',
        265: 'Rejeição: Sigla da UF da consulta difere da UF do Web Service',
        266: 'Rejeição: Série utilizada não permitida no Web Service',
        267: 'Rejeição: NF Complementar referencia uma NF-e inexistente',
        268: 'Rejeição: NF Complementar referencia uma outra NF-e Complementar',
        269: 'Rejeição: CNPJ Emitente da NF Complementar difere do CNPJ da NF Referenciada',
        270: 'Rejeição: Código Município do Fato Gerador de ICMS inexistente',
        271: 'Rejeição: Código Município do Fato Gerador: difere da UF do emitente',
        272: 'Rejeição: Código Município do Emitente inexistente',
        273: 'Rejeição: Código Município do Emitente: difere da UF do emitente',
        274: 'Rejeição: Código Município do Destinatário: dígito inválido',
        275: 'Rejeição: Código Município do Destinatário: difere da UF do Destinatário',
        276: 'Rejeição: Código Município do Local de Retirada: dígito inválido',
        277: 'Rejeição: Código Município do Local de Retirada: difere da UF do Local de Retirada',
        278: 'Rejeição: Código Município do Local de Entrega: dígito inválido',
        279: 'Rejeição: Código Município do Local de Entrega: difere da UF do Local de Entrega',
        280: 'Rejeição: Certificado Transmissor inválido',
        281: 'Rejeição: Certificado Transmissor Data Validade',
        282: 'Rejeição: Certificado Transmissor sem CNPJ',
        283: 'Rejeição: Certificado Transmissor - erro Cadeia de Certificação',
        284: 'Rejeição: Certificado Transmissor revogado',
        285: 'Rejeição: Certificado Transmissor difere ICP-Brasil',
        286: 'Rejeição: Certificado Transmissor erro no acesso a LCR',
        287: 'Rejeição: Código Município do FG - ISSQN: dígito inválido',
        288: 'Rejeição: Código Município do FG - Transporte: dígito inválido',
        289: 'Rejeição: Código da UF informada diverge da UF solicitada',
        290: 'Rejeição: Certificado Assinatura inválido',
        291: 'Rejeição: Certificado Assinatura Data Validade',
        292: 'Rejeição: Certificado Assinatura sem CNPJ',
        293: 'Rejeição: Certificado Assinatura - erro Cadeia de Certificação',
        294: 'Rejeição: Certificado Assinatura revogado',
        295: 'Rejeição: Certificado Assinatura difere ICP-Brasil',
        296: 'Rejeição: Certificado Assinatura erro no acesso a LCR',
        297: 'Rejeição: Assinatura difere do calculado',
        298: 'Rejeição: Assinatura difere do padrão do Projeto',
        299: 'Rejeição: XML da área de cabeçalho com codificação diferente de UTF-8',
        301: 'Uso Denegado: Irregularidade fiscal do emitente',
        302: 'Uso Denegado: Irregularidade fiscal do destinatário',
        315: 'Rejeição: Data de Emissão anterior ao início da autorização de Nota Fiscal na UF',
        316: 'Rejeição: Nota Fiscal referenciada com a mesma Chave de Acesso da Nota Fiscal atual',
        317: 'Rejeição: NF modelo 1 referenciada com data de emissão inválida',
        318: 'Rejeição: Contranota de Produtor sem Nota Fiscal referenciada',
        319: 'Rejeição: Contranota de Produtor referencia somente NF de entrada',
        320: 'Rejeição: Contranota de Produtor referencia somente NF de outro emitente',
        322: 'Rejeição: NF de produtor referenciada com data de emissão inválida',
        337: 'Rejeição: NFC-e para emitente pessoa física',
        347: 'Rejeição: Informada IE do substituto tributário em operação com Exterior',
        363: 'Rejeição: IE do substituto tributário idêntica à IE do emitente ou do destinatário',
        372: 'Rejeição: Destinatário com identificação de estrangeiro com caracteres inválidos',
        373: 'Rejeição: Descrição do primeiro item diferente de NOTA FISCAL EMITIDA EM AMBIENTE DE HOMOLOGACAO - SEM VALOR FISCAL',
        374: 'Rejeição: CFOP incompatível com o grupo de tributação [nItem:nnn]',
        375: 'Rejeição: NF-e com CFOP 5929 (Lançamento relativo a Cupom Fiscal) referencia uma NFC-e [nItem:nnn]',
        376: 'Rejeição: Data do Desembaraço Aduaneiro inválida [nItem:nnn]',
        377: 'Rejeição: Grupo de Combustível para CFOP diferente dos permitidos [nItem:nnn]',
        378: 'Rejeição: Grupo de Combustível sem a informação de Encerrante [nItem:nnn]',
        379: 'Rejeição: Grupo de Encerrante na NF-e (modelo 55) para CFOP diferente de venda de combustível para consumidor final [nItem:nnn]',
        380: 'Rejeição: Valor do Encerrante final não é superior ao Encerrante inicial [nItem:nnn]',
        381: 'Rejeição: Grupo de tributação ICMS90, informando dados do ICMS-ST [nItem:nnn]',
        382: 'Rejeição: CFOP não permitido para o CST informado [nItem:nnn]',
        383: 'Rejeição: Item com CSOSN indevido [nItem:nnn]',
        384: 'Rejeição: CSOSN não permitido para a UF [nItem:nnn]',
        385: 'Rejeição: Grupo de tributação ICMS900, informando dados do ICMS-ST [nItem:nnn]',
        386: 'Rejeição: CFOP não permitido para o CSOSN informado [nItem:nnn]',
        387: 'Rejeição: Código de Enquadramento Legal do IPI inválido [nItem:nnn]',
        401: 'Rejeição: CPF do emitente inválido',
        402: 'Rejeição: XML da área de dados com codificação diferente de UTF-8',
        403: 'Rejeição: O grupo de informações da NF-e avulsa é de uso exclusivo do Fisco',
        404: 'Rejeição: Uso de prefixo de namespace não permitido',
        405: 'Rejeição: Código do país do emitente: dígito inválido',
        406: 'Rejeição: Código do país do destinatário: dígito inválido',
        407: 'Rejeição: O CPF só pode ser informado no campo emitente para a NF-e avulsa',
        409: 'Rejeição: Campo cUF inexistente no elemento nfeCabecMsg do SOAP Header',
        410: 'Rejeição: UF informada no campo cUF não é atendida pelo Web Service',
        411: 'Rejeição: Campo versaoDados inexistente no elemento nfeCabecMsg do SOAP Header',
        420: 'Rejeição: Cancelamento para NF-e já cancelada',
        450: 'Rejeição: Modelo da NF-e diferente de 55',
        451: 'Rejeição: Processo de emissão informado inválido',
        452: 'Rejeição: Tipo Autorizador do Recibo diverge do Órgão Autorizador',
        453: 'Rejeição: Ano de inutilização não pode ser superior ao Ano atual',
        454: 'Rejeição: Ano de inutilização não pode ser inferior a 2006',
        478: 'Rejeição: Local da entrega não informado para faturamento direto de veículos novos',
        489: 'Rejeição: CNPJ informado inválido (DV ou zeros)',
        490: 'Rejeição: CPF informado inválido (DV ou zeros)',
        491: 'Rejeição: O tpEvento informado inválido',
        492: 'Rejeição: O verEvento informado inválido',
        493: 'Rejeição: Evento não atende o Schema XML específico',
        494: 'Rejeição: Chave de Acesso inexistente',
        501: 'Rejeição: Prazo de cancelamento superior ao previsto na Legislação',
        502: 'Rejeição: Erro na Chave de Acesso - Campo Id não corresponde à concatenação dos campos correspondentes',
        503: 'Rejeição: Série utilizada fora da faixa permitida no SCAN (900-999)',
        504: 'Rejeição: Data de Entrada/Saída posterior ao permitido',
        505: 'Rejeição: Data de Entrada/Saída anterior ao permitido',
        506: 'Rejeição: Data de Saída menor que a Data de Emissão',
        507: 'Rejeição: O CNPJ do destinatário/remetente não deve ser informado em operação com o exterior',
        508: 'Rejeição: O CNPJ com conteúdo nulo só é válido em operação com exterior',
        509: 'Rejeição: Informado código de município diferente de “9999999” para operação com o exterior',
        510: 'Rejeição: Operação com Exterior e Código País destinatário é 1058 (Brasil) ou não informado',
        511: 'Rejeição: Não é de Operação com Exterior e Código País destinatário difere de 1058 (Brasil)',
        512: 'Rejeição: CNPJ do Local de Retirada inválido',
        513: 'Rejeição: Código Município do Local de Retirada deve ser 9999999 para UF retirada = EX',
        514: 'Rejeição: CNPJ do Local de Entrega inválido',
        515: 'Rejeição: Código Município do Local de Entrega deve ser 9999999 para UF entrega = EX',
        516: 'Rejeição: Falha no schema XML – inexiste a tag raiz esperada para a mensagem',
        517: 'Rejeição: Falha no schema XML – inexiste atributo versao na tag raiz da mensagem',
        518: 'Rejeição: CFOP de entrada para NF-e de saída',
        519: 'Rejeição: CFOP de saída para NF-e de entrada',
        520: 'Rejeição: CFOP de Operação com Exterior e UF destinatário difere de EX',
        521: 'Rejeição: CFOP não é de Operação com Exterior e UF destinatário é EX',
        522: 'Rejeição: CFOP de Operação Estadual e UF emitente difere UF destinatário.',
        523: 'Rejeição: CFOP não é de Operação Estadual e UF emitente igual a UF destinatário.',
        524: 'Rejeição: CFOP de Operação com Exterior e não informado NCM',
        525: 'Rejeição: CFOP de Importação e não informado dados da DI',
        // 526: 'Rejeição: CFOP de Exportação e não informado Local de Embarque',
        526: 'Rejeição: Consulta a uma Chave de Acesso muito antiga',
        527: 'Rejeição: Operação de Exportação com informação de ICMS incompatível',
        528: 'Rejeição: Valor do ICMS difere do produto BC e Alíquota',
        529: 'Rejeição: NCM de informação obrigatória para produto tributado pelo IPI',
        530: 'Rejeição: Operação com tributação de ISSQN sem informar a Inscrição Municipal',
        531: 'Rejeição: Total da BC ICMS difere do somatório dos itens',
        532: 'Rejeição: Total do ICMS difere do somatório dos itens',
        533: 'Rejeição: Total da BC ICMS-ST difere do somatório dos itens',
        534: 'Rejeição: Total do ICMS-ST difere do somatório dos itens',
        535: 'Rejeição: Total do Frete difere do somatório dos itens',
        536: 'Rejeição: Total do Seguro difere do somatório dos itens',
        537: 'Rejeição: Total do Desconto difere do somatório dos itens',
        538: 'Rejeição: Total do IPI difere do somatório dos itens',
        539: 'Rejeição: Duplicidade de NF-e, com diferença na Chave de Acesso',
        540: 'Rejeição: CPF do Local de Retirada inválido',
        541: 'Rejeição: CPF do Local de Entrega inválido',
        542: 'Rejeição: CNPJ do Transportador inválido',
        543: 'Rejeição: CPF do Transportador inválido',
        544: 'Rejeição: IE do Transportador inválida',
        545: 'Rejeição: Falha no schema XML – versão informada na versaoDados do SOAPHeader diverge da versão da mensagem',
        546: 'Rejeição: Erro na Chave de Acesso – Campo Id – falta a literal NFe',
        547: 'Rejeição: Dígito Verificador da Chave de Acesso da NF-e Referenciada inválido',
        548: 'Rejeição: CNPJ da NF referenciada inválido.',
        549: 'Rejeição: CNPJ da NF referenciada de produtor inválido.',
        550: 'Rejeição: CPF da NF referenciada de produtor inválido.',
        551: 'Rejeição: IE da NF referenciada de produtor inválido.',
        552: 'Rejeição: Dígito Verificador da Chave de Acesso do CT-e Referenciado inválido',
        553: 'Rejeição: Tipo autorizador do recibo diverge do Órgão Autorizador.',
        554: 'Rejeição: Série difere da faixa 0-899',
        555: 'Rejeição: Tipo autorizador do protocolo diverge do Órgão Autorizador.',
        556: 'Rejeição: Justificativa de entrada em contingência não deve ser informada para tipo de emissão normal.',
        557: 'Rejeição: A Justificativa de entrada em contingência deve ser informada.',
        558: 'Rejeição: Data de entrada em contingência posterior a data de emissão.',
        559: 'Rejeição: UF do Transportador não informada',
        560: 'Rejeição: CNPJ base do emitente difere do CNPJ base da primeira NF-e do lote recebido',
        561: 'Rejeição: Mês de Emissão informado na Chave de Acesso difere do Mês de Emissão da NFe',
        562: 'Rejeição: Código Numérico informado na Chave de Acesso difere do Código Numérico da NF-e',
        563: 'Rejeição: Já existe pedido de Inutilização com a mesma faixa de inutilização',
        564: 'Rejeição: Total do Produto / Serviço difere do somatório dos itens',
        565: 'Rejeição: Falha no schema XML – inexiste a tag raiz esperada para o lote de NF-e',
        567: 'Rejeição: Falha no schema XML – versão informada na versaoDados do SOAPHeader diverge da versão do lote de NF-e',
        568: 'Rejeição: Falha no schema XML – inexiste atributo versao na tag raiz do lote de NF-e',
        572: 'Rejeição: Erro Atributo ID do evento não corresponde a concatenação dos campos (“ID” + tpEvento + chNFe + nSeqEvento)',
        573: 'Rejeição: Duplicidade de Evento',
        574: 'Rejeição: O autor do evento diverge do emissor da NF-e',
        575: 'Rejeição: O autor do evento diverge do destinatário da NF-e',
        576: 'Rejeição: O autor do evento não é um órgão autorizado a gerar o evento',
        577: 'Rejeição: A data do evento não pode ser menor que a data de emissão da NF-e',
        578: 'Rejeição: A data do evento não pode ser maior que a data do processamento',
        579: 'Rejeição: A data do evento não pode ser menor que a data de autorização para NF-e não emitida em contingência',
        580: 'Rejeição: O evento exige uma NF-e autorizada',
        588: 'Rejeição: Não é permitida a presença de caracteres de edição no início/fim da mensagem ou entre as tags da mensagem',
        594: 'Rejeição: O número de sequencia do evento informado é maior que o permitido',
        613: 'Rejeição: Chave de Acesso difere da existente em BD',
        614: 'Rejeição: Chave de Acesso inválida (Código UF inválido)',
        615: 'Rejeição: Chave de Acesso inválida (Ano menor que 05 ou Ano maior que Ano corrente)',
        616: 'Rejeição: Chave de Acesso inválida (Mês menor que 1 ou Mês maior que 12)',
        617: 'Rejeição: Chave de Acesso inválida (CNPJ zerado ou dígito inválido)',
        618: 'Rejeição: Chave de Acesso inválida (modelo diferente de 55)',
        619: 'Rejeição: Chave de Acesso inválida (número NF = 0)',
        637: 'Rejeição: ID do evento (idPedido) inválido',
        638: 'Rejeição: A quantidade de Pedidos de Prorrogação 1º prazo excede o valor limite de 20 Pedidos de Prorrogação autorizados e sem resposta do Fisco',
        639: 'Rejeição: A quantidade de Pedidos de Prorrogação 2° prazo excede o valor limite de 20 Pedidos de Prorrogação autorizados e sem resposta do Fisco',
        640: 'Rejeição: ID do Pedido de Prorrogação inválido',
        641: 'Rejeição: A data do evento não pode ser menor que a data de autorização para o evento',
        642: 'Rejeição: Falha na Consulta do Registro de Passagem, tente novamente após 5 minutos',
        679: 'Rejeição: Modelo de DF-e referenciado inválido',
        704: 'Rejeição: NFC-e com Data-Hora de emissão atrasada',
        714: 'Rejeição: NFC-e com opção de contingência inválida (tpEmis=2, 4 (a critério da UF) ou 5)',
        740: 'Rejeição: Item com Repasse de ICMS retido por Substituto Tributário [nItem:nnn]',
        766: 'Rejeição: Item com CST indevido [nItem:nnn]',
        999: 'Rejeição: Erro não catalogado'
        // TODO: Adicionados novas msg da NT2015-002 até a página 17/28, terminar!
    }[codigo];
}

module.exports.obterMensagemPorCodigo = obterMensagemPorCodigo;

function gerarDadosDaNfe(info) {
    // Para emissão em formulário de segurança

    function tratarValorDaNfe(valor) {
        valor = formatacoes.removerMascara(valor);
        valor = formatacoes.numero(valor, {
            casasDecimais: 2
        }).replace(/,/g, '').replace(/\./g, '');

        return sUtils.pad(valor, 14, '0');
    }

    function tratarDataDeEmissao(data) {
        if(util.isDate(data)) {
            data = data.getDate();
        }

        data = data.toString().substr(0, 2);
        return sUtils.pad(data, 2, '0');
    }

    var dadosDaNfe = [
        dados.obterEstado(info.uf).codigo.toString(),
        info.tipoDeEmissao,
        formatacoes.removerMascara(info.cnpj),
        tratarValorDaNfe(info.valorDaNfe),
        {
            true: '1',
            false: '2',
        }[info.destaqueDeIcmsProprio],
        {
            true: '1',
            false: '2',
        }[info.destaqueDeIcmsPorST],
        tratarDataDeEmissao(info.diaDeEmissao || info.dataDeEmissao)
    ].join('');

    return dadosDaNfe + calcularDigitoVerificador(dadosDaNfe);
}

module.exports.gerarDadosDaNfe = gerarDadosDaNfe;

function extrairDadosDaChaveDeAcesso(chaveDeAcesso) {
    function splitPositionalValues(string, parameters) { // TODO: Mover para o gammautils
        var startIndex = 0,
            result = {};

        parameters.forEach(function(parameter) {
            var value = string.substr(startIndex, parameter.length);

            if(parameter.parser && typeof parameter.parser === 'function') {
                value = parameter.parser(value);
            } else {
                if(parameter.trim) {
                    value = value.trim();
                }

                if(parameter.type === 'number') {
                    value = parseInt(value, 10);
                }

                if(parameter.type === 'boolean') {
                    value = value === 'true' || value === '1';
                }
            }

            result[parameter.property] = value;
            startIndex += parameter.length;
        });

        return result;
    }

    if(!validarChaveDeAcesso(chaveDeAcesso)) {
        return null;
    }

    return splitPositionalValues(chaveDeAcesso, [
        { length: 2, property: 'uf', type: 'number' },
        { length: 4, property: 'dataDeEmissao' },
        { length: 14, property: 'cnpj' },
        { length: 2, property: 'modelo' },
        { length: 3, property: 'serie', type: 'number' },
        { length: 9, property: 'numero', type: 'number' },
        { length: 1, property: 'tipoDeEmissao' },
        { length: 9, property: 'numeroAleatorio', type: 'number' },
    ]);
}

module.exports.extrairDadosDaChaveDeAcesso = extrairDadosDaChaveDeAcesso;

function gerarChaveDeAcesso(info) {
	function obterDataAAMM(data) {
		return data.getYear().toString().substr(1, 2) + [
            "01", "02", "03",
            "04", "05", "06",
            "07", "08", "09",
            "10", "11", "12"
        ][data.getMonth()];
	}

    function obterModelo(modelo) {
        modelo = modelo && modelo.toString();

        modelo = {
            '55': '55',
            'nfe': '55',

            '65': '65',
            'nfce': '65'
        }[modelo];

        return sUtils.pad(modelo, 2, "0")
    }

    var chaveDeAcesso = [
        dados.obterEstado(info.uf).codigo.toString(),
        obterDataAAMM(info.dataDeEmissao),
        formatacoes.removerMascara(info.cnpj),
        obterModelo(info.modelo),
        sUtils.pad(info.serie.toString(), 3, "0"),
        sUtils.pad(info.numero.toString(), 9, "0"),
        info.tipoDeEmissao,
        sUtils.pad(info.numeroAleatorio.toString(), 8, "0")
    ].join('')

    chaveDeAcesso = chaveDeAcesso + calcularDigitoVerificador(chaveDeAcesso);
    return validarChaveDeAcesso(chaveDeAcesso) ? chaveDeAcesso : null;
};

module.exports.gerarChaveDeAcesso = gerarChaveDeAcesso;

function calcularDigitoVerificador(chaveDeAcesso){
    var naoTem43Numeros = !/^[0-9]{43}$/.test(chaveDeAcesso), // Para chave de acesso
        naoTem35Numeros = !/^[0-9]{35}$/.test(chaveDeAcesso); // Para dados da nfe (contingencia)

	if(naoTem43Numeros && naoTem35Numeros) {
		return false;
	}

	var resto = mUtils.mod(chaveDeAcesso, [2, 3, 4, 5, 6, 7, 8, 9]) % 11;
	var digito = resto < 2 ? 0 : 11 - resto;

	return digito;
};

module.exports.calcularDigitoVerificador = calcularDigitoVerificador;

function validarChaveDeAcesso(chaveDeAcesso){
	if(typeof chaveDeAcesso !== "string") {
		return false;
	}

	chaveDeAcesso = chaveDeAcesso.replace(/\W/g, "");

	if(chaveDeAcesso.length !== 44) {
		return false;
	}

	if(!validacoes.eCnpj(chaveDeAcesso.substr(6, 14))) {
		return false;
	}

	var base = chaveDeAcesso.substring(0, 43);
	var multiplicadores = [2, 3, 4, 5, 6, 7, 8, 9];

	var resto = mUtils.mod(base, multiplicadores) % 11;
	var digito = resto < 2 ? 0 : 11 - resto;

	return chaveDeAcesso === base + digito;
}

module.exports.validarChaveDeAcesso = validarChaveDeAcesso;

module.exports.obterProdutosEspecificos = function() {
	return [
		{ codigo: 'veiculo', descricao: 'Veículo' },
		{ codigo: 'medicamento', descricao: 'Medicamento' },
		{ codigo: 'armamento', descricao: 'Armamento' },
		{ codigo: 'combustivel', descricao: 'Combustível' },
	];
}

module.exports.obterOrigens = function() {
	return [
		{ codigo: '0', descricao: 'Nacional, exceto as indicadas nos códigos 3, 4, 5 e 8' },
	    { codigo: '1', descricao: 'Estrangeira - Importação direta' },
	    { codigo: '2', descricao: 'Estrangeira - Adquirida no mercado interno' },
	    { codigo: '3', descricao: 'Nacional, mercadoria ou bem com conteúdo de importação superior a 40%' },
	    { codigo: '4', descricao: 'Nacional, cuja produção tenha sido feita em conformidade com a MP 252 (MP do BEM)' },
	    { codigo: '5', descricao: 'Nacional, mercadoria ou bem com conteúdo de importação inferior ou igual a 40%' },
	    { codigo: '6', descricao: 'Estrangeira - Importação direta, sem similar nacional, constante em lista de resolução CAMEX' },
	    { codigo: '7', descricao: 'Estrangeira - Adquirida no mercado interno, sem similar nacional, constante em lista de resolução CAMEX' },
	    { codigo: '8', descricao: 'Nacional, mercadoria ou bem com conteúdo de importação superior a 70%' }
	];
}

function retornarCodigos(array) {
	return array.map(function(item) {
		return item.codigo;
	});
}

module.exports.issqn = {
	listaDeServicos: function(tipo) {
		if(tipo === 'array') {
			return require('./dados/servicos-array.json')
		} else if(tipo === 'hash') {
			return require('./dados/servicos-hash.json')
		}
	},

	tiposDeTributacao: [
		{ codigo: 'normal', descricao: 'Normal' },
		{ codigo: 'retida', descricao: 'Retida' },
		{ codigo: 'substituta', descricao: 'Sibstituta' },
		{ codigo: 'isenta', descricao: 'Isenta' }
	]
};

function obterSituacoesTributariasDoIcms(regime) {
	var sts = {
		normal: [
			{ codigo: '00', regime: 'normal', descricao: 'Tributada integralmente' },
	        { codigo: '10', regime: 'normal', descricao: 'Tributada e com cobrança do ICMS por substituição tributária' },
	        { codigo: '20', regime: 'normal', descricao: 'Com redução de base de cálculo' },
	        { codigo: '30', regime: 'normal', descricao: 'Isenta ou não tributada e com cobrança do ICMS por substituição tributária' },
	        { codigo: '40', regime: 'normal', descricao: 'Isenta' },
	        { codigo: '41', regime: 'normal', descricao: 'Não tributada' },
	        { codigo: '50', regime: 'normal', descricao: 'Suspensão' },
	        { codigo: '51', regime: 'normal', descricao: 'Diferimento' },
	        { codigo: '60', regime: 'normal', descricao: 'ICMS cobrado anteriormente por substituição tributária' },
	        { codigo: '70', regime: 'normal', descricao: 'Com redução de base de cálculo e cobrança do ICMS por substituição tributária' },
	        { codigo: '90', regime: 'normal', descricao: 'Outras' }
	    ],

	    simples: [
			{ codigo: '101', regime: 'simples', descricao: 'Tributada pelo Simples Nacional com permissão de crédito' },
			{ codigo: '102', regime: 'simples', descricao: 'Tributada pelo Simples Nacional sem permissão de crédito' },
			{ codigo: '103', regime: 'simples', descricao: 'Isenção do ICMS no Simples Nacional para faixa de receita bruta' },
			{ codigo: '201', regime: 'simples', descricao: 'Tributada pelo Simples Nacional com permissão de crédito e com cobrança do ICMS por substituição tributária' },
			{ codigo: '202', regime: 'simples', descricao: 'Tributada pelo Simples Nacional sem permissão de crédito e com cobrança do ICMS por substituição tributária' },
			{ codigo: '203', regime: 'simples', descricao: 'Isenção do ICMS no Simples Nacional para faixa de receita bruta e com cobrança do ICMS por substituição tributária' },
			{ codigo: '300', regime: 'simples', descricao: 'Imune' },
			{ codigo: '400', regime: 'simples', descricao: 'Não tributada pelo Simples Nacional' },
			{ codigo: '500', regime: 'simples', descricao: 'ICMS cobrado anteriormente por substituição tributária (substituído) ou por antecipação' },
			{ codigo: '900', regime: 'simples', descricao: 'Outros' }
	    ]
	}[regime];

	if(typeof sts === 'undefined') {
		return obterSituacoesTributariasDoIcms('normal').concat(obterSituacoesTributariasDoIcms('simples'));
	}

	return sts;
}

module.exports.reduzirBaseDeCalculo = function(baseDeCalculo, reducao, aliquota) {
	return baseDeCalculo * reducao / aliquota;
}

module.exports.icms = {
	obterSituacoesTributarias: obterSituacoesTributariasDoIcms,
	codigosDasSituacoesTributarias: retornarCodigos(obterSituacoesTributariasDoIcms()),
	obterModalidadeDeDeterminacaoDaBC: [
        { codigo: '0', descricao: 'Margem Valor Agregado' },
        { codigo: '1', descricao: 'Pauta (Valor)' },
        { codigo: '2', descricao: 'Preço Tabelado Máx. (Valor)' },
        { codigo: '3', descricao: 'Valor da Operação' }
	]
}

module.exports.ipi = {
	obterSituacoesTributarias: function() {
	    return [
		    { codigo: '0', descricao: 'Entrada com recuperação de crédito' },
		    { codigo: '1', descricao: 'Entrada tributada com alíquota zero' },
		    { codigo: '2', descricao: 'Entrada isenta' },
		    { codigo: '3', descricao: 'Entrada não-tributada' },
		    { codigo: '4', descricao: 'Entrada imune' },
		    { codigo: '5', descricao: 'Entrada com suspensão' },
		    { codigo: '49', descricao: 'Outras entradas' },
		    { codigo: '50', descricao: 'Saída tributada' },
		    { codigo: '51', descricao: 'Saída tributada com alíquota zero' },
		    { codigo: '52', descricao: 'Saída isenta' },
		    { codigo: '53', descricao: 'Saída não-tributada' },
		    { codigo: '54', descricao: 'Saída imune' },
		    { codigo: '55', descricao: 'Saída com suspensão' },
		    { codigo: '99', descricao: 'Outras saídas' }
		];
	}
};

module.exports.pis = {
	obterSituacoesTributarias: function() {
		return [
			{ codigo: '01', descricao: 'Operação Tributável com Alíquota Básica' },
			{ codigo: '02', descricao: 'Operação Tributável com Alíquota Diferenciada' },
			{ codigo: '03', descricao: 'Operação Tributável com Alíquota por Unidade de Medida de Produto' },
			{ codigo: '04', descricao: 'Operação Tributável Monofásica - Revenda a Alíquota Zero' },
			{ codigo: '05', descricao: 'Operação Tributável por Substituição Tributária' },
			{ codigo: '06', descricao: 'Operação Tributável a Alíquota zero' },
			{ codigo: '07', descricao: 'Operação Isenta da Contribuição' },
			{ codigo: '08', descricao: 'Operação sem Incidência da Contribuição' },
			{ codigo: '09', descricao: 'Operação com Suspensão da Contribuição' },
			{ codigo: '49', descricao: 'Outras Operações de Saída' },
			{ codigo: '50', descricao: 'Operação com Direito a Crédito - Vinculada Exclusivamente a Receita Tributada no Mercado Interno' },
			{ codigo: '51', descricao: 'Operação com Direito a Crédito - Vinculada Exclusivamente a Receita Não-Tributada no Mercado Interno' },
			{ codigo: '52', descricao: 'Operação com Direito a Crédito - Vinculada Exclusivamente a Receita de Exportação' },
			{ codigo: '53', descricao: 'Operação com Direito a Crédito - Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno' },
			{ codigo: '54', descricao: 'Operação com Direito a Crédito - Vinculada a Receitas Tributadas no Mercado Interno e de Exportação' },
			{ codigo: '55', descricao: 'Operação com Direito a Crédito - Vinculada a Receitas Não Tributadas no Mercado Interno e de Exportação' },
			{ codigo: '56', descricao: 'Operação com Direito a Crédito - Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno e de Exportação' },
			{ codigo: '60', descricao: 'Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita Tributada no Mercado Interno' },
			{ codigo: '61', descricao: 'Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita Não-Tributada no Mercado Interno' },
			{ codigo: '62', descricao: 'Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita de Exportação' },
			{ codigo: '63', descricao: 'Crédito Presumido - Operação de Aquisição Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno' },
			{ codigo: '64', descricao: 'Crédito Presumido - Operação de Aquisição Vinculada a Receitas Tributadas no Mercado Interno e de Exportação' },
			{ codigo: '65', descricao: 'Crédito Presumido - Operação de Aquisição Vinculada a Receitas Não-Tributadas no Mercado Interno e de Exportação' },
			{ codigo: '66', descricao: 'Crédito Presumido - Operação de Aquisição Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno e de Exportação' },
			{ codigo: '67', descricao: 'Crédito Presumido - Outras Operações' },
			{ codigo: '70', descricao: 'Operação de Aquisição sem Direito a Crédito' },
			{ codigo: '71', descricao: 'Operação de Aquisição com Isenção' },
			{ codigo: '72', descricao: 'Operação de Aquisição com Suspensão' },
			{ codigo: '73', descricao: 'Operação de Aquisição a Alíquota Zero' },
			{ codigo: '74', descricao: 'Operação de Aquisição sem Incidência da Contribuição' },
			{ codigo: '75', descricao: 'Operação de Aquisição por Substituição Tributária' },
			{ codigo: '98', descricao: 'Outras Operações de Entrada' },
			{ codigo: '99', descricao: 'Outras Operações' }
		];
	}
};

module.exports.cofins = {
	obterSituacoesTributarias: function() {
		return [
			{ codigo: '01', descricao: 'Operação Tributável com Alíquota Básica' },
			{ codigo: '02', descricao: 'Operação Tributável com Alíquota Diferenciada' },
			{ codigo: '03', descricao: 'Operação Tributável com Alíquota por Unidade de Medida de Produto' },
			{ codigo: '04', descricao: 'Operação Tributável Monofásica - Revenda a Alíquota Zero' },
			{ codigo: '05', descricao: 'Operação Tributável por Substituição Tributária' },
			{ codigo: '06', descricao: 'Operação Tributável a Alíquota zero' },
			{ codigo: '07', descricao: 'Operação Isenta da Contribuição' },
			{ codigo: '08', descricao: 'Operação sem Incidência da Contribuição' },
			{ codigo: '09', descricao: 'Operação com Suspensão da Contribuição' },
			{ codigo: '49', descricao: 'Outras Operações de Saída' },
			{ codigo: '50', descricao: 'Operação com Direito a Crédito - Vinculada Exclusivamente a Receita Tributada no Mercado Interno' },
			{ codigo: '51', descricao: 'Operação com Direito a Crédito - Vinculada Exclusivamente a Receita Não-Tributada no Mercado Interno' },
			{ codigo: '52', descricao: 'Operação com Direito a Crédito - Vinculada Exclusivamente a Receita de Exportação' },
			{ codigo: '53', descricao: 'Operação com Direito a Crédito - Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno' },
			{ codigo: '54', descricao: 'Operação com Direito a Crédito - Vinculada a Receitas Tributadas no Mercado Interno e de Exportação' },
			{ codigo: '55', descricao: 'Operação com Direito a Crédito - Vinculada a Receitas Não Tributadas no Mercado Interno e de Exportação' },
			{ codigo: '56', descricao: 'Operação com Direito a Crédito - Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno e de Exportação' },
			{ codigo: '60', descricao: 'Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita Tributada no Mercado Interno' },
			{ codigo: '61', descricao: 'Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita Não-Tributada no Mercado Interno' },
			{ codigo: '62', descricao: 'Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita de Exportação' },
			{ codigo: '63', descricao: 'Crédito Presumido - Operação de Aquisição Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno' },
			{ codigo: '64', descricao: 'Crédito Presumido - Operação de Aquisição Vinculada a Receitas Tributadas no Mercado Interno e de Exportação' },
			{ codigo: '65', descricao: 'Crédito Presumido - Operação de Aquisição Vinculada a Receitas Não-Tributadas no Mercado Interno e de Exportação' },
			{ codigo: '66', descricao: 'Crédito Presumido - Operação de Aquisição Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno e de Exportação' },
			{ codigo: '67', descricao: 'Crédito Presumido - Outras Operações' },
			{ codigo: '70', descricao: 'Operação de Aquisição sem Direito a Crédito' },
			{ codigo: '71', descricao: 'Operação de Aquisição com Isenção' },
			{ codigo: '72', descricao: 'Operação de Aquisição com Suspensão' },
			{ codigo: '73', descricao: 'Operação de Aquisição a Alíquota Zero' },
			{ codigo: '74', descricao: 'Operação de Aquisição sem Incidência da Contribuição' },
			{ codigo: '75', descricao: 'Operação de Aquisição por Substituição Tributária' },
			{ codigo: '98', descricao: 'Outras Operações de Entrada' },
			{ codigo: '99', descricao: 'Outras Operações' }
		];
	}
}
