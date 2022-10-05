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
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    descricao: DataTypes.STRING,
    horario_inicio: DataTypes.TIME,
    horario_fim: DataTypes.TIME,
    segunda: DataTypes.BOOLEAN,
    terca: DataTypes.BOOLEAN,
    quarta: DataTypes.BOOLEAN,
    quinta: DataTypes.BOOLEAN,
    sexta: DataTypes.BOOLEAN,
    sabado: DataTypes.BOOLEAN,
    domingo: DataTypes.BOOLEAN,
    observacoes: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Trabalho',
  });
  return Trabalho;
};