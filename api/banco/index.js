const Sequelize = require('sequelize');
const config = require('config');

//string de conexão
const instancia = new Sequelize(
  config.get('mysql.banco'),
  config.get('mysql.usuario'),
  config.get('mysql.senha'),
  {
    host:config.get('mysql.host'),
    dialect:'mysql'
  }
);

module.exports = instancia;