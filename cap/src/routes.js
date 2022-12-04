const path = require('path');
const cAPP = require('./app');

const Login = require('./controllers/Login');
const Usuarios = require('./controllers/Usuarios');

console.log("bbb", cAPP.config.mode);
if(cAPP.config.mode == 0){
    
    const Prestadores = require('./controllers/central/Prestadores');
    const Cidades = require('./controllers/central/Cidades');
    const Centrais = require('./controllers/central/Centrais');
    const Processos = require('./controllers/central/Processos');
    const Entidades = require('./controllers/central/Entidades');
    const Agendamentos = require('./controllers/central/Agendamentos');

    module.exports = {

        async Action(controller, action, params) {
            return await eval(`${controller}.${action}`)(params).then((results)=>{
                return (results);
              });
        
        }
    
    }
    
}
else if(cAPP.config.mode == 1){

    module.exports = {

        async Action(controller, action, params) {
            return await eval(`${controller}.${action}`)(params).then((results)=>{
                return (results);
              });
        
        }
    
    }
    

}







