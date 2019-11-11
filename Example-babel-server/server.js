import express from 'express';

const app = express();

app.get('/', (req, res) => {
	res.send(200, Chris.friendsList());
});

class Person {
	constructor(name, friends){
		this.name = name;
		this.friends = friends;
	}

	friendsList(){
		var str = `Mis amigos son: ${this.friends.join(', ')}`;
		console.log(str);
		return str;
	}
}

var Chris = new Person('Chris', ['Jorge','Jose','Wen']);

app.listen(3000);


