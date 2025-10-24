const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  const Allusers = await User.find();
  return res.json(Allusers);
}

async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }
    return res.json(user);
  } catch (e) {
    return res.status(404).json({ msg: "invalid user id " });
  }
}

async function handleNewUser(req, res) {
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
}

async function handleDeleteUserById(req, res) {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ msg: "User not found" });
    return res.json({ status: "success", user: deletedUser });
  } catch (err) {
    return res.status(400).json({ msg: "failed", error: err.message });
  }
}

async function handleUpdateUserById(req, res) {
  try {
    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updateUser) return res.status(404).json({ msg: "User not found" });
    return res.json({ status: "success", user: updateUser });
  } catch (err) {
    return res.status(400).json({ msg: "failed", error: err.message });
  }
}

module.exports = {
  handleGetAllUsers,
  getUserById,
  handleUpdateUserById,
  handleNewUser,
  handleDeleteUserById,
};
