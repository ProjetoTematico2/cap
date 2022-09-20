'use strict';
const {
  Model
} = require('sequelize');
const atestadoFrequencia = require('./atestadoFrequencia');
module.exports = (sequelize, DataTypes) => {
  class AtestadoComparecimento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  AtestadoComparecimento.init({
    observacao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AtestadoComparecimento',
  });
  return AtestadoComparecimento;
};