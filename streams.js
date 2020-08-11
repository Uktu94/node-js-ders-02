const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
    // Solution 1

    /*
    fs.readFile('test-file.txt', (err, data) => {
        if (err) console.log(err);
        res.end(data);
    });
    // is working but the problem is that with this solution
    // node will have to load entire file into memory...
    // it works in small files :D
    // in a production-ready app, we cannot use like this piece of code
    */

    // Solution 2: Streams

    // Create a readable stream then as we receive each chunk of data,
    // which is a writable stream

    /*
    const readable = fs.createReadStream('test-file.txt');
    readable.on('data', chunk => {
        res.write(chunk);
        // We response a writable stream
        // We can use the .write() method to send every single piece of data into that stream.
    });
    readable.on('end', () => {
        res.end(); // no more data to writable stream
    });
    readable.on('error', err => {
        console.log(err);
        res.statusCode = 500;
        res.end('File not found!');
    });
    */

    // Solution 3

    // .pipe() operator'ını kullanacağız.
    // ---> availabe on all readable streams and it allows us to pipe the output of a readable stream
    // ---> right into the input of a writable stream
    // ---> That will fix the problem of backpressure

    const readable = fs.createReadStream('test-file.txt');
    readable.pipe(res);

    // readableSource.pipe(writeableDest) ---> This is where out data
    // ---> comes from and it has to be a readable stream
    // ---> and that data we can then pipe into a writable destination.
    // ---> IN THIS CASE OUR DEST IS RESPONSE(res)
});

server.listen(3000, '127.0.0.1', () => {
    console.log('Listening...');
});