const db = require('../models/index');
const { Op } = require("sequelize");

module.exports = {

    async Create(payload) {

        
        try {

           

        } catch (error) {
            return { status: false, text: "Erro interno no servidor." };
        }

        return { status: true, text: `Agendamento  salvo!` };


    },

    async Edit(payload) {
        try {

        
        } catch (error) {
            return { status: false, text: "Erro interno no servidor." };
        }

        return { status: true, text: `Agendamento  salvo!` };


    },

    async Delete(id) {
        // let Central = {};
        // try {
        //     Central = await db.sequelize.models.Instituicoes.findByPk(id);
        //     let Endereco = await db.sequelize.models.Endereco.findByPk(Central.EnderecoId);
        //     await Central.destroy();
        //     await Endereco.destroy();
        // } catch (error) {
        //     return { status: false, text: "Erro interno no servidor." };
        // }

        // return { status: true, text: `Central ${Central.nome} removida!` };
    },

    async GetAtividadesPrestador(search) {

        // let where = {};
        // let someAttributes = {};
 
        // if (search) {
        //     if (search.id)
        //         where.id = search.id;

        //     if (search.nome){
        //         where.nome = {
        //             [Op.substring]: search.nome
        //         }
        //     }

        //     if (search.cnpj){
        //         where.cnpj = {
        //             [Op.substring]: search.cnpj
        //         }
        //     }
        // }

    }

}
