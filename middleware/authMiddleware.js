const jwt = require("jsonwebtoken");
const db = require("../db/connection");

const authMiddleware = async (req, res, next) => {
  // Get the JWT token from the request headers
  const token = req.headers.authorization;

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the user associated with the token exists
    const user = await db.User.findOne({ where: { email: decoded.email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Add the decoded user to the request object for later use
    req.user = user;

    // Move to the next middleware or routing function
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
