console.log("i am local module");

const add = (a, b) => {
  return a + b;
};
// module.exports = add;

const a = "manish";
const b = "kumar";
const c = "khati";

module.exports={a,b,c};

module.exports.d='kahhh'