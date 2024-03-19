const bcrypt = require("bcryptjs");
const db = require("../db/connection");
const { generateToken } = require("../utils/jwt");
// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get user by email
const getUserByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await db.User.findOne({ where: { email } });
    if (user) {
      res.json({ user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create a new user
const register = async (req, res) => {
  const { email, username, password, role } = req.body;

  try {
    // Check if the email already exists
    const existingEmail = await db.User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Check if the username already exists
    const existingUsername = await db.User.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await db.User.create({
      email,
      username,
      password_hash: hashedPassword,
      role,
    });

    //generate a token for the new user
    const token = generateToken({
      email: newUser.email,
      username: newUser.username,
      role: newUser.role,
    });

    // Send the token in the response
    res.json({ message: "User registred with success", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  try {
    const [, updatedUser] = await db.User.update(userData, {
      where: { id },
      returning: true,
    });
    if (updatedUser && updatedUser.length > 0) {
      res.json({ user: updatedUser[0] });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCount = await db.User.destroy({ where: { id } });
    if (deletedCount > 0) {
      res.status(204).send(); // No content to return
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  // Validate inputs
  if (!email || !password) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  try {
    // Find user by email
    const user = await db.User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check password

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = generateToken({
      email: user.email,
      username: user.username,
      role: user.role,
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllUsers,
  getUserByEmail,
  register,
  updateUser,
  deleteUser,
  login,
};
