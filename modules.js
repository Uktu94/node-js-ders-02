// console.log(arguments);
// console.log(require('module').wrapper);

// module.exports
const C = require('./test-module-1');
const calc1 = new C();
console.log(calc1.add(2, 5));

// EXPORTS
// const calc2 = require('./test-module-2');
const {
    add,
    multiply,
    divide
} = require('./test-module-2'); // COMMON PATTERN
console.log(multiply(2, 5));

// CACHING
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();

// We called the same fn three times but we have ('Hello from the module') only once...
// ---> BC of caching
// ---> Technically this module was only loaded once, and the code inside of it was also
// ---> executed once only!
// ---> Our three function came from cache