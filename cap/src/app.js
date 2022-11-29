const fs = require('fs');

class app {

    static config = {};

    static async readFILE() {
        let rawdata = await fs.readFileSync('cap_config.json');
        return rawdata;
    }


    static setConfig() {
      
        this.config = JSON.parse(fs.readFileSync('cap_config.json'));
    }

}

module.exports = app;