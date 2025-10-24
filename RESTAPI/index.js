const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const { json } = require("stream/consumers");
const { connected } = require("process");

const app = express();
// middleware
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  req.Myname = "manish";
  console.log("hello from middleware 1");
  // return  res.send("end");
  next();
});

app.use((req, res, next) => {
  fs.appendFile(
    "./RESTAPI/log.txt",
    `${Date.now().toLocaleString()} : ${req.method} : ${req.path} \n`,
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
  next();
});

// routes
// app.route("/api/users/:id").get().put().patch();

app.get("/api/users", (req, res) => {
  return res.json({ user: users, name: req.Myname });
});

app.get("/users", (req, res) => {
  const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>

 `;
  return res.send(html);
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  return res.json(user);
});

app.post("/api/users", (req, res) => {
  const body = req.body;
  const newId = users.length + 1;

  users.push({ ...body, id: newId });

  fs.writeFile(
    "./RESTApi/MOCK_DATA.json",
    JSON.stringify(users, null, 2),
    (err) => {
      if (err) {
        return res
          .status(500)
          .json({ status: "error", message: "Failed to save user" });
      }
      return res.status(201).json({ status: "success", id: newId });
    }
  );
});

app.patch("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const updates = req.body;

  // find user index
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) {
    return res.status(404).json({ status: "error", message: "User not found" });
  }

  // update only provided fields
  users[index] = { ...users[index], ...updates };

  // save changes to file
  fs.writeFile(
    "./RESTApi/MOCK_DATA.json",
    JSON.stringify(users, null, 2),
    (err) => {
      if (err) {
        return res
          .status(500)
          .json({ status: "error", message: "Failed to update user" });
      }
      return res.json({ status: "success", user: users[index] });
    }
  );
});

app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ status: "error", message: "User not found" });
  }

  const deletedUser = users[userIndex]; // store before removing
  users.splice(userIndex, 1);

  fs.writeFile("./RESTApi/MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ status: "error", message: "Failed to update file" });
    }
  });

  return res.json({ status: "success", user: deletedUser });
});

app.listen(3000, () => console.log("server started"));
