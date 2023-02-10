const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const authentication = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer"))
    throw new UnauthenticatedError("Authentication invalid");

  const token = authorization.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};
module.exports = authentication;
