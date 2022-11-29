const bcrypt = require('bcryptjs');
const db = require('./models/index');
const cAPP = require('../src/app');

class Auth {
    static is_authenticated = false;
    static id_logged_user = null;


    static async getLoggedUser() {
        return await db.sequelize.models.Usuario.findOne({
            attributes: ['id', 'nome'],
            where: {
                id: this.id_logged_user
            }
        });
    }

    static async authenticate(usuario, senha) {
        this.is_authenticated = false;
        this.id_logged_user = null;
        var user = await db.sequelize.models.Usuario.findOne({
            where: {
                usuario: usuario
            }
        });
        if (user) {
            const isValid = bcrypt.compareSync(senha, user.senha);
            if (isValid) {
                this.is_authenticated = true;
                this.id_logged_user = user.id;
            }

        }
        if (!this.is_authenticated)
            return { status: false };

        return { status: true, user: {id: user.id, name: user.nome, appMode: cAPP.config.mode } }
    }

}

module.exports = Auth;