'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('Prestadores', 'TESTE', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     const transaction = await queryInterface.sequelize.transaction();
     try {
       await queryInterface.removeColumn('Prestadores', 'TESTE', { transaction });
       await transaction.commit();
     } catch (err) {
       await transaction.rollback();
       throw err;
     }
  }
};
