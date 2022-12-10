'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Instituicoes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  Instituicoes.init({
    nome: DataTypes.STRING,
    cnpj: DataTypes.INTEGER,
    email: DataTypes.STRING,
    telefone1: DataTypes.INTEGER,
    telefone2: DataTypes.INTEGER,
    tipo_instituicao: DataTypes.INTEGER,
    dt_descredenciamento: DataTypes.DATE,
    observacao: DataTypes.STRING,
    ref_integracao: DataTypes.INTEGER
    
  }, {
    sequelize,
    modelName: 'Instituicoes',
  });
  return Instituicoes;
};