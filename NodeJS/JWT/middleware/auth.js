const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");

const authMiddleWare = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("No token provided", 401);
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { username: decoded.username };
  } catch (error) {
    throw new CustomAPIError("Token doesn't exist", 401);
  }
  next();
};

module.exports = authMiddleWare;
