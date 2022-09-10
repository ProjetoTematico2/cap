const path = require('path');
// const controllersPath = path.join(__dirname, '/controllers/');
// // const Controllers = requireDir('../src/controllers');
// require('fs').readdirSync(controllersPath).forEach(function(file) {
//     console.log(controllersPath + file);
//     require(controllersPath + file);
//   });
const Prestadores = require('./controllers/Prestadores');

module.exports = {

    async Action(controller, action, params) {
        //console.log(controller + '.'+ action);
        return await eval(`${controller}.${action}`)(params).then((results)=>{
            return (results);
          });
    
    }

}

