'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cursos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  Cursos.init({
    intituicao: DataTypes.STRING,
    curso: DataTypes.STRING,
    observacoes: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'Cursos',
  });
  return Cursos;
};