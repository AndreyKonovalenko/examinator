const asyncHandler = require("express-async-handler");
const User = require("../../../models/userModel");
const Log = require("../../../models/logModel");

// @desc get all users
// @route GET /api/users
// @access Private Admin

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

// @desc delete user by id
// @route Delete /api/admin/users/:id
// @access Private Adimin

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    res.status(400);
    throw new Error(`There is no user with such id: ${rep.params.id}`);
  }
  if (user) {
    const logs = await Log.find({ user: user._id });
    if (logs) {
      if (logs.length > 0) {
        res.status(400);
        throw new Error(
          "User has logs, consider cleaning user's log before deleting it"
        );
      }
      if (logs.length === 0) {
        await user.remove();
        res.status(200).json({ id: req.params.id });
      }
    }
  }
});

module.exports = {
  getUsers,
  deleteUser,
};
