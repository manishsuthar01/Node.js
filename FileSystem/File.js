const fs = require("fs");

// fs.writeFileSync("./fileSystem/sync.txt", "this is sync file");

// fs.writeFile("./FileSystem/async.txt", "this is async file ", (e) => {
//   console.log(e);
// });

// fs.appendFile(
//   "./FileSystem/async.txt",
//   " &&  this is append async text in sync",
//   (e) => {
//     console.log(e);
//   }
// );

// fs.appendFileSync("./FileSystem/sync.txt", " && this is append sync text");

// fs.cp("./FileSystem/async.txt", "Async.txt", (e) => {
//   console.log(e);
// });

// fs.unlinkSync("Async.txt");

fs.readFile("./FileSystem/async.txt", 'utf-8',(e, result) => {
  if (e) console.log(e);
  else console.log(result);
});
