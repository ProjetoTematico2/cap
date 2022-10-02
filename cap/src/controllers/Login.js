const authentication = require('../authentication');



module.exports = {

    async isAuthenticated() {

        return authentication.is_authenticated;

    },

    async getLoggedUser() {

        return authentication.getLoggedUser();

    },

    async Authenticate(args) {

        return authentication.authenticate(args.usuario, args.senha)

    },






}