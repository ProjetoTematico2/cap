'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prestador extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  Prestador.init({
    nome: DataTypes.STRING,
    cpf: DataTypes.INTEGER,
    nome_mae: DataTypes.STRING,
    dt_nascimento: DataTypes.DATE,
    estado_civil: DataTypes.INTEGER,
    etnia: DataTypes.INTEGER,
    escolaridade: DataTypes.INTEGER,
    renda_familiar: DataTypes.DOUBLE,
    telefone1: DataTypes.INTEGER,
    telefone2: DataTypes.INTEGER,
    religiao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Prestadores',
  });
  return Prestador;
};