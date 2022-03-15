const TabelaFornecedor = require('./Tabelas/TabelaFornecedor');

//fazendo a criação no banco
TabelaFornecedor
.sync()
.then(()=>console.log("Tabela Fornecedor criada com sucesso."))
.catch(console.log);