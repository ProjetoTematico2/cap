const db = require('../../models/index');
const { Op } = require("sequelize");

module.exports = {

    async GetAtestadoFrequencia(search) {

        let where = {};
        let someAttributes = {};

        if (search) {
            if (search.id_prestador) {
                where.ProcessoId = search.id_prestador;
            }

        }

     
       
        const data = await db.sequelize.models.AtestadoFrequencia.findAll({
            where: {
                ProcessoId: where.ProcessoId,
            },
            include: [
                { model: db.sequelize.models.Processos },
                { model: db.sequelize.models.Tarefa }
            ],
        });

        return data.map(s => {
            let atestados = {
                id: s.id,
                dt_entrada: s.dt_entrada,
                dt_saida: s.dt_saida,
                observacao: s.observacao,
                tarefa: s.Tarefa.dataValues,
                processo: s.Processo.dataValues
            }
          
            return atestados;
        });
    },


}

