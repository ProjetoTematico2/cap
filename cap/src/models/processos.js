'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Processos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  Processos.init({
    nro_processo: DataTypes.INTEGER,
    prd: DataTypes.BOOLEAN,
    prd_descricao: DataTypes.STRING,
    nro_artigo_penal: DataTypes.INTEGER,
    inciso: DataTypes.INTEGER,
    detalhamento: DataTypes.INTEGER,
    persecucao_penal: DataTypes.BOOLEAN,
    pena_originaria: DataTypes.STRING,
    pena_originaria_regime: DataTypes.INTEGER,
    horas_cumprir: DataTypes.DOUBLE

  }, {
    sequelize,
    modelName: 'Processos',
  });
  return Processos;
};