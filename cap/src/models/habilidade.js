'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Habilidades extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  Habilidades.init({
    descricao: DataTypes.STRING,
    observacao: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Habilidades',
  });
  return Habilidades;
};