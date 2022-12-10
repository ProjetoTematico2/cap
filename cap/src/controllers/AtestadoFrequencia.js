const db = require('../models/index');
const { Op } = require("sequelize");


function diff_hours(dt2, dt1) {

    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));

}


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
                {
                    model: db.sequelize.models.Processos,
                    include: [
                        { model: db.sequelize.models.Prestadores }
                    ]
                },
                {
                    model: db.sequelize.models.Tarefa,
                    include: [
                        { model: db.sequelize.models.Instituicoes }
                    ]
                }
            ],
        });

        const atestado = data.map(s => {
            return {
                "Número Processo": s.Processo.nro_processo,
                "Tarefa": s.Tarefa.titulo,
                "Entidade": s.Tarefa.Instituico.nome,
                "Data de Entrada": s.dt_entrada.toLocaleString("pt-BR"),
                "Data de Saída": s.dt_saida.toLocaleString("pt-BR"),
                "Horas Cumpridas": diff_hours(s.dt_entrada, s.dt_saida),
                "Observação": s.observacao
            }
        });

        return atestado;


    },


}

