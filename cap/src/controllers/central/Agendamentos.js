const db = require('../../models/index');
const { Op } = require("sequelize");

module.exports = {

    async Create(payload) {

        try {

            if (payload.search.id_prestador.value == null || payload.search.id_prestador == '') {
                return { status: false, text: `Selecione o prestador` };
            } else if (payload.search.id_processo.value == null || payload.search.id_processo == '') {
                return { status: false, text: `Selecione o processo` };
            } else if (payload.search.id_processo.value == null || payload.search.id_tarefa == '') {
                return { status: false, text: `Selecione a tarefa` };
            } else if (payload.search.id_processo.value == null || payload.search.id_entidade == '') {
                return { status: false, text: `Selecione a instituição` };
            } else if (payload.agendamentos.agendamento_dias_semana.length <= 0) {
                return { status: false, text: `Selecione os dias da semana das tarefas` };
            }


            await db.sequelize.models.Agendamentos.create({

                data_inicial: payload.agendamentos.agendamento_dia_inicial,
                horario_inicio: payload.agendamentos.agendamento_horario_inicio,
                horario_fim: payload.agendamentos.agendamento_horario_fim,
                segunda: payload.agendamentos.agendamento_dias_semana.filter(s => s.value === 0).length > 0,
                terca: payload.agendamentos.agendamento_dias_semana.filter(s => s.value === 1).length > 0,
                quarta: payload.agendamentos.agendamento_dias_semana.filter(s => s.value === 2).length > 0,
                quinta: payload.agendamentos.agendamento_dias_semana.filter(s => s.value === 3).length > 0,
                sexta: payload.agendamentos.agendamento_dias_semana.filter(s => s.value === 4).length > 0,
                sabado: payload.agendamentos.agendamento_dias_semana.filter(s => s.value === 5).length > 0,
                domingo: payload.agendamentos.agendamento_dias_semana.filter(s => s.value === 6).length > 0,
                ProcessoId: payload.search.id_processo.value,
                TarefaId: payload.search.id_tarefa.value
            })

        } catch (error) {
            return { status: false, text: `Erro interno no servidor.` };
        }

        return { status: true, text: `Agendamento criado` };


    },

    async Edit(payload) {



        try {

            if (payload.search.id_prestador.value == null || payload.search.id_prestador == '') {
                return { status: false, text: `Selecione o prestador` };
            } else if (payload.search.id_processo.value == null || payload.search.id_processo == '') {
                return { status: false, text: `Selecione o processo` };
            } else if (payload.search.id_processo.value == null || payload.search.id_tarefa == '') {
                return { status: false, text: `Selecione a tarefa` };
            } else if (payload.search.id_processo.value == null || payload.search.id_entidade == '') {
                return { status: false, text: `Selecione a instituição` };
            } else if (payload.agendamentos.agendamento_dias_semana.length <= 0) {
                return { status: false, text: `Selecione os dias da semana das tarefas` };
            }


            let Agendamento = await db.sequelize.models.Agendamentos.findByPk(payload.agendamentos.id);

            Agendamento.data_inicial = payload.agendamentos.agendamento_dia_inicial,
                Agendamento.horario_inicio = payload.agendamentos.agendamento_horario_inicio,
                Agendamento.horario_fim = payload.agendamentos.agendamento_horario_fim,
                Agendamento.segunda = payload.agendamentos.agendamento_dias_semana.filter(s => s.value === 0).length > 0,
                Agendamento.terca = payload.agendamentos.agendamento_dias_semana.filter(s => s.value === 1).length > 0,
                Agendamento.quarta = payload.agendamentos.agendamento_dias_semana.filter(s => s.value === 2).length > 0,
                Agendamento.quinta = payload.agendamentos.agendamento_dias_semana.filter(s => s.value === 3).length > 0,
                Agendamento.sexta = payload.agendamentos.agendamento_dias_semana.filter(s => s.value === 4).length > 0,
                Agendamento.sabado = payload.agendamentos.agendamento_dias_semana.filter(s => s.value === 5).length > 0,
                Agendamento.domingo = payload.agendamentos.agendamento_dias_semana.filter(s => s.value === 6).length > 0,
                Agendamento.ProcessoId = payload.search.id_processo.value,
                Agendamento.TarefaId = payload.search.id_tarefa.value
            await Agendamento.save();



        } catch (error) {
            return { status: false, text: "Erro interno no servidor." };
        }

        return { status: true, text: `Agendamento Editado` };


    },

    async Delete(id) {
        let Agenda = {};
        try {
            Agendamento = await db.sequelize.models.Agendamentos.findByPk(id);
            await Agendamento.destroy();
        } catch (error) {
            return { status: false, text: "Erro interno no servidor." };
        }

        return { status: true, text: `Agendamento removido!` };
    },

    async GetAgendamentos(search) {

        let where = {};
        let someAttributes = {};

        if (search) {
            if (search.processo) {
                where.id = search.processo;
            }

        }   
       

        const data = await db.sequelize.models.Agendamentos.findAll({
            where: {
                //ProcessoId: where,
            },
            include: [
                { model: db.sequelize.models.Processos },
                { model: db.sequelize.models.Tarefa }
            ],
        });

        return data.map(s => {
            let agendamentos = {
                id: s.id,
                agendamento_horario_inicio: s.horario_inicio,
                agendamento_horario_fim: s.horario_fim,
                agendamento_dia_inicial: s.data_inicial,
                agendamento_dias_semana: [
                    s.segunda ? { value: 0, label: "Segunda-feira" } : false,
                    s.terca ? { value: 1, label: "Terça-feira" } : false,
                    s.quarta ? { value: 2, label: "Quarta-feira" } : false,
                    s.quinta ? { value: 3, label: "Quinta-feira" } : false,
                    s.sexta ? { value: 4, label: "Sexta-feira" } : false,
                    s.sabado ? { value: 5, label: "Sábado" } : false,
                    s.domingo ? { value: 6, label: "Domingo" } : false
                ],
                processo_id: s.ProcessoId,
                tarefa_id: s.TarefaId,
                tarefa: s.Tarefa,
                processo: s.Processo
            }
            return agendamentos;
        });
    },

}