const db = require('../models/index');
const { Op } = require("sequelize");
const { hash } = require('bcryptjs');


module.exports = {

    async Create(payload) {

        if (!payload)
            return { status: false, text: "Nenhuma informação recebida" };

        if (!payload.userName)
            return { status: false, text: "Informe um nome de usuário" };

        if (!payload.user)
            return { status: false, text: "Informe um usuário" };

        if (!payload.password)
            return { status: false, text: "Informe uma senha" };

        try {

            await db.sequelize.models.Usuario.create({
                nome: payload.userName,
                usuario: payload.user,
                senha: await hash(payload.password, 8),
            });

        } catch (error) {
            return { status: false, text: "Erro interno no servidor." };
        }

        return { status: true, text: `Usuário ${payload.userName} criada!` };
    },

    async Delete(id) {

        let User = {};
        let nome = '';
        try {
            User = await db.sequelize.models.Usuario.findByPk(id);
            nome = User.nome;
            await User.destroy();
        } catch (error) {
            return { status: false, text: "Erro interno no servidor." };
        }

        return { status: true, text: `Usuário ${nome} removida!` };

    },

    async Edit(payload) {

        if (!payload)
            return { status: false, text: "Nenhuma informação recebida" };

        if (!payload.nome)
            return { status: false, text: "Informe um nome de usuário" };

        if (!payload.usuario)
            return { status: false, text: "Informe um usuário" };

        if (!payload.senha)
            return { status: false, text: "Informe uma senha" };
        try {

            
            let Usuario = await db.sequelize.models.Usuario.findByPk(payload.id);
            Usuario.nome = payload.nome;
            Usuario.usuario = payload.usuario;
            Usuario.senha = await hash(payload.senha, 8);
            await Usuario.save();

        } catch (error) {
            return { status: false, text: error.message };
        }

        return { status: true, text: `Usuario ${payload.nome} salvo!` };



    },

    async GetUsuarios(search) {

        let where = {};

        if (search) {
            if (search.id)
                where.id = search.id;

            if (search.nome) {
                where.nome = {
                    [Op.substring]: search.name
                }
            }

            if (search.cnpj) {
                where.usuario = {
                    [Op.substring]: search.user
                }
            }
        }

        console.log(search)
        const data = await db.sequelize.models.Usuario.findAll({
            where: where,
        });

        return data.map(s => {
            return {
                id: s.id,
                nome: s.nome,
                usuario: s.usuario,
                senha: s.senha,
            }
        });
    }

}