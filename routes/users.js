// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserByEmail,
  register,
  updateUser,
  deleteUser,
  login,
} = require("../controllers/usersController");
const authMiddleware = require("../middleware/authMiddleware");

// GET all users
router.get("/", authMiddleware, getAllUsers);

//profil user
router.get("/profil", authMiddleware, (req, res) => {
  // You can access the authenticated user via req.user
  const user = req.user;
  res.json({ message: "Protected route accessed by user: " + user.username });
});

// GET user by email
router.get("/:email", authMiddleware, getUserByEmail);

// POST create user
router.post("/register", register);

// POST login user (prevent access if already logged in)
router.post("/login", login);

// PUT update user
router.put("/:id", authMiddleware, updateUser);

// DELETE delete user
router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;
