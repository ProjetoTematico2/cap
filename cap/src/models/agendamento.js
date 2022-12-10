'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Agendamento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  Agendamento.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    horario_inicio: DataTypes.TIME,
    horario_fim: DataTypes.TIME,
    data_inicial: DataTypes.DATEONLY,
    segunda: DataTypes.BOOLEAN,
    terca: DataTypes.BOOLEAN,
    quarta: DataTypes.BOOLEAN,
    quinta: DataTypes.BOOLEAN,
    sexta: DataTypes.BOOLEAN,
    sabado: DataTypes.BOOLEAN,
    domingo: DataTypes.BOOLEAN,
    ref_integracao: DataTypes.INTEGER
    
  }, {
    sequelize,
    modelName: 'Agendamentos',
  });
  return Agendamento;
};