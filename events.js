const EventEmitter = require('events');
const http = require('http');

// If we were to use this pattern IRL, then it's a best practice to create a new class.
// Class will actually inherit from the node EventEmitter
class Sales extends EventEmitter {
    constructor() {
        super();
    }
}

// That EventEmitters can emit named events, and we can then subs to these event
// Basically listen to them and then react accordingly.
const myEmitter = new Sales(); // class ile değiştirdim önceki class olarak EventEmitter'dan alıyordu.

// We can setup multiple listeners for events
myEmitter.on('newSale', () => {
    console.log('There was a new sale! :D')
});

myEmitter.on("newSale", () => {
    console.log('Costumer name! Utku :D')
});

myEmitter.on("newSale", stock => {
    console.log(`There are now ${stock} items left in stock.`);
});
// If we run this we should see there are now 9 items left in stock.
// Çünkü eventi 9 ile emmitledik ve listener cb fn'ımızdan arguman olarak değeri emitimizden alabilir.
// In this case the stock variable. :D

myEmitter.emit("newSale", 9);
// This is obersver pattern.
// Where this one here is the obj that emits the events, and these myEmitter listeners are observers
// They observer the emitter and wait until it emits the newSale event.

///////////////////////////

const server = http.createServer();
// .on() methodunu herhangi bir yerde görürsek zaten listenladığımızı biliyor oluruz.
server.on('request', (req, res) => {
    console.log('Request received!');
    res.end('Request received!');
});

server.on('request', (req, res) => {
    console.log('Another request received! :D');
});

server.on('close', () => {
    console.log('Server closed!');
}); // it fires when we close the server :)

server.listen(3000, '127.0.0.1', () => {
    console.log('Waiting for request');
});
// It won't shut down BC the event loop waiting for incoming I/O (input, output),
