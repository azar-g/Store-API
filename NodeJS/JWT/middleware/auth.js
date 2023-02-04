const { UnAuthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");

const authMiddleWare = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnAuthenticatedError("No token provided");
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { username: decoded.username };
  } catch (error) {
    throw new UnAuthenticatedError("Token doesn't exist");
  }
  next();
};

module.exports = authMiddleWare;
