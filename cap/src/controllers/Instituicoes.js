const db = require("../models/index.js");

module.exports = {

    async salvar(payload) {
        const result = db.sequelize.models.instituicoes.create({
            payload
        });

        console.log(result);
    },





}