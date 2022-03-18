const Sequelize = require('sequelize');
const config = require('config');

//string de conexão
const instancia = new Sequelize(
  config.get('development.database'),
  config.get('development.username'),
  config.get('development.password'),
  {
    host:config.get('development.host'),
    dialect:config.get('development.dialect'),
  }
);

module.exports = instancia;