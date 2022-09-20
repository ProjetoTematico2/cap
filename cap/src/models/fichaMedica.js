'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FichaMedica extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  FichaMedica.init({
    deficiencia: DataTypes.INTEGER,
    observacao: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'FichaMedica',
  });
  return FichaMedica;
};