const path = require('path');

const Prestadores = require('./controllers/Prestadores');
const Login = require('./controllers/Login');
const Cidades = require('./controllers/Cidades');
const Centrais = require('./controllers/Centrais');
const Usuarios = require('./controllers/Usuarios');
const Instituicoes = require('./controllers/Instituicoes');
module.exports = {

    async Action(controller, action, params) {
        return await eval(`${controller}.${action}`)(params).then((results)=>{
            return (results);
          });
    
    }

}

