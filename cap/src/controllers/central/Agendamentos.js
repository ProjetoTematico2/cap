const db = require('../../models/index');
const { Op } = require("sequelize");

module.exports = {

    async Create(payload) {

        try {

            // let check = await db.sequelize.models.Agendamentos.findAll()
        
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

            // let check = await db.sequelize.models.Agendamentos.findAll({
            //     where: {
            //         id: {
            //             [Op.ne]: payload.id
            //         }
            //     }
            // })
           
            let Agendamento = await db.sequelize.models.Agendamentos.findByPk(payload.agendamentos[0].id);
  
            Agendamento.data_inicial = payload.agendamentos[0].data_inicial,
            Agendamento.horario_inicio = payload.agendamentos[0].horario_inicio,
            Agendamento.horario_fim = payload.agendamentos[0].horario_fim,
            Agendamento.segunda = payload.agendamentos.trabalho_dias_semana.filter(s => s.value === 0).length > 0,
            Agendamento.terca = payload.agendamentos.trabalho_dias_semana.filter(s => s.value === 1).length > 0,
            Agendamento.quarta = payload.agendamentos.trabalho_dias_semana.filter(s => s.value === 2).length > 0,
            Agendamento.quinta = payload.agendamentos.trabalho_dias_semana.filter(s => s.value === 3).length > 0,
            Agendamento.sexta = payload.agendamentos.trabalho_dias_semana.filter(s => s.value === 4).length > 0,
            Agendamento.sabado = payload.agendamentos.trabalho_dias_semana.filter(s => s.value === 5).length > 0,
            Agendamento.domingo = payload.agendamentos.trabalho_dias_semana.filter(s => s.value === 6).length > 0,
            Agendamento.ProcessoId = payload.search.id_processo.value,
            Agendamento.TarefaId = payload.search.id_tarefa.value
            await Agendamento.save();



        } catch (error) {
            return { status: false, text: "Erro interno no servidor. " + error.message  };
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
            if (search.id){
                where.id = search.id;
            }

        }

        const data = await db.sequelize.models.Agendamentos.findAll({
            where: where,
            include: [
                { model: db.sequelize.models.Processos },
                { model: db.sequelize.models.Tarefa }
            ],
        });

        return data.map(s => {
            let agendamentos = {
                id: s.id,
                horario_inicio: s.horario_inicio,
                horario_fim: s.horario_fim,
                data_inicial: s.data_inicial,
                trabalho_dias_semana: [
                    s.segunda ? { value: 0, label: "Segunda-feira" } : {value: 0, label: "Segunda-feira"},
                    s.terca ? { value: 1, label: "Terça-feira" } : { value: 0, label: "Terça-feira" },
                    s.quarta ? { value: 2, label: "Quarta-feira" } : { value: 0, label: "Quarta-feira" },
                    s.quinta ? { value: 3, label: "Quinta-feira" } : { value: 0, label: "Quinta-feira" },
                    s.sexta ? { value: 4, label: "Sexta-feira" } : { value: 0, label: "Sexta-feira" },
                    s.sabado ? { value: 5, label: "Sábado" } : { value: 0, label: "Sábado" },
                    s.domingo ? { value: 6, label: "Domingo" } : { value: 0, label: "Domingo" },
                ],
                processo_id: s.ProcessoId,
                tarefa_id: s.TarefaId,
                tarefa: s.Tarefa ,
                processo: s.Processo
            }
            return agendamentos;
        });
    },

}