'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Beneficios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  Beneficios.init({
    nome: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Beneficios',
  });
  return Beneficios;
};