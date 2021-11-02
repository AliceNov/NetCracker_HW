let outputTime = console.log.bind(console);
console.log = function (...arguments) {
        let timeStamp = Date.now();
        outputTime(new Date(timeStamp), ...arguments);
  }

console.log("error");

