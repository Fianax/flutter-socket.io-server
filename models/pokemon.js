const { v4: uuidV4 } = require('uuid');

class Pokemon {

    constructor(name = 'no-name') {

        this.id = uuidV4();//identificador unico
        this.name = name;
        this.votes = 0;

    }
}

module.exports = Pokemon;