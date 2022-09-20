'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Familiar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        console.log(models.Prestadores);
        //this.belongsTo(models.Prestador)
    }
  }
  Familiar.init({
    nome: DataTypes.STRING,
    parentesco: DataTypes.STRING,
    idade: DataTypes.INTEGER,
    profissao: DataTypes.STRING,
    observacao: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Familiares',
  });
  return Familiar;
};