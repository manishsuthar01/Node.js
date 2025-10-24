exports.sayHello = function () {
  // individual object ke liye hi use kr skte hai isko.
  return "say hello";
};
exports.sayThanks = function () {
  return "say thanks";
};
 

// this give error because exporting two objects by exports keyword only
// exports = {
//   sayHello: function () {
//     return "say hello";
//   },
//   sayThanks: function () { 
//     return "say thanks";
//   },
// };
 