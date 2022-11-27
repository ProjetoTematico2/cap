const db = require('../models/index');
const { Op } = require("sequelize");
const { TipoInstituicao } = require('../utils/enums');

module.exports = {

    async Create(payload) {

        if (!payload)
            return { status: false, text: "Nenhuma informação recebida" };

        if (!payload.nome)
            return { status: false, text: "Informe um nome" };

        if (!payload.cnpj)
            return { status: false, text: "Informe um CNPJ" };

        if (!payload.telefone1)
            return { status: false, text: "Informe um telefone" };

        try {


            const instituicao = await db.sequelize.models.Instituicoes.create({
                nome: payload.nome,
                cnpj: parseInt(payload.cnpj),
                email: payload.email,
                telefone1: payload.telefone1,
                telefone2: payload.telefone2,
                observacao: payload.observacao,
                tipo_instituicao: TipoInstituicao.Entidade
            });

            return { status: true, text: `Instituicao ${payload.nome} criada!`, id: instituicao.id };

        } catch (error) {
            return { status: false, text: error.message };
        }


    },

    async Edit(payload) {

        if (!payload)
            return { status: false, text: "Nenhuma informação recebida" };

        if (!payload.nome)
            return { status: false, text: "Informe um nome" };

        if (!payload.cnpj)
            return { status: false, text: "Informe um CNPJ" };

        if (!payload.telefone1)
            return { status: false, text: "Informe um telefone" };


        try {

            let Instituicao = await db.sequelize.models.Instituicoes.findByPk(payload.id);
            Instituicao.nome = payload.nome;
            Instituicao.cnpj = parseInt(payload.cnpj);
            Instituicao.email = payload.email;
            Instituicao.telefone1 = payload.telefone1;
            Instituicao.telefone2 = payload.telefone2;
            Instituicao.observacao = payload.observacao;
            Instituicao.tipo_instituicao = TipoInstituicao.Entidade;
            await Instituicao.save();

        } catch (error) {
            return { status: false, text: "Erro interno no servidor." };
        }

        return { status: true, text: `Central ${payload.nome} salva!` };


    },

    async Delete(id) {
        let Instituicao = {};
        let nome = '';
        try {
            Instituicao = await db.sequelize.models.Instituicoes.findByPk(id);
            nome = Instituicao.nome
            await Instituicao.destroy();
        } catch (error) {
            return { status: false, text: "Erro interno no servidor." };
        }

        return { status: true, text: `Instituição ${nome} removida!` };
    },

    async GetInstituicoes(search) {

        let where = {};
        let someAttributes = {};

        if (search) {
            if (search.id)
                where.id = search.id;

            if (search.nome) {
                where.nome = {
                    [Op.substring]: search.nome
                }
            }

            if (search.cnpj) {
                where.cnpj = {
                    [Op.substring]: search.cnpj
                }
            }
        }



        const data = await db.sequelize.models.Instituicoes.findAll({
            where: where,
        });

        return data.map(s => {
            return {
                id: s.id,
                nome: s.nome,
                cnpj: s.cnpj,
                email: s.email,
                telefone1: s.telefone1,
                telefone2: s.telefone2,
                observacao: s.observacao
            }
        });
    }

}