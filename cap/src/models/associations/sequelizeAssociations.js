const { sequelize } = require('../index');
const models = sequelize.models;

models.Endereco.belongsTo(models.Cidade);
models.Cidade.belongsTo(models.UF);

models.Endereco.hasOne(models.Prestadores);
models.Endereco.hasOne(models.Trabalho);


models.Prestadores.belongsTo(models.Endereco);
models.Trabalho.belongsTo(models.Endereco);

models.Prestadores.hasMany(models.Familiares);
models.Familiares.belongsTo(models.Prestadores);

models.Prestadores.hasOne(models.Trabalho);
models.Trabalho.belongsTo(models.Prestadores);

models.Prestadores.hasMany(models.Cursos);
models.Cursos.belongsTo(models.Prestadores);

models.Prestadores.hasMany(models.Habilidades);
models.Habilidades.belongsTo(models.Prestadores);

models.Prestadores.hasOne(models.FichaMedica);
models.FichaMedica.belongsTo(models.Prestadores);

//models.Drogas.hasOne(models.UsoDrogas);
models.FichaMedica.hasMany(models.UsoDrogas);
models.Drogas.hasMany(models.UsoDrogas);
models.UsoDrogas.belongsTo(models.FichaMedica);
models.UsoDrogas.belongsTo(models.Drogas);


models.Prestadores.hasMany(models.Beneficios);

models.Processos.hasOne(models.Vara);

models.Prestadores.hasMany(models.Processos);
models.Processos.belongsTo(models.Prestadores);
models.Processos.belongsTo(models.Instituicoes);

models.Endereco.hasOne(models.Instituicoes);
models.Instituicoes.belongsTo(models.Endereco);


models.Instituicoes.hasMany(models.Tarefa);
models.Tarefa.belongsTo(models.Instituicoes);

models.Tarefa.belongsToMany(models.Processos, { through: 'TarefaProcessos' });
models.Processos.belongsToMany(models.Tarefa, { through: 'TarefaProcessos' });

models.Tarefa.hasOne(models.AtestadoFrequencia);
models.Processos.hasOne(models.AtestadoFrequencia);

models.Instituicoes.hasOne(models.AtestadoComparecimento);
models.Processos.hasOne(models.AtestadoComparecimento);

models.Usuario.belongsTo(models.Instituicoes);

models.Agendamentos.belongsTo(models.Processos);
models.Agendamentos.belongsTo(models.Tarefa);



















