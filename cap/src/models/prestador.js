'use strict';
const cAPP = require('../app');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prestador extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  Prestador.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: DataTypes.STRING,
    cpf: DataTypes.INTEGER,
    nome_mae: DataTypes.STRING,
    dt_nascimento: DataTypes.DATE,
    estado_civil: DataTypes.INTEGER,
    etnia: DataTypes.INTEGER,
    escolaridade: DataTypes.INTEGER,
    renda_familiar: DataTypes.DOUBLE,
    telefone1: DataTypes.INTEGER,
    telefone2: DataTypes.INTEGER,
    religiao: DataTypes.STRING,
    ref_integracao: DataTypes.INTEGER,
    image: {
      type: DataTypes.BLOB('long'),
      get() {
        let buffer = this.getDataValue('image');

        let imgBase64 = "";

        if(cAPP.config.mode === 0){
          imgBase64 = Buffer.from(buffer).toString('base64');
          if(imgBase64) imgBase64 = `data:image/jpeg;base64,${imgBase64}`;
        }
        else{
          imgBase64 = Buffer.from(buffer).toString();
        }
        
        return imgBase64;
      }
    }
  }, {
    sequelize,
    modelName: 'Prestadores',
  });
  return Prestador;
};