h = () => {
  console.log("i am index file ");
};
h();

// const add = require("./Module/LocalModule");
// const sum = add(4, 6);
// console.log(sum);

const obj = require("./Module/LocalModule");
console.log(obj);

const msg = require("./Module/ExportOnly");

console.log(msg.sayHello());
