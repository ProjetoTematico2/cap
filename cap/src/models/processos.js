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
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nro_processo: DataTypes.INTEGER,
    nro_artigo_penal: DataTypes.INTEGER,
    pena_originaria: DataTypes.STRING,
    pena_originaria_regime: DataTypes.INTEGER,
    inciso: DataTypes.STRING,
    detalhamento: DataTypes.STRING,
    prd: DataTypes.BOOLEAN,
    prd_descricao: DataTypes.STRING,
    persecucao_penal: DataTypes.BOOLEAN,
    horas_cumprir: DataTypes.DOUBLE,
    qtd_penas_anteriores: DataTypes.INTEGER,
    possui_multa: DataTypes.BOOLEAN,
    valor_a_pagar: DataTypes.DOUBLE,

  }, {
    sequelize,
    modelName: 'Processos',
  });
  return Processos;
};