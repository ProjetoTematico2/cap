'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AtestadoFrequencia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  AtestadoFrequencia.init({

    dt_entrada: DataTypes.DATE,
    dt_saida: DataTypes.DATE,
    observacao: DataTypes.STRING,
    ref_integracao: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'AtestadoFrequencia',
  });
  return AtestadoFrequencia;
};