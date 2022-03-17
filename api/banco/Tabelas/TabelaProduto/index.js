const Sequelize = require('sequelize');
const instancia = require("../../../banco");


//criando colunas da tabela
const colunas = {
  titulo:{
    type:Sequelize.STRING,
    allowNull: false,
  },

  preco:{
    type:Sequelize.DOUBLE,
    allowNull: false,
  },

  estoque:{
    type:Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },

  fornecedor:{
    type:Sequelize.INTEGER,
    allowNull: false,
    references:{
      model: require('../TabelaFornecedor'),
      key:'id',
    }

  }

}

//criando detalhes como nome da tabela e mudança de nome do createdAt e updatedAt
const opcoes = {
  freezeTableName:true,
  tableName: "produtos",
  timestamps: true,
  createdAt: "criadoEm",
  updatedAt: "atualizadoEm",
  version:"versao"
}

//fazendo a conexao com a instancia do banco
module.exports = instancia.define("produto", colunas, opcoes);