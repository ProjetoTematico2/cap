const path = require('path');
const cAPP = require('./app');

const Login = require('./controllers/Login');
const Usuarios = require('./controllers/Usuarios');
const Sincronizacao = require('./controllers/Sincronizacao');
const Prestadores = require('./controllers/Prestadores');
const Processos = require('./controllers/Processos');
const Entidades = require('./controllers/Entidades');
const Cidades = require('./controllers/Cidades');
const Agendamentos = require('./controllers/Agendamentos');
const AtestadoFrequencia = require('./controllers/AtestadoFrequencia');
if(cAPP.config.mode == 0){
    


    const Centrais = require('./controllers/central/Centrais');

 



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







