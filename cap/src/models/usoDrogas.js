'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsoDrogas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  UsoDrogas.init({
    frequencia: DataTypes.INTEGER,
    observacao: DataTypes.STRING,
    ref_integracao: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UsoDrogas',
  });
  return UsoDrogas;
};