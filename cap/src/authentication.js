const bcrypt = require('bcryptjs');
const db = require('./models/index');

class Auth {
    static is_authenticated = false;
    static id_logged_user = null;
    

    static async getLoggedUser() {
        return await db.sequelize.models.Usuario.findOne({
            attributes: ['usuario', 'nome'],
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
        if(user){
            const isValid = bcrypt.compareSync(senha, user.senha);
            if(isValid){
                this.is_authenticated = true;
                this.id_logged_user = user.id;
            }
           
        }
        return this.is_authenticated;
    }

}

module.exports = Auth;