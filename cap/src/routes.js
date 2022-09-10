const path = require('path');

const Prestadores = require('./controllers/Prestadores');

module.exports = {

    async Action(controller, action, params) {
        return await eval(`${controller}.${action}`)(params).then((results)=>{
            return (results);
          });
    
    }

}

