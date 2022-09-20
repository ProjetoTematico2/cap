'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'Prestadores',
      'TESTE',
      {
        type: Sequelize.DataTypes.STRING,
      }
    );
  }
};
