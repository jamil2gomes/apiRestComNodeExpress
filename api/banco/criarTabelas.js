

//criando uma tabela

// const TabelaFornecedor = require('./Tabelas/TabelaFornecedor');

// TabelaFornecedor
// .sync()
// .then(()=>console.log("Tabela Fornecedor criada com sucesso."))
// .catch(console.log);

const modelos = [
  require('./Tabelas/TabelaFornecedor'),
  require('./Tabelas/TabelaProduto'),
];

const nomesTabelas = ["fornecedores", "produtos"]

async function criarTabelas(){

  try {
    for (let index = 0; index < modelos.length; index++) {
      const modelo = modelos[index];
      await modelo.sync();
      console.log(`Tabela ${nomesTabelas[index]} criada com sucesso.\n`)
      
    }
  } catch (error) {
    console.log(error.message);
  }
}


criarTabelas();