const { hash } = require('bcryptjs');
const path = require('path');
const CriptCap = require(path.join(__basedir, '../src/utils/criptcap'));
const db = require('../models/index');
const { TipoInstituicao } = require('../utils/enums');
const cAPP = require('../app');


const SetFileCentral = async (payload) => {





}


module.exports = {

    async GetFileEntidade() {

        var Entidade = await db.sequelize.models.Instituicoes.findOne({
            where: {
                tipo_instituicao: TipoInstituicao.Entidade
            },
            include: [
                { model: db.sequelize.models.Endereco }
            ]

        });

        const agendamentos = await db.sequelize.models.Agendamentos.findAll({
            include: [
                { model: db.sequelize.models.Tarefa },
                { model: db.sequelize.models.Processos }
            ],
        });

        const frequencia = await db.sequelize.models.AtestadoFrequencia.findAll();



        const data = {
            mode: cAPP.config.mode,
            AtestadoFrequencia: frequencia.map(s => {
                return {

                    id: s.id,
                    dt_entrada: s.dt_entrada,
                    dt_saida: s.dt_saida,
                    observacao: s.observacao,
                    info_agendamento: agendamentos.filter(ss => ss.id == s.AgendamentoId).map(m => {
                        return {
                            id_agendamento: m.ref_integracao,
                            id_processo: m.Processo.ref_integracao,
                            id_tarefa: m.Tarefa.ref_integracao
                        }
                    })[0]
                }
            }),

        }

        let criptData = await CriptCap.encriptData(data);

        return {
            status: true,
            data: criptData,
            fileName: `syncFileEntidade_${Entidade.nome.replaceAll(" ", "")}.bin`
        }

    },



    async GetFile(payload) {

        const id_entidade = payload.entidade.value;
        const Entidade = await db.sequelize.models.Instituicoes.findByPk(id_entidade,
            {
                include: [
                    { model: db.sequelize.models.Endereco },
                    { model: db.sequelize.models.Tarefa }
                ],
            });

        if (!Entidade)
            return { status: false, text: "Entidade não localizada!" };


        const Centrais = await db.sequelize.models.Instituicoes.findAll(
            {
                where: {
                    tipo_instituicao: TipoInstituicao.Central
                },
                include: [
                    { model: db.sequelize.models.Endereco }
                ],
            });


        const id_tarefas = Entidade.Tarefas.map(s => s.id);

        const TarefasProcessos = await db.sequelize.models.TarefaProcessos.findAll({
            where: {
                TarefaId: id_tarefas
            }

        });

        const Agendamentos = await db.sequelize.models.Agendamentos.findAll({
            where: {
                TarefaId: id_tarefas
            }
        })

        const id_processos = Agendamentos.map(s => s.ProcessoId);

        const Processos = await db.sequelize.models.Processos.findAll({
            where: {
                id: id_processos
            },
            include: [
                {
                    model: db.sequelize.models.Prestadores,
                    include: [
                        { model: db.sequelize.models.Beneficios },
                        { model: db.sequelize.models.Familiares },
                        { model: db.sequelize.models.Habilidades },
                        { model: db.sequelize.models.Cursos },
                        { model: db.sequelize.models.Endereco },
                        { model: db.sequelize.models.Trabalho },
                        { model: db.sequelize.models.FichaMedica, include: { model: db.sequelize.models.UsoDrogas, include: { model: db.sequelize.models.Drogas } } },
                    ]
                },
                { model: db.sequelize.models.Vara }
            ]
        }
        );



        const AgendamentosData = Agendamentos.map(s => {
            return {
                id: s.id,
                horario_inicio: s.horario_inicio,
                horario_fim: s.horario_fim,
                data_inicial: s.data_inicial,
                segunda: s.segunda,
                terca: s.terca,
                quarta: s.quarta,
                quinta: s.quinta,
                sexta: s.sexta,
                sabado: s.sabado,
                domingo: s.domingo,
                ProcessoId: s.ProcessoId,
                TarefaId: s.TarefaId,
            }
        });

        const ProcessosData = Processos.map(s => {
            return {
                id: s.id,
                id_central: s.InstituicoId,
                nro_processo: s.nro_processo,
                nro_artigo_penal: s.nro_artigo_penal,
                pena_originaria: s.pena_originaria,
                pena_originaria_regime: s.pena_originaria_regime,
                inciso: s.inciso,
                detalhamento: s.detalhamento,
                prd: s.prd,
                prd_descricao: s.prd_descricao,
                horas_cumprir: s.horas_cumprir,
                possui_multa: s.possui_multa,
                valor_a_pagar: s.valor_a_pagar,
                qtd_penas_anteriores: s.qtd_penas_anteriores,

                Vara: s.Vara != null ? {
                    nome: s.Vara.nome,
                    id: s.Vara.id
                } : null,

                Prestador: {
                    id: s.Prestadore.id,
                    nome: s.Prestadore.nome,
                    cpf: s.Prestadore.cpf,
                    image: s.Prestadore.image,
                    nome_mae: s.Prestadore.nome_mae,
                    estado_civil: s.Prestadore.estado_civil,
                    etnia: s.Prestadore.etnia,
                    escolaridade: s.Prestadore.escolaridade,
                    renda_familiar: s.Prestadore.renda_familiar,
                    telefone1: s.Prestadore.telefone1,
                    telefone2: s.Prestadore.telefone2,
                    dt_nascimento: s.Prestadore.dt_nascimento,
                    religiao: s.Prestadore.religiao,
                    possui_beneficios: s.Prestadore.Beneficios.length > 0,
                    Beneficios: s.Prestadore.Beneficios.map(b => {
                        return {
                            id: b.id,
                            nome: b.nome,
                            PrestadoreId: b.PrestadoreId
                        }
                    }),
                    Familiares: s.Prestadore.Familiares.map(b => {
                        return {
                            id: b.id,
                            familiar_nome: b.nome,
                            familiar_parentesco: b.idade,
                            familiar_idade: b.parentesco,
                            familiar_profissao: b.profissao,
                            PrestadoreId: b.PrestadoreId
                        }
                    }),
                    Habilidades: s.Prestadore.Habilidades.map(b => {
                        return {
                            id: b.id,
                            habilidade: b.descricao,
                            PrestadoreId: b.PrestadoreId
                        }
                    }),
                    Cursos: s.Prestadore.Cursos.map(b => {
                        return {
                            id: b.id,
                            curso_descricao: b.curso,
                            curso_instituicao: b.intituicao,
                            curso_observacao: b.observacoes,
                            PrestadoreId: b.PrestadoreId
                        }
                    }),

                    Endereco: {
                        id: s.Prestadore.Endereco.id,
                        rua: s.Prestadore.Endereco.rua,
                        numero: s.Prestadore.Endereco.numero,
                        cep: s.Prestadore.Endereco.cep,
                        bairro: s.Prestadore.Endereco.bairro,
                        complemento: s.Prestadore.Endereco.complemento,
                        CidadeId: s.Prestadore.Endereco.CidadeId,
                    },

                    Saude: {
                        PrestadoreId: s.PrestadoreId,
                        id: s.Prestadore.FichaMedica.id,
                        saude_deficiencia: s.Prestadore.FichaMedica.deficiencia,
                        saude_observacao: s.Prestadore.FichaMedica.observacao,
                        saude_drogas: s.Prestadore.FichaMedica.UsoDrogas.map(b => {
                            return {
                                id: b.Droga.id,
                                droga_nome: b.Droga.nome,
                                droga_frequencia: b.frequencia
                            }
                        })
                    },

                    Trabalho: {
                        id: s.Prestadore.Trabalho.id,
                        descricao: s.Prestadore.Trabalho.descricao,
                        horario_inicio: s.Prestadore.Trabalho.horario_inicio,
                        horario_fim: s.Prestadore.Trabalho.horario_fim,
                        segunda: s.Prestadore.Trabalho.segunda,
                        terca: s.Prestadore.Trabalho.terca,
                        quarta: s.Prestadore.Trabalho.quarta,
                        quinta: s.Prestadore.Trabalho.quinta,
                        sexta: s.Prestadore.Trabalho.sexta,
                        sabado: s.Prestadore.Trabalho.sabado,
                        domingo: s.Prestadore.Trabalho.domingo,
                        PrestadoreId: s.PrestadoreId
                    }



                }
            }
        }
        );

        const TarefasProcessosData = TarefasProcessos.map(s => {
            return {
                TarefaId: s.TarefaId,
                ProcessoId: s.ProcessoId
            }
        })



        const CentraisData = Centrais.map(s => {
            return {
                id: s.id,
                nome: s.nome,
                cnpj: s.cnpj,
                email: s.email,
                telefone1: s.telefone1,
                telefone2: s.telefone2,
                tipo_instituicao: s.tipo_instituicao,
                dt_descredenciamento: s.dt_descredenciamento,
                motivo: s.observacao,
                endereco: {
                    id: s.Endereco.id,
                    rua: s.Endereco.rua,
                    numero: s.Endereco.numero,
                    cep: s.Endereco.cep,
                    bairro: s.Endereco.bairro,
                    complemento: s.Endereco.complemento,
                    CidadeId: s.Endereco.CidadeId,
                }
            }
        })


        const EntidadeData = {
            id: Entidade.id,
            nome: Entidade.nome,
            cnpj: Entidade.cnpj,
            email: Entidade.email,
            telefone1: Entidade.telefone1,
            telefone2: Entidade.telefone2,
            tipo_instituicao: Entidade.tipo_instituicao,
            dt_descredenciamento: Entidade.dt_descredenciamento,
            motivo: Entidade.observacao,
            endereco: {
                id: Entidade.Endereco.id,
                rua: Entidade.Endereco.rua,
                numero: Entidade.Endereco.numero,
                cep: Entidade.Endereco.cep,
                bairro: Entidade.Endereco.bairro,
                complemento: Entidade.Endereco.complemento,
                CidadeId: Entidade.Endereco.CidadeId,
            },
            tarefa: Entidade.Tarefas.map(a => {
                return {
                    id: a.id,
                    titulo: a.titulo,
                    descricao: a.descricao,
                    status: a.status
                }
            }),
        }

        const defaultAdminUser = {
            usuario: "admin",
            nome: "Administrador",
            senha: await hash("1234", 8),
            InstituicoId: id_entidade
        }

        const data = {
            mode: cAPP.config.mode,
            Entidade: EntidadeData, //OK
            DefaultUser: defaultAdminUser, //OK
            Centrais: CentraisData, //OK
            Processos: ProcessosData, //OK
            TarefasProcessos: TarefasProcessosData, //OK
            Agendamentos: AgendamentosData

        }

        let criptData = await CriptCap.encriptData(data);

        return {
            status: true,
            data: criptData,
            fileName: `syncFile_${Entidade.nome.replaceAll(" ", "")}.bin`
        }

    },

    async SetFile(payload) {


        try {


            if (cAPP.config.mode == 0) {
                const textData = payload.data;

                const buffer = new Buffer.from(textData, 'utf8');

                const decriptData = await CriptCap.dencriptData(buffer);

                if (!decriptData)
                    return { status: false, text: "Arquivo inválido" };

                if (decriptData.mode == cAPP.config.mode)
                    return { status: false, text: "Arquivo não condiz com o tipo da aplicação" };

                for (let index = 0; index < decriptData.AtestadoFrequencia.length; index++) {

                    const atestado = decriptData.AtestadoFrequencia[index];

                    let atestadoExistente = await db.sequelize.models.AtestadoFrequencia.findOne({
                        where: {
                            ref_integracao: atestado.id
                        }
                    })

                    if (atestadoExistente == null) {
                        atestadoExistente = await db.sequelize.models.AtestadoFrequencia.create({
                            dt_entrada: atestado.dt_entrada,
                            dt_saida: atestado.dt_saida,
                            observacao: atestado.observacao,
                            AgendamentoId: atestado.info_agendamento.id_agendamento,
                            ProcessoId: atestado.info_agendamento.id_processo,
                            TarefaId: atestado.info_agendamento.id_tarefa,
                            ref_integracao: atestado.id,
                        })
                    }
                    else {

                        atestadoExistente.dt_entrada = atestado.dt_entrada;
                        atestadoExistente.dt_saida = atestado.dt_saida;
                        atestadoExistente.observacao = atestado.observacao;

                        await atestadoExistente.save();
                    }

                }
            }
            else {


                const textData = payload.data;

                const buffer = new Buffer.from(textData, 'utf8');

                const decriptData = await CriptCap.dencriptData(buffer);



                if (!decriptData)
                    return { status: false, text: "Arquivo inválido" };

                if (decriptData.mode == cAPP.config.mode)
                    return { status: false, text: "Arquivo não condiz com o tipo da aplicação" };


                var Entidade = await db.sequelize.models.Instituicoes.findOne({
                    where: {
                        tipo_instituicao: TipoInstituicao.Entidade
                    },
                    include: [
                        { model: db.sequelize.models.Endereco }
                    ]

                });

                //#region Sync Entidade

                if (Entidade == null) {

                    await db.sequelize.models.Endereco.create({

                        nome: decriptData.Entidade.endereco.nome,
                        rua: decriptData.Entidade.endereco.rua,
                        cep: decriptData.Entidade.endereco.cep,
                        numero: decriptData.Entidade.endereco.numero,
                        bairro: decriptData.Entidade.endereco.bairro,
                        complemento: decriptData.Entidade.endereco.complemento,
                        CidadeId: decriptData.Entidade.endereco.CidadeId

                    }).then(async (endereco) => {
                        Entidade = await db.sequelize.models.Instituicoes.create({
                            nome: decriptData.Entidade.nome,
                            cnpj: decriptData.Entidade.cnpj,
                            email: decriptData.Entidade.email,
                            telefone1: decriptData.Entidade.telefone1,
                            telefone2: decriptData.Entidade.telefone2,
                            tipo_instituicao: TipoInstituicao.Entidade,
                            ref_integracao: decriptData.Entidade.id,
                            EnderecoId: endereco.id
                        });
                    });

                }
                else if (Entidade.ref_integracao != decriptData.Entidade.id) {
                    return { status: false, text: "Entidade do arquivo divergente da existente no banco de dados" };
                }
                else {
                    Entidade.nome = decriptData.Entidade.nome;
                    Entidade.cnpj = decriptData.Entidade.cnpj;
                    Entidade.email = decriptData.Entidade.email;
                    Entidade.telefone1 = decriptData.Entidade.telefone1;
                    Entidade.telefone2 = decriptData.Entidade.telefone2;
                    Entidade.tipo_instituicao = decriptData.Entidade.tipo_instituicao;

                    Entidade.Endereco.nome = decriptData.Entidade.endereco.nome;
                    Entidade.Endereco.rua = decriptData.Entidade.endereco.rua;
                    Entidade.Endereco.cep = decriptData.Entidade.endereco.cep;
                    Entidade.Endereco.numero = decriptData.Entidade.endereco.numero;
                    Entidade.Endereco.bairro = decriptData.Entidade.endereco.bairro;
                    Entidade.Endereco.complemento = decriptData.Entidade.endereco.complemento;
                    Entidade.Endereco.CidadeId = decriptData.Entidade.endereco.CidadeId;

                    await Entidade.save();
                    await Entidade.Endereco.save();
                }

                //#endregion

                //#region Centrais

                for (let index = 0; index < decriptData.Centrais.length; index++) {
                    const Central = decriptData.Centrais[index];

                    let centralExistente = await db.sequelize.models.Instituicoes.findOne({
                        where: {
                            ref_integracao: Central.id
                        },
                        include: [
                            { model: db.sequelize.models.Endereco }
                        ]
                    });

                    if (centralExistente == null) {

                        await db.sequelize.models.Endereco.create({

                            nome: Central.endereco.nome,
                            rua: Central.endereco.rua,
                            cep: Central.endereco.cep,
                            numero: Central.endereco.numero,
                            bairro: Central.endereco.bairro,
                            complemento: Central.endereco.complemento,
                            CidadeId: Central.endereco.id_cidade

                        }).then(async (endereco) => {
                            Entidade = await db.sequelize.models.Instituicoes.create({
                                nome: Central.nome,
                                cnpj: Central.cnpj,
                                email: Central.email,
                                telefone1: Central.telefone1,
                                telefone2: Central.telefone2,
                                tipo_instituicao: Central.tipo_instituicao,
                                ref_integracao: Central.id,
                                EnderecoId: endereco.id
                            });
                        });
                    }
                    else {

                        centralExistente.nome = Central.nome;
                        centralExistente.cnpj = Central.cnpj;
                        centralExistente.email = Central.email;
                        centralExistente.telefone1 = Central.telefone1;
                        centralExistente.telefone2 = Central.telefone2;
                        centralExistente.tipo_instituicao = Central.tipo_instituicao;

                        centralExistente.Endereco.nome = Central.endereco.nome;
                        centralExistente.Endereco.rua = Central.endereco.rua;
                        centralExistente.Endereco.cep = Central.endereco.cep;
                        centralExistente.Endereco.numero = Central.endereco.numero;
                        centralExistente.Endereco.bairro = Central.endereco.bairro;
                        centralExistente.Endereco.complemento = Central.endereco.complemento;
                        centralExistente.Endereco.CidadeId = Central.endereco.CidadeId;

                        await centralExistente.save();
                        await centralExistente.Endereco.save();

                    }

                }

                //#endregion

                //#region Sync Prestadores

                let Prestadores = decriptData.Processos.map(s => s.Prestador);

                for (let index = 0; index < Prestadores.length; index++) {

                    const Prestador = Prestadores[index];
                    let EnderecoPrestador = Prestador.Endereco;

                    let prestadorExistente = await db.sequelize.models.Prestadores.findOne({
                        where: {
                            ref_integracao: Prestador.id
                        },
                        include: [
                            { model: db.sequelize.models.Endereco },
                            { model: db.sequelize.models.Trabalho }
                        ]
                    });

                    if (prestadorExistente == null) {


                        let Endereco = await db.sequelize.models.Endereco.create({
                            nome: EnderecoPrestador.nome,
                            rua: EnderecoPrestador.rua,
                            cep: EnderecoPrestador.cep,
                            numero: EnderecoPrestador.numero,
                            bairro: EnderecoPrestador.bairro,
                            complemento: EnderecoPrestador.complemento,
                            CidadeId: EnderecoPrestador.id_cidade
                        });

                        prestadorExistente = await db.sequelize.models.Prestadores.create({
                            EnderecoId: Endereco.id,
                            nome: Prestador.nome,
                            cpf: Prestador.cpf,
                            nome_mae: Prestador.nome_mae,
                            dt_nascimento: Prestador.dt_nascimento,
                            estado_civil: Prestador.estado_civil,
                            etnia: Prestador.etnia,
                            escolaridade: Prestador.escolaridade,
                            renda_familiar: Prestador.renda_familiar,
                            telefone1: Prestador.telefone1,
                            telefone2: Prestador.telefone2,
                            religiao: Prestador.religiao,
                            image: Prestador.image,
                            possui_beneficios: Prestador.possui_beneficios,
                            ref_integracao: Prestador.id

                        });
                    }
                    else {

                        prestadorExistente.nome = Prestador.nome;
                        prestadorExistente.cpf = Prestador.cpf;
                        prestadorExistente.nome_mae = Prestador.nome_mae;
                        prestadorExistente.dt_nascimento = Prestador.dt_nascimento;
                        prestadorExistente.estado_civil = Prestador.estado_civil;
                        prestadorExistente.etnia = Prestador.etnia;
                        prestadorExistente.escolaridade = Prestador.escolaridade;
                        prestadorExistente.renda_familiar = Prestador.renda_familiar;
                        prestadorExistente.telefone1 = Prestador.telefone1;
                        prestadorExistente.telefone2 = Prestador.telefone2;
                        prestadorExistente.religiao = Prestador.religiao;
                        prestadorExistente.image = Prestador.image;
                        prestadorExistente.possui_beneficios = Prestador.possui_beneficios;
                        prestadorExistente.save();

                        prestadorExistente.Endereco.nome = EnderecoPrestador.nome;
                        prestadorExistente.Endereco.rua = EnderecoPrestador.rua;
                        prestadorExistente.Endereco.cep = EnderecoPrestador.cep;
                        prestadorExistente.Endereco.numero = EnderecoPrestador.numero;
                        prestadorExistente.Endereco.bairro = EnderecoPrestador.bairro;
                        prestadorExistente.Endereco.complemento = EnderecoPrestador.complemento;
                        prestadorExistente.Endereco.CidadeId = EnderecoPrestador.CidadeId;
                        prestadorExistente.Endereco.save();

                    }


                }
                //#endregion

                //#region Sync Saude
                let Saudes = decriptData.Processos.map(s => s.Prestador.Saude);
                for (let index = 0; index < Saudes.length; index++) {
                    const Saude = Saudes[index];
                    let saudeExistente = await db.sequelize.models.FichaMedica.findOne({
                        where: {
                            ref_integracao: Saude.id
                        }
                    });

                    if (saudeExistente == null) {

                        let prestador = await db.sequelize.models.Prestadores.findOne({
                            where: {
                                ref_integracao: Saude.PrestadoreId
                            }
                        });

                        saudeExistente = await db.sequelize.models.FichaMedica.create({
                            PrestadoreId: prestador.id,
                            deficiencia: Saude.saude_deficiencia,
                            observacao: Saude.saude_observacao,
                            ref_integracao: Saude.id
                        });
                    }
                    else {
                        saudeExistente.deficiencia = Saude.saude_deficiencia;
                        saudeExistente.observacao = Saude.saude_observacao;
                        await saudeExistente.save();
                    }

                }

                //#endregion

                //#region Sync Trabalhos

                let Trabalhos = decriptData.Processos.map(s => s.Prestador.Trabalho);

                for (let index = 0; index < Trabalhos.length; index++) {

                    const Trabalho = Trabalhos[index];

                    let trabalhoExistente = await db.sequelize.models.Trabalho.findOne({
                        where: {
                            ref_integracao: Trabalho.id
                        }
                    });

                    if (trabalhoExistente == null) {

                        let prestador = await db.sequelize.models.Prestadores.findOne({
                            where: {
                                ref_integracao: Trabalho.PrestadoreId
                            }
                        });

                        trabalhoExistente = await db.sequelize.models.Trabalho.create({
                            PrestadoreId: prestador.id,
                            descricao: Trabalho.descricao,
                            horario_inicio: Trabalho.horario_inicio,
                            horario_fim: Trabalho.horario_fim,
                            segunda: Trabalho.segunda,
                            terca: Trabalho.terca,
                            quarta: Trabalho.quarta,
                            quinta: Trabalho.quinta,
                            sexta: Trabalho.sexta,
                            sabado: Trabalho.sabado,
                            domingo: Trabalho.domingo,
                            ref_integracao: Trabalho.id
                        });
                    }
                    else {

                        trabalhoExistente.descricao = Trabalho.descricao;
                        trabalhoExistente.horario_inicio = Trabalho.horario_inicio;
                        trabalhoExistente.horario_fim = Trabalho.horario_fim;
                        trabalhoExistente.segunda = Trabalho.segunda;
                        trabalhoExistente.terca = Trabalho.terca;
                        trabalhoExistente.quarta = Trabalho.quarta;
                        trabalhoExistente.quinta = Trabalho.quinta;
                        trabalhoExistente.sexta = Trabalho.sexta;
                        trabalhoExistente.sabado = Trabalho.sabado;
                        trabalhoExistente.domingo = Trabalho.domingo;

                        await trabalhoExistente.save();
                    }

                }


                //#endregion

                //#region Sync Beneficios

                let Beneficios = decriptData.Processos.map(s => s.Prestador.Beneficios.map(b => b)).reduce(function (a, b) { return a.concat(b); }, []);

                for (let index = 0; index < Beneficios.length; index++) {
                    const Beneficio = Beneficios[index];

                    let beneficioExistente = await db.sequelize.models.Beneficios.findOne({
                        where: {
                            ref_integracao: Beneficio.id
                        },
                    });


                    if (beneficioExistente == null) {
                        let prestador = await db.sequelize.models.Prestadores.findOne({
                            where: {
                                ref_integracao: Beneficio.PrestadoreId
                            }
                        });

                        beneficioExistente = await db.sequelize.models.Beneficios.create({
                            nome: Beneficio.nome,
                            PrestadoreId: prestador.id,
                            ref_integracao: Beneficio.id
                        });
                    }
                    else {
                        beneficioExistente.nome = Beneficio.nome;
                        await beneficioExistente.save();
                    }
                }

                //#endregion

                //#region Sync Cursos

                let Cursos = decriptData.Processos.map(s => s.Prestador.Cursos.map(b => b)).reduce(function (a, b) { return a.concat(b); }, []);
                for (let index = 0; index < Cursos.length; index++) {
                    const Curso = Cursos[index];

                    let cursoExistente = await db.sequelize.models.Cursos.findOne({
                        where: {
                            ref_integracao: Curso.id
                        },
                    });

                    if (cursoExistente == null) {
                        let prestador = await db.sequelize.models.Prestadores.findOne({
                            where: {
                                ref_integracao: Curso.PrestadoreId
                            }
                        });
                        cursoExistente = await db.sequelize.models.Cursos.create({
                            PrestadoreId: prestador.id,
                            intituicao: Curso.curso_instituicao,
                            curso: Curso.curso_descricao,
                            observacoes: Curso.curso_observacoes,
                            ref_integracao: Curso.id
                        });
                    }
                    else {

                        cursoExistente.intituicao = Curso.curso_instituicao;
                        cursoExistente.curso = Curso.curso_descricao;
                        cursoExistente.observacoes = Curso.curso_observacoes;

                        await cursoExistente.save();
                    }
                }
                //#endregion

                //#region Sync Familiares

                let Familiares = decriptData.Processos.map(s => s.Prestador.Familiares.map(b => b)).reduce(function (a, b) { return a.concat(b); }, []);
                for (let index = 0; index < Familiares.length; index++) {

                    const Familiar = Familiares[index];

                    let familiarExistente = await db.sequelize.models.Familiares.findOne({
                        where: {
                            ref_integracao: Familiar.id
                        }
                    });

                    if (familiarExistente == null) {

                        let prestador = await db.sequelize.models.Prestadores.findOne({
                            where: {
                                ref_integracao: Familiar.PrestadoreId
                            }
                        });
                        familiarExistente = await db.sequelize.models.Familiares.create({
                            PrestadoreId: prestador.id,
                            nome: Familiar.familiar_nome,
                            parentesco: Familiar.familiar_parentesco,
                            idade: Familiar.familiar_idade,
                            profissao: Familiar.familiar_profissao,
                            ref_integracao: Familiar.id
                        })

                        await familiarExistente.save();
                    }
                    else {
                        familiarExistente.nome = Familiar.familiar_nome;
                        familiarExistente.parentesco = Familiar.familiar_parentesco;
                        familiarExistente.idade = Familiar.familiar_idade;
                        familiarExistente.profissao = Familiar.familiar_profissao;

                        await familiarExistente.save();
                    }

                }


                //#endregion

                //#region Sync Habilidades

                let Habilidades = decriptData.Processos.map(s => s.Prestador.Habilidades.map(b => b)).reduce(function (a, b) { return a.concat(b); }, []);
                for (let index = 0; index < Habilidades.length; index++) {

                    const Habilidade = Habilidades[index];

                    let habilidadeExistente = await db.sequelize.models.Habilidades.findOne({
                        where: {
                            ref_integracao: Habilidade.id
                        }
                    });

                    if (habilidadeExistente == null) {

                        let prestador = await db.sequelize.models.Prestadores.findOne({
                            where: {
                                ref_integracao: Habilidade.PrestadoreId
                            }
                        });

                        await db.sequelize.models.Habilidades.create({
                            PrestadoreId: prestador.id,
                            descricao: Habilidade.habilidade,
                            ref_integracao: Habilidade.id
                        })
                    }
                    else {
                        habilidadeExistente.descricao = Habilidade.habilidade;
                        await habilidadeExistente.save();
                    }

                }

                //#endregion

                //#region Sync Processos

                for (let index = 0; index < decriptData.Processos.length; index++) {

                    const Processo = decriptData.Processos[index];

                    let ProcessoExistente = await db.sequelize.models.Processos.findOne({
                        where: {
                            ref_integracao: Processo.id
                        },
                    });

                    if (ProcessoExistente == null) {

                        const Prestador = Processo.Prestador;


                        let prestador = await db.sequelize.models.Prestadores.findOne({
                            where: {
                                ref_integracao: Prestador.id
                            }
                        });


                        ProcessoExistente = await db.sequelize.models.Processos.create({
                            InstituicoId: Processo.id_central,
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
                            PrestadoreId: prestador.id,
                            ref_integracao: Processo.id
                        });

                    }
                    else {
                        ProcessoExistente.nro_processo = Processo.nro_processo;
                        ProcessoExistente.nro_artigo_penal = Processo.nro_artigo_penal;
                        ProcessoExistente.pena_originaria = Processo.pena_originaria;
                        ProcessoExistente.pena_originaria_regime = Processo.pena_originaria_regime;
                        ProcessoExistente.inciso = Processo.inciso;
                        ProcessoExistente.detalhamento = Processo.detalhamento;
                        ProcessoExistente.prd = Processo.prd;
                        ProcessoExistente.prd_descricao = Processo.prd_descricao;
                        ProcessoExistente.horas_cumprir = Processo.horas_cumprir;
                        ProcessoExistente.possui_multa = Processo.possui_multa;
                        ProcessoExistente.valor_a_pagar = Processo.valor_a_pagar;
                        ProcessoExistente.qtd_penas_anteriores = Processo.qtd_penas_anteriores;
                        await ProcessoExistente.save();
                    }



                }



                //#endregion

                //#region Sync Default User
                const DefaultUser = decriptData.DefaultUser;
                const adminUser = await db.sequelize.models.Usuario.findOne({
                    where: {
                        usuario: DefaultUser.usuario
                    }
                });

                if (adminUser == null) {

                    await db.sequelize.models.Usuario.create({
                        nome: DefaultUser.nome,
                        usuario: DefaultUser.usuario,
                        senha: DefaultUser.senha,
                        InstituicoId: Entidade.id
                    });

                }

                //#endregion

                //#region Sync Tarefas (falta delete)
                for (let index = 0; index < decriptData.Entidade.tarefa.length; index++) {
                    const tarefa = decriptData.Entidade.tarefa[index];

                    let tarefaExistente = await db.sequelize.models.Tarefa.findOne({
                        where: {
                            ref_integracao: tarefa.id
                        }
                    });

                    if (tarefaExistente == null) {
                        //Criar tarefa
                        await db.sequelize.models.Tarefa.create({
                            titulo: tarefa.titulo,
                            descricao: tarefa.descricao,
                            status: tarefa.status,
                            ref_integracao: tarefa.id,
                            InstituicoId: Entidade.id
                        });
                    }
                    else {
                        //Atualizar tarefa
                        tarefaExistente.titulo = tarefa.titulo;
                        tarefaExistente.descricao = tarefa.descricao;
                        tarefaExistente.status = tarefa.status;
                        await tarefaExistente.save();
                    }

                }
                //#endregion

                for (let index = 0; index < decriptData.TarefasProcessos.length; index++) {
                    const TarefasProcessos = decriptData.TarefasProcessos[index];

                    let tpExistente = await db.sequelize.models.TarefaProcessos.findOne({
                        where: {
                            TarefaId: TarefasProcessos.TarefaId,
                            ProcessoId: TarefasProcessos.ProcessoId
                        }
                    });

                    if (tpExistente == null) {
                        await db.sequelize.models.TarefaProcessos.create({
                            TarefaId: TarefasProcessos.TarefaId,
                            ProcessoId: TarefasProcessos.ProcessoId
                        });
                    }

                }

                //#region Sync Agendamentos

                for (let index = 0; index < decriptData.Agendamentos.length; index++) {

                    const Agendamentos = decriptData.Agendamentos[index];

                    let agendamentoExistente = await db.sequelize.models.Agendamentos.findOne({
                        where: {
                            ref_integracao: Agendamentos.id
                        }
                    });

                    if (agendamentoExistente == null) {


                        let prestador = await db.sequelize.models.Prestadores.findOne({
                            where: {
                                ref_integracao: Agendamentos.ProcessoId
                            }
                        });

                        let tarefa = await db.sequelize.models.Tarefa.findOne({
                            where: {
                                ref_integracao: Agendamentos.TarefaId
                            }
                        });

                        agendamentoExistente = await db.sequelize.models.Agendamentos.create({
                            horario_inicio: Agendamentos.horario_inicio,
                            horario_fim: Agendamentos.horario_fim,
                            data_inicial: Agendamentos.data_inicial,
                            segunda: Agendamentos.segunda,
                            terca: Agendamentos.terca,
                            quarta: Agendamentos.quarta,
                            quinta: Agendamentos.quinta,
                            sexta: Agendamentos.sexta,
                            sabado: Agendamentos.sabado,
                            domingo: Agendamentos.domingo,
                            ProcessoId: prestador.id,
                            TarefaId: tarefa.id,
                            ref_integracao: Agendamentos.id
                        });
                    }
                    else {
                        agendamentoExistente.horario_inicio = Agendamentos.horario_inicio;
                        agendamentoExistente.horario_fim = Agendamentos.horario_fim;
                        agendamentoExistente.data_inicial = Agendamentos.data_inicial;
                        agendamentoExistente.segunda = Agendamentos.segunda;
                        agendamentoExistente.terca = Agendamentos.terca;
                        agendamentoExistente.quarta = Agendamentos.quarta;
                        agendamentoExistente.quinta = Agendamentos.quinta;
                        agendamentoExistente.sexta = Agendamentos.sexta;
                        agendamentoExistente.sabado = Agendamentos.sabado;
                        agendamentoExistente.domingo = Agendamentos.domingo;
                        await agendamentoExistente.save();
                    }





                }

                //#endregion

            }

            return { status: true, text: "Arquivo importado." };
        } catch (error) {
            return { status: false, text: "Erro interno no servidor." };
        }


    },


}