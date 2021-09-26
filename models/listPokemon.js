const Pokemon = require("./pokemon");



class ListPokemon {

    constructor() {
        this.listPokemon = [];
    }

    addPokemon(pokemon = new Pokemon()) {
        this.listPokemon.push(pokemon);
    }

    getListPokemon() {
        return this.listPokemon;
    }

    deletePokemon(id = '') {
        this.listPokemon = this.listPokemon.filter(pokemon => pokemon.id !== id)
        return this.listPokemon;
    }

    votePokemon(id = '') {

        this.listPokemon = this.listPokemon.map(pokemon => {

            if (pokemon.id === id) {
                pokemon.votes++;
                return pokemon;
            } else {
                return pokemon;
            }
        })
    }

}

module.exports = ListPokemon;