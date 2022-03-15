const Sequelize = require('sequelize');
const instancia = require("../../../banco");

//criando colunas da tabela
const colunas = {
  empresa:{
    type:Sequelize.STRING,
    allowNull: false,
  },

  email:{
    type:Sequelize.STRING,
    allowNull: false,
  },

  categoria:{
    type:Sequelize.ENUM("brinquedos", "ração"),
    allowNull: false,
  }

}

//criando detalhes como nome da tabela e mudança de nome do createdAt e updatedAt
const opcoes = {
  freezeTableName:true,
  tableName: "fornecedores",
  timestamps: true,
  createdAt: "criadoEm",
  updatedAt: "atualizadoEm",
  version:"versao"
}

//fazendo a conexao com a instancia do banco
module.exports = instancia.define("fornecedor", colunas, opcoes);