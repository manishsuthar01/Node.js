const User = require("../model/user");
const { URL } = require("../model/url");
const { setUser, getUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  const allurl = await URL.find({});
  const { name, email, password } = req.body;
  const result = await User.create({
    name,
    email,
    password,
  });
  return res.render("login");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render("login", { error: "invalid email or password" });
  }

  const token = setUser(user);
  res.cookie("token", token, {
    httpOnly: true,
  });
  return res.redirect("/");
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
