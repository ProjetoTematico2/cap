const fs = require('fs');
const path = require('path');
class app {

    static config = {};

    static setConfig() {
      
        this.config = JSON.parse(fs.readFileSync( path.join(__dirname, '../cap_config.json') ));
    }

}

module.exports = app;