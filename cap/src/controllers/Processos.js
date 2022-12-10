const db = require('../models/index');
const { TipoInstituicao } = require('../utils/enums');
const { Op } = require("sequelize");


function diff_hours(dt2, dt1) {

    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));

}


module.exports = {


    async GetProcesso(id) {
        const Processo = await db.sequelize.models.Processos.findByPk(id, {
            include: [
                { model: db.sequelize.models.Instituicoes },
                { model: db.sequelize.models.Prestadores },
                { model: db.sequelize.models.Vara },
                { model: db.sequelize.models.AtestadoFrequencia }]
        });

        const data = {
            id: Processo.id,
            id_central: { value: Processo.InstituicoId, label: Processo.Instituico.nome },
            nro_processo: Processo.nro_processo,
            nro_artigo_penal: Processo.nro_artigo_penal,
            pena_originaria: Processo.pena_originaria,
            pena_originaria_regime: Processo.pena_originaria_regime,
            inciso: Processo.inciso,
            detalhamento: Processo.detalhamento,
            prd: Processo.prd,
            prd_descricao: Processo.prd_descricao,
            horas_cumprir: Processo.horas_cumprir,
            possui_multa: Processo.possui_multa,
            valor_a_pagar: Processo.valor_a_pagar,
            qtd_penas_anteriores: Processo.qtd_penas_anteriores,
            vara: Processo.Vara ? Processo.Vara.nome : '',
            nome_prestador: Processo.Prestadore.nome,
            horas_cumpridas: Processo.AtestadoFrequencia.map(s => {
                return diff_hours(s.dt_entrada, s.dt_saida)
            }).reduce((a, b) => a + b, 0)
        }

        return data;


    },

    async GetProcessos(search) {
        let where = {};
        if (search) {
            if (search.id)
                where.id = search.id;

            if (search.nro_processo) {
                where.nro_processo = {
                    [Op.substring]: search.nro_processo
                }
            }
            if (search.id_prestador && search.id_prestador.value) {
                where.PrestadoreId = search.id_prestador.value;
            }
        }

        const Processos = await db.sequelize.models.Processos.findAll({
            include: [
                { model: db.sequelize.models.Prestadores },
                { model: db.sequelize.models.Vara },
                { model: db.sequelize.models.AtestadoFrequencia }
            ],
            where: where
        });

        const listaProcessos = Processos.map(s => {
            return {
                id: s.id,
                nro_processo: s.nro_processo,
                prestador: s.Prestadore.nome,
                horas_cumprir: s.horas_cumprir,
                horas_cumpridas: s.AtestadoFrequencia.map(s => {
                    return diff_hours(s.dt_entrada, s.dt_saida)
                }).reduce((a, b) => a + b, 0),
                vara: s.Vara ? s.Vara.nome : 'N/A'
            }
        });

        return listaProcessos;
    },

    async GetCentrais(args) {

        const data = await db.sequelize.models.Instituicoes.findAll({

            where: {
                tipo_instituicao: TipoInstituicao.Central
            },
        });

        return data.map(s => {
            return {
                value: s.id,
                label: `${s.id} - ${s.nome}`
            }
        });
    },

    async GetPrestador(args) {

        const data = await db.sequelize.models.Prestadores.findOne({
            attributes: ['nome'],
            where: {
                id: args.id
            },
        });

        return data;
    },

    async GetPrestadores() {
        const data = await db.sequelize.models.Prestadores.findAll();

        let array = data.map(s => {

            return {
                value: s.id,
                label: s.nome,
            }

        });

        array.unshift({ value: null, label: '' })

        return array;
    },

    async GetProcessosLabel(search) {

        const data = await db.sequelize.models.Processos.findAll({
            where: {
                PrestadoreId: search.value
            },
        });

        let array = data.map(s => {

            return {
                value: s.id,
                label: s.nro_processo
            }

        });

        return array;

    },


    async GetPrestadorLabel(search) {
        const data = await db.sequelize.models.Processos.findOne({
            where: {
                PrestadoreId: search.value
            },
            include: { model: db.sequelize.models.Prestadores }
        });

        const prestador = {
            value: data.Prestadore.dataValues.id,
            label: data.Prestadore.dataValues.nome
        }

        return prestador;
    },

    async Create(payload) {
        try {
            const Processo = await db.sequelize.models.Processos.create({
                PrestadoreId: parseInt(payload.id),
                InstituicoId: payload.processo.id_central.value,
                nro_processo: parseInt(payload.processo.nro_processo),
                nro_artigo_penal: parseInt(payload.processo.nro_artigo_penal),
                pena_originaria: payload.processo.pena_originaria,
                pena_originaria_regime: parseInt(payload.processo.pena_originaria_regime),
                inciso: payload.processo.inciso,
                detalhamento: payload.processo.detalhamento,
                prd: payload.processo.prd,
                prd_descricao: payload.processo.prd_descricao,
                persecucao_penal: payload.processo.persecucao_penal,
                horas_cumprir: parseInt(payload.processo.horas_cumprir),
                possui_multa: payload.processo.possui_multa,
                valor_a_pagar: parseFloat(payload.processo.valor_a_pagar),
                qtd_penas_anteriores: parseInt(payload.processo.qtd_penas_anteriores),
            });

            const Vara = await db.sequelize.models.Vara.create({
                nome: payload.processo.vara
            });

            return { status: true, text: `Processo ${payload.processo.nro_processo} criado!` };
        } catch (error) {
            return { status: false, text: "Erro interno no servidor." };
        }


    },

    async Edit(payload) {
        try {
            let Processo = await db.sequelize.models.Processos.findByPk(payload.id);
            Processo.InstituicoId = payload.processo.id_central.value;
            Processo.nro_processo = parseInt(payload.processo.nro_processo);
            Processo.nro_artigo_penal = parseInt(payload.processo.nro_artigo_penal);
            Processo.pena_originaria = payload.processo.pena_originaria;
            Processo.pena_originaria_regime = parseInt(payload.processo.pena_originaria_regime);
            Processo.inciso = payload.processo.inciso;
            Processo.detalhamento = payload.processo.detalhamento;
            Processo.prd = payload.processo.prd;
            Processo.prd_descricao = payload.processo.prd_descricao;
            Processo.persecucao_penal = payload.processo.persecucao_penal;
            Processo.horas_cumprir = parseInt(payload.processo.horas_cumprir);
            Processo.possui_multa = payload.processo.possui_multa;
            Processo.valor_a_pagar = parseFloat(payload.processo.valor_a_pagar);
            Processo.qtd_penas_anteriores = parseInt(payload.processo.qtd_penas_anteriores);
            await Processo.save();
            await db.sequelize.models.Vara.destroy({ where: { ProcessoId: payload.id } })

            if (payload.processo.vara) {

                const Vara = await db.sequelize.models.Vara.create({
                    ProcessoId: parseInt(payload.id),
                    nome: payload.processo.vara
                });
            }



            return { status: true, text: `Processo ${payload.processo.nro_processo} salvo!` };
        } catch (error) {
            return { status: false, text: "Erro interno no servidor." };
        }

    },

    async Delete(id) {
        try {
            let Processo = await db.sequelize.models.Processos.findByPk(id);
            await db.sequelize.models.Vara.destroy({ where: { ProcessoId: id } })
            await db.sequelize.models.Processos.destroy({ where: { id: id } })

            return { status: true, text: `Processo ${Processo.nro_processo} removido!` };

        } catch (error) {
            return { status: false, text: "Erro interno no servidor." };
        }

    },

    async GetRegistros(payload) {
        try {
            var id_processo = payload.id;

            const agendamentos = await db.sequelize.models.Agendamentos.findAll({
                include: [
                    {
                        model: db.sequelize.models.Tarefa,
                        include: [
                            { model: db.sequelize.models.Instituicoes }
                        ]
                    }
                ],
            });

            const registros = await db.sequelize.models.AtestadoFrequencia.findAll({
                where: {
                    ProcessoId: id_processo
                }
            });

            const data = registros.map(s => {
                return {
                    id: s.id,
                  
                    dt_entrada: s.dt_entrada.toLocaleString("pt-BR"),
                    dt_saida: s.dt_saida.toLocaleString("pt-BR"),
                    observacao: s.observacao,
                    total_horas: diff_hours(s.dt_entrada, s.dt_saida),
                    agendamento: agendamentos.filter(ss => ss.id == s.AgendamentoId).map(m => {
                        return {
                            tarefa: m.Tarefa.titulo,
                            data_inicial: s.data_inicial,
                            horario_inicio: m.horario_inicio,
                            horario_fim: m.horario_fim,
                            entidade: m.Tarefa.Instituico.nome
                        }
                    })[0]

                }
            });
            return { status: true, data: data };

        } catch (error) {
            return { status: false, text: "Erro interno no servidor." };
        }

    }

};