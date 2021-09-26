const { io } = require('../index');
const ListPokemon = require('../models/listPokemon');
const Pokemon = require('../models/pokemon');

const listPokemon = new ListPokemon();

listPokemon.addPokemon(new Pokemon('Arceus'));
listPokemon.addPokemon(new Pokemon('Pikachu'));
listPokemon.addPokemon(new Pokemon('Dialga'));
listPokemon.addPokemon(new Pokemon('Ho-oh'));
listPokemon.addPokemon(new Pokemon('Lugia'));

console.log(listPokemon);


//Mensajes de Sockets
io.on('connection', client => {//client==dispositivo que se connecta al server
	console.log('Cliente connectado');

	//emitir las bandas al cliente que se connecte
	client.emit('pokemon-registrados', listPokemon.getListPokemon());

	client.on('disconnect', () => {
		console.log('Cliente desconectado');
	});

	//comunicacion del socket
	client.on('mensaje', (payload) => {
		console.log('Mensaje', payload);
		//io es el servidor, por lo que esto lo envio a todo los clientes connectados
		io.emit('mensaje', { admin: "Nuevo mensaje" });
	});

	client.on('vote-pokemon', (payload) => {
		listPokemon.votePokemon(payload.id);
		io.emit('pokemon-registrados', listPokemon.getListPokemon());
	});

	client.on('add-pokemon', (payload) => {
		listPokemon.addPokemon(new Pokemon(payload.name));
		io.emit('pokemon-registrados', listPokemon.getListPokemon());
	});

	client.on('delete-pokemon', (payload) => {
		listPokemon.deletePokemon(payload.id);
		io.emit('pokemon-registrados', listPokemon.getListPokemon());
	});

	client.on('nuevo-mensaje', (payload) => {
		console.log('nuevo-mensaje', payload);
		//io.emit('nuevo-mensaje', payload);//a todos los clientes conectados
		client.broadcast.emit('nuevo-mensaje', payload);//los emite a todos los clientes salvo a que lo emitio
	});
});