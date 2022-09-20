'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UF extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  UF.init({
    nome: DataTypes.STRING,
    sigla: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UF',
  });
  return UF;
};