
const db = require('../../models/index');
const { Op } = require("sequelize");


module.exports = {


    async GetPrestadores(search) {
        let where = {};
        if (search) {
            if (search.id)
                where.id = search.id;

            if (search.nome) {
                where.nome = {
                    [Op.substring]: search.nome
                }
            }
            if (search.cpf) {
                where.cpf = {
                    [Op.substring]: search.cpf
                }
            }
        }

        const Prestadores = await db.sequelize.models.Prestadores.findAll({
            include: db.sequelize.models.Processos,
            where: where
        });

        const listaPrestadores = Prestadores.map(s => {
            return {
                id: s.id,
                nome: s.nome,
                cpf: s.cpf,
                ultimo_processo: s.Processos.length > 0 ? s.Processos[s.Processos.length - 1].nro_processo : "N/A",
                horas_cumprir: s.Processos.length > 0 ? s.Processos[s.Processos.length - 1].horas_cumprir : "N/A",
                horas_cumpridas: "N/A"
            }
        });

        return listaPrestadores;

    },

    async GetPrestador(search) {

        const Prestadores = await db.sequelize.models.Prestadores.findAll({
            where: { id: search.id },
            include: [
                { model: db.sequelize.models.Beneficios },
                { model: db.sequelize.models.Familiares },
                { model: db.sequelize.models.Habilidades },
                { model: db.sequelize.models.Cursos },
                { model: db.sequelize.models.Endereco },
                { model: db.sequelize.models.Trabalho },
                { model: db.sequelize.models.FichaMedica, include: { model: db.sequelize.models.UsoDrogas, include: { model: db.sequelize.models.Drogas } } },
            ]
        });

        return Prestadores.map(s => {
            return {
                id: s.id,
                nome: s.nome,
                cpf: s.cpf,
                image: s.image,
                nome_mae: s.nome_mae,
                estado_civil: s.estado_civil,
                etnia: s.etnia,
                escolaridade: s.escolaridade,
                renda_familiar: s.renda_familiar,
                telefone1: s.telefone1,
                telefone2: s.telefone2,
                dt_nascimento: s.dt_nascimento,
                religiao: s.religiao,
                possui_beneficios: s.Beneficios.length > 0,
                beneficios: s.Beneficios.map(b => {
                    return {
                        id: b.id,
                        nome: b.nome
                    }
                }),
                familiares: s.Familiares.map(b => {
                    return {
                        id: b.id,
                        familiar_nome: b.nome,
                        familiar_parentesco: b.idade,
                        familiar_idade: b.parentesco,
                        familiar_profissao: b.profissao
                    }
                }),
                habilidades: s.Habilidades.map(b => {
                    return {
                        id: b.id,
                        habilidade: b.descricao
                    }
                }),
                cursos: s.Cursos.map(b => {
                    return {
                        id: b.id,
                        curso_descricao: b.curso,
                        curso_instituicao: b.intituicao,
                        curso_observacao: b.observacoes,
                    }
                }),

                endereco: {
                    id: s.Endereco.id,
                    rua: s.Endereco.rua,
                    numero: s.Endereco.numero,
                    cep: s.Endereco.cep,
                    bairro: s.Endereco.bairro,
                    complemento: s.Endereco.complemento,
                    CidadeId: s.Endereco.CidadeId,
                },

                saude: {
                    id: s.FichaMedica.id,
                    saude_deficiencia: s.FichaMedica.deficiencia,
                    saude_observacao: s.FichaMedica.observacao,
                    saude_drogas: s.FichaMedica.UsoDrogas.map(b => {
                        return {
                            id: b.Droga.id,
                            droga_nome: b.Droga.nome,
                            droga_frequencia: b.frequencia
                        }
                    })
                },

                trabalho: {
                    id: s.Trabalho.id,
                    trabalho_descricao: s.Trabalho.descricao,
                    trabalho_horario_inicio: s.Trabalho.horario_inicio,
                    trabalho_horario_fim: s.Trabalho.horario_fim,
                    trabalho_dias_semana: [
                        s.Trabalho.segunda ? { value: 0, label: "Segunda-feira" } : null,
                        s.Trabalho.terca ? { value: 1, label: "Terça-feira" } : null,
                        s.Trabalho.quarta ? { value: 2, label: "Quarta-feira" } : null,
                        s.Trabalho.quinta ? { value: 3, label: "Quinta-feira" } : null,
                        s.Trabalho.sexta ? { value: 4, label: "Sexta-feira" } : null,
                        s.Trabalho.sabado ? { value: 5, label: "Sábado" } : null,
                        s.Trabalho.domingo ? { value: 6, label: "Domingo" } : null,
                    ].filter(s => s !== null)
                }



            }
        });


    },

    async Create(payload) {

        try {

            let checkPrestador = await db.sequelize.models.Prestadores.findAll({
                where: {
                    cpf: parseInt(payload.prestador.cpf)
                }
            })

            if (checkPrestador.length > 0)
                return { status: false, text: `CPF já cadastrado no sistema` };



            let Endereco = await db.sequelize.models.Endereco.create({
                nome: payload.endereco.nome,
                rua: payload.endereco.rua,
                cep: payload.endereco.cep,
                numero: payload.endereco.numero,
                bairro: payload.endereco.bairro,
                complemento: payload.endereco.complemento,
                CidadeId: payload.endereco.id_cidade
            });

            const buffer = Buffer.from(payload.image.replace(/^data:image\/[a-z]+;base64,/, ""), 'base64');// atob(b64Data);

            let Prestador = await db.sequelize.models.Prestadores.create({
                EnderecoId: Endereco.id,
                nome: payload.prestador.nome,
                cpf: parseInt(payload.prestador.cpf),
                nome_mae: payload.prestador.nome_mae,
                dt_nascimento: payload.prestador.dt_nascimento,
                estado_civil: parseInt(payload.prestador.estado_civil),
                etnia: parseInt(payload.prestador.etnia),
                escolaridade: parseInt(payload.prestador.escolaridade),
                renda_familiar: parseFloat(payload.prestador.renda_familiar ?? 0),
                telefone1: parseInt(payload.prestador.telefone1),
                telefone2: parseInt(payload.prestador.telefone2),
                religiao: payload.prestador.religiao,
                image: buffer //payload.image.replace(/^data:image\/[a-z]+;base64,/, "")

            });

            if (payload.trabalho) {
                await db.sequelize.models.Trabalho.create({
                    PrestadoreId: Prestador.id,
                    descricao: payload.trabalho.trabalho_descricao,
                    horario_inicio: payload.trabalho.trabalho_horario_inicio,
                    horario_fim: payload.trabalho.trabalho_horario_fim,
                    segunda: payload.trabalho.trabalho_dias_semana.filter(s => s.value === 0).length > 0,
                    terca: payload.trabalho.trabalho_dias_semana.filter(s => s.value === 1).length > 0,
                    quarta: payload.trabalho.trabalho_dias_semana.filter(s => s.value === 2).length > 0,
                    quinta: payload.trabalho.trabalho_dias_semana.filter(s => s.value === 3).length > 0,
                    sexta: payload.trabalho.trabalho_dias_semana.filter(s => s.value === 4).length > 0,
                    sabado: payload.trabalho.trabalho_dias_semana.filter(s => s.value === 5).length > 0,
                    domingo: payload.trabalho.trabalho_dias_semana.filter(s => s.value === 6).length > 0
                });
            }

            if (payload.prestador.possui_beneficios && payload.prestador.beneficios.length > 0) {

                for (let i = 0; i < payload.prestador.beneficios.length; i++) {
                    const beneficio = payload.prestador.beneficios[i];
                    await db.sequelize.models.Beneficios.create({
                        PrestadoreId: Prestador.id,
                        nome: beneficio
                    })

                }
            }

            if (payload.prestador.familiares.length > 0) {
                for (let i = 0; i < payload.prestador.familiares.length; i++) {

                    const familiar = payload.prestador.familiares[i];

                    await db.sequelize.models.Familiares.create({
                        PrestadoreId: Prestador.id,
                        nome: familiar.familiar_nome,
                        parentesco: familiar.familiar_parentesco,
                        idade: parseInt(familiar.familiar_idade),
                        profissao: familiar.familiar_profissao,
                    })

                }
            }

            if (payload.prestador.habilidades.length > 0) {
                for (let i = 0; i < payload.prestador.habilidades.length; i++) {

                    const habilidade = payload.prestador.habilidades[i];

                    await db.sequelize.models.Habilidades.create({
                        PrestadoreId: Prestador.id,
                        descricao: habilidade,
                    })

                }
            }

            if (payload.prestador.cursos.length > 0) {
                for (let i = 0; i < payload.prestador.cursos.length; i++) {

                    const curso = payload.prestador.cursos[i];

                    await db.sequelize.models.Cursos.create({
                        PrestadoreId: Prestador.id,
                        intituicao: curso.curso_observacao,
                        curso: curso.curso_descricao,
                        observacoes: curso.curso_observacao,
                    })

                }
            }

            if (payload.saude) {

                let FichaMedica = await db.sequelize.models.FichaMedica.create({
                    PrestadoreId: Prestador.id,
                    deficiencia: parseInt(payload.saude.saude_deficiencia),
                    observacao: payload.saude.saude_observacao,
                });

                if (payload.saude.saude_drogas.length > 0) {

                    for (let i = 0; i < payload.saude.saude_drogas.length; i++) {

                        let droga = payload.saude.saude_drogas[i];
                        let Droga = await db.sequelize.models.Drogas.create({
                            nome: droga.droga_nome
                        });

                        await db.sequelize.models.UsoDrogas.create({
                            frequencia: parseInt(droga.droga_frequencia),
                            DrogaId: Droga.id,
                            FichaMedicaId: FichaMedica.id
                        });
                    }
                }
            }

            return { status: true, text: `Prestador ${Prestador.nome} inserido com sucesso!`, id: Prestador.id };

        } catch (error) {
            return { status: false, text: `Erro interno no servidor,` };
        }
    },


    async Edit(payload) {

        try {

            let checkPrestador = await db.sequelize.models.Prestadores.findAll({
                where: {
                    cpf: parseInt(payload.prestador.cpf),
                    id: {
                        [Op.ne]: payload.prestador.id
                    }
                }
            })

            if (checkPrestador.length > 0)
                return { status: false, text: `CPF já cadastrado no sistema` };

            let Endereco = await db.sequelize.models.Endereco.findByPk(payload.endereco.id);

            Endereco.nome = payload.endereco.nome;
            Endereco.rua = payload.endereco.rua;
            Endereco.cep = payload.endereco.cep;
            Endereco.numero = payload.endereco.numero;
            Endereco.bairro = payload.endereco.bairro;
            Endereco.complemento = payload.endereco.complemento;
            Endereco.CidadeId = payload.endereco.id_cidade;
            await Endereco.save();

            const buffer = Buffer.from(payload.image.replace(/^data:image\/[a-z]+;base64,/, ""), 'base64');// atob(b64Data);

            let Prestador = await db.sequelize.models.Prestadores.findByPk(payload.prestador.id);
            Prestador.nome = payload.prestador.nome;
            Prestador.cpf = parseInt(payload.prestador.cpf);
            Prestador.nome_mae = payload.prestador.nome_mae;
            Prestador.dt_nascimento = payload.prestador.dt_nascimento;
            Prestador.estado_civil = parseInt(payload.prestador.estado_civil);
            Prestador.etnia = parseInt(payload.prestador.etnia);
            Prestador.escolaridade = parseInt(payload.prestador.escolaridade);
            Prestador.renda_familiar = parseFloat(payload.prestador.renda_familiar ?? 0);
            Prestador.telefone1 = parseInt(payload.prestador.telefone1);
            Prestador.telefone2 = parseInt(payload.prestador.telefone2);
            Prestador.religiao = payload.prestador.religiao;
            Prestador.image = buffer;

            await Prestador.save();

            if (payload.trabalho) {

                let Trabalho = await db.sequelize.models.Trabalho.findByPk(payload.trabalho.id);
                Trabalho.descricao = payload.trabalho.trabalho_descricao;
                Trabalho.horario_inicio = payload.trabalho.trabalho_horario_inicio;
                Trabalho.horario_fim = payload.trabalho.trabalho_horario_fim;
                Trabalho.segunda = payload.trabalho.trabalho_dias_semana.filter(s => s.value === 0).length > 0;
                Trabalho.terca = payload.trabalho.trabalho_dias_semana.filter(s => s.value === 1).length > 0;
                Trabalho.quarta = payload.trabalho.trabalho_dias_semana.filter(s => s.value === 2).length > 0;
                Trabalho.quinta = payload.trabalho.trabalho_dias_semana.filter(s => s.value === 3).length > 0;
                Trabalho.sexta = payload.trabalho.trabalho_dias_semana.filter(s => s.value === 4).length > 0;
                Trabalho.sabado = payload.trabalho.trabalho_dias_semana.filter(s => s.value === 5).length > 0;
                Trabalho.domingo = payload.trabalho.trabalho_dias_semana.filter(s => s.value === 6).length > 0;
                await Trabalho.save();
            } else {
                await db.sequelize.models.Trabalho.destroy({ where: { PrestadoreId: Prestador.id } })
            }

            if (payload.prestador.possui_beneficios && payload.prestador.beneficios.length > 0) {
                await db.sequelize.models.Beneficios.destroy({ where: { PrestadoreId: Prestador.id } })
                for (let i = 0; i < payload.prestador.beneficios.length; i++) {
                    const beneficio = payload.prestador.beneficios[i];
                    await db.sequelize.models.Beneficios.create({
                        PrestadoreId: Prestador.id,
                        nome: beneficio.nome
                    })

                }
            } else {
                await db.sequelize.models.Beneficios.destroy({ where: { PrestadoreId: Prestador.id } })
            }

            if (payload.prestador.familiares.length > 0) {
                await db.sequelize.models.Familiares.destroy({ where: { PrestadoreId: Prestador.id } })
                for (let i = 0; i < payload.prestador.familiares.length; i++) {

                    const familiar = payload.prestador.familiares[i];

                    await db.sequelize.models.Familiares.create({
                        PrestadoreId: Prestador.id,
                        nome: familiar.familiar_nome,
                        parentesco: familiar.familiar_parentesco,
                        idade: parseInt(familiar.familiar_idade),
                        profissao: familiar.familiar_profissao,
                    })

                }
            } else {
                await db.sequelize.models.Familiares.destroy({ where: { PrestadoreId: Prestador.id } })
            }

            if (payload.prestador.habilidades.length > 0) {
                await db.sequelize.models.Habilidades.destroy({ where: { PrestadoreId: Prestador.id } })
                for (let i = 0; i < payload.prestador.habilidades.length; i++) {

                    const habilidade = payload.prestador.habilidades[i];

                    await db.sequelize.models.Habilidades.create({
                        PrestadoreId: Prestador.id,
                        descricao: habilidade.habilidade,
                    })

                }
            } else {
                await db.sequelize.models.Habilidades.destroy({ where: { PrestadoreId: Prestador.id } })
            }


            if (payload.prestador.cursos.length > 0) {
                await db.sequelize.models.Cursos.destroy({ where: { PrestadoreId: Prestador.id } })
                for (let i = 0; i < payload.prestador.cursos.length; i++) {

                    const curso = payload.prestador.cursos[i];

                    await db.sequelize.models.Cursos.create({
                        PrestadoreId: Prestador.id,
                        intituicao: curso.curso_observacao,
                        curso: curso.curso_descricao,
                        observacoes: curso.curso_observacao,
                    })

                }
            } else {
                await db.sequelize.models.Cursos.destroy({ where: { PrestadoreId: Prestador.id } })
            }


            if (payload.saude) {
                await db.sequelize.models.FichaMedica.destroy({ where: { PrestadoreId: Prestador.id } })
                let FichaMedica = await db.sequelize.models.FichaMedica.create({
                    PrestadoreId: Prestador.id,
                    deficiencia: parseInt(payload.saude.saude_deficiencia),
                    observacao: payload.saude.saude_observacao,
                });

                if (payload.saude.saude_drogas.length > 0) {

                    for (let i = 0; i < payload.saude.saude_drogas.length; i++) {

                        let droga = payload.saude.saude_drogas[i];
                        let Droga = await db.sequelize.models.Drogas.create({
                            nome: droga.droga_nome
                        });

                        await db.sequelize.models.UsoDrogas.create({
                            frequencia: parseInt(droga.droga_frequencia),
                            DrogaId: Droga.id,
                            FichaMedicaId: FichaMedica.id
                        });
                    }
                }
            } else {
                await db.sequelize.models.FichaMedica.destroy({ where: { PrestadoreId: Prestador.id } })
            }

            return { status: true, text: `Prestador ${payload.prestador.nome} salvo com sucesso!`, id: Prestador.id };

        } catch (error) {
            return { status: false, text: `Erro interno no servidor,` };
        }
    },

    async Delete(id) {
        let Prestador = {};
        try {
            Prestador = await db.sequelize.models.Prestadores.findByPk(id);
            await db.sequelize.models.Processos.destroy({ where: { PrestadoreId: Prestador.id } })
            await Prestador.destroy();
        } catch (error) {
            return { status: false, text: "Erro interno no servidor." };
        }

        return { status: true, text: `Prestador ${Prestador.nome} removido!` };
    },



}