'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Endereco extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  Endereco.init({
    cep: DataTypes.INTEGER,
    rua: DataTypes.STRING,
    bairro: DataTypes.DATE,
    complemento: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Endereco',
  });
  return Endereco;
};