const express = require("express");
const router = express.Router();
const {
  handleGetAllUsers,
  getUserById,
  handleUpdateUserById,
  handleNewUser,
  handleDeleteUserById,
} = require("../controllers/user");

router.route("/").get(handleGetAllUsers).post(handleNewUser);

router
  .route("/:id")
  .get(getUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;
