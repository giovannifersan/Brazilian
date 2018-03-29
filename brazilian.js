// browserify -i ./lib/boletoUtils.js -i ./lib/consultasUtils.js brasil.js -s brasil | uglifyjs > ./dist/brasil.browser.js

// Para melhorar a exportação para o browser
// https://github.com/substack/browserify-handbook#browser-field

module.exports = {
    nfe: require('./lib/nfeUtils'),
    validacoes: require('./lib/validacoesUtils'),
    dados: require('./lib/dadosUtils'),
    formatacoes: require('./lib/formatacoesUtils'),
    bancos: require('./lib/bancosUtils'),
    boleto: require('./lib/boletoUtils')
};