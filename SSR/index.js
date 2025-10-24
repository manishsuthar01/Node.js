const express = require("express");
const app = express();
const path = require("path");

const list = [
  { name: "manish" },
  { name: "deepak" },
  { name: "jon" },
  { name: "jan" },
];

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  return res.render("home", {
    list: list,
    name: "manish",
  });

  //   return res.end(
  //     `
  //         <html>
  //           <head>
  //           </head>
  //           <body>
  //             <ol>
  //                ${list.map((itm) => `<li>${itm.name}</li>`).join("")}
  //             </ol>
  //           </body>
  //         </html>
  //         `
  //   );
});

app.listen(2000, () => console.log("server is started at port 2000"));
