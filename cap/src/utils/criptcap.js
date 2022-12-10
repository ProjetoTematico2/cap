const crypto = require("crypto");




class CriptCap {
    static key = "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3";
    static iv = "v9ol45WG5B7d90P6";
    static algorithm  = 'aes-256-cbc';

    static encriptData(data) {
        
        let cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
        let encrypted = cipher.update(JSON.stringify(data));
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return encrypted;
    }

    static dencriptData(data) {
        let decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
        let decrypted = decipher.update(data);
        decrypted = Buffer.concat([decrypted, decipher.final()]);

        return JSON.parse(decrypted);
    }

}

module.exports = CriptCap;