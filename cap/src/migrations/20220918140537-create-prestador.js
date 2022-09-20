'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Prestadores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      cpf: {
        type: Sequelize.INTEGER
      },
      nome_mae: {
        type: Sequelize.STRING
      },
      dt_nascimento: {
        type: Sequelize.DATE
      },
      estado_civil: {
        type: Sequelize.INTEGER
      },
      etnia: {
        type: Sequelize.INTEGER
      },
      escolaridade: {
        type: Sequelize.INTEGER
      },
      renda_familiar: {
        type: Sequelize.DOUBLE
      },
      telefone1: {
        type: Sequelize.INTEGER
      },
      telefone2: {
        type: Sequelize.INTEGER
      },
      religiao: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Prestadors');
  }
};