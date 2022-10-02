'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('ufs', [

      { nome: 'Acre', sigla: 'AC', createdAt: new Date(), updatedAt: new Date(), },
      { nome: 'Alagoas', sigla: 'AL', createdAt: new Date(), updatedAt: new Date(), },
      { nome: 'Amazonas', sigla: 'AM', createdAt: new Date(), updatedAt: new Date(), },
      { nome: 'Amapá', sigla: 'AP', createdAt: new Date(), updatedAt: new Date(), },
      { nome: 'Bahia', sigla: 'BA', createdAt: new Date(), updatedAt: new Date(), },
      { nome: 'Ceará', sigla: 'CE', createdAt: new Date(), updatedAt: new Date(), },
      { nome: 'Distrito Federal', sigla: 'DF', createdAt: new Date(), updatedAt: new Date(), },
      { nome: 'Espírito Santo', sigla: 'ES', createdAt: new Date(), updatedAt: new Date(), },
      { nome: 'Goiás', sigla: 'GO', createdAt: new Date(), updatedAt: new Date(), },
      { nome: 'Maranhão', sigla: 'MA', createdAt: new Date(), updatedAt: new Date(), },
      { nome: 'Minas Gerais', sigla: 'MG', createdAt: new Date(), updatedAt: new Date(), },
      { nome: 'Mato Grosso do Sul', sigla: 'MS', createdAt: new Date(), updatedAt: new Date(), },
      { nome: 'Mato Grosso', sigla: 'MT', createdAt: new Date(), updatedAt: new Date(), },
      { nome: 'Pará', sigla: 'PA', createdAt: new Date(), updatedAt: new Date(), },
      { nome: 'Paraíba', sigla: 'PB', createdAt: new Date(), updatedAt: new Date(), },
      { nome: 'Pernambuco', sigla: 'PE', createdAt: new Date(), updatedAt: new Date(), },
      { nome: 'Piauí', sigla: 'PI', createdAt: new Date(), updatedAt: new Date(), },
      { nome: 'Paraná', sigla: 'PR', createdAt: new Date(), updatedAt: new Date(), },
      { nome: 'Rio de Janeiro', sigla: 'RJ', createdAt: new Date(), updatedAt: new Date(), },
      { nome: 'Rio Grande do Norte', sigla: 'RN', createdAt: new Date(), updatedAt: new Date(), },
      { nome: 'Rondônia', sigla: 'RO', createdAt: new Date(), updatedAt: new Date(), },
      { nome: 'Roraima', sigla: 'RR', createdAt: new Date(), updatedAt: new Date(), },
      { nome: 'Rio Grande do Sul', sigla: 'RS', createdAt: new Date(), updatedAt: new Date(), },
      { nome: 'Santa Catarina', sigla: 'SC', createdAt: new Date(), updatedAt: new Date(), },
      { nome: 'Sergipe', sigla: 'SE', createdAt: new Date(), updatedAt: new Date(), },
      { nome: 'São Paulo', sigla: 'SP', createdAt: new Date(), updatedAt: new Date(), },
      { nome: 'Tocantins', sigla: 'TO', createdAt: new Date(), updatedAt: new Date(), },

    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('ufs', null, {});
  }
};
