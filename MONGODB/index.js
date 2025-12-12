const express = require("express");
const mongoose = require("mongoose");

const app = express();
// connection
mongoose
  .connect("mongodb:")
  .then(() => console.log("mongodb is connected"))
  .catch((err) => console.log("Mongo Error", err));
// schema
const userSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

// middleware
app.use(express.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//   req.Myname = "manish";
//   console.log("hello from middleware 1");
//   // return  res.send("end");
//   next();
// });

// routes
// app.route("/api/users/:id").get().put().patch();

app.get("/api/users", async (req, res) => {
  const Allusers = await User.find();
  return res.json(Allusers);
});

app.get("/users", async (req, res) => {
  const Allusers = await User.find();

  const html = `
    <ul>
      ${Allusers.map(
        (user) =>
          `<li>${user.FirstName} ${user.LastName}   --Email:${user.email}</li>`
      ).join("")}
    </ul>
  `;

  return res.send(html); // ✅ send HTML properly
});

app.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }
    return res.json(user);
  } catch (e) {
    return res.status(404).json({ msg: "invalid user id " });
  }
});

app.post("/api/users", async (req, res) => {
  const body = req.body;

  if (!body.first_name || !body.email) {
    return res.status(400).json({ msg: "Missing required fields" });
  }

  try {
    const result = await User.create({
      FirstName: body.first_name, // mapped
      LastName: body.last_name, // mapped
      email: body.email,
      gender: body.gender,
      jobTitle: body.job_title, // mapped
    });
    console.log(result);
    return res.status(201).json({ msg: "success", user: result });
  } catch (err) {
    return res.status(400).json({ msg: "failed", error: err.message });
  }
});

app.patch("/api/users/:id", async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updateUser) return res.status(404).json({ msg: "User not found" });
    return res.json({ status: "success", user: updateUser });
  } catch (err) {
    return res.status(400).json({ msg: "failed", error: err.message });
  }
});

app.delete("/api/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ msg: "User not found" });
    return res.json({ status: "success", user: deletedUser });
  } catch (err) {
    return res.status(400).json({ msg: "failed", error: err.message });
  }
});

app.listen(4000, () => console.log("server started"));
 const name="manish"
