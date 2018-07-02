//browserify brazilian.js -s brazilian | uglifyjs > ./dist/brazilian.browser.js

module.exports = {
    nfe: require('./lib/nfeUtils'),
    validacoes: require('./lib/validacoesUtils'),
    dados: require('./lib/dadosUtils'),
    formatacoes: require('./lib/formatacoesUtils'),
    bancos: require('./lib/bancosUtils'),
};
