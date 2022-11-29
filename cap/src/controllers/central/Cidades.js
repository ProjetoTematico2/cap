
const db = require('../../models/index');


module.exports = {

    async GetCidades(args) {

        let data = await db.sequelize.models.Cidade.findAll({
            include: db.sequelize.models.UF
        });

        let formatedData = data.map(s => { return { value: s.id, label: `${s.nome} - ${s.UF.sigla}` } })
        return formatedData;

    }



}