'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trabalho extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  Trabalho.init({
    descricao: DataTypes.STRING,
    cpf: DataTypes.INTEGER,
    horario_inicio: DataTypes.DATE(6),
    horario: DataTypes.DATE(6),
    dias_semana: DataTypes.STRING.BINARY,
    observacoes: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Trabalho',
  });
  return Trabalho;
};