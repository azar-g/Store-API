const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors");

const login = (req, res, next) => {
  console.log(req.body);
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError("Please provide your username and password");
  }
  const id = new Date().getDate();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({ msg: "user created", token });
};

const dashboard = (req, res, next) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello ${req.user.username}`,
    secret: `Here is your authorised data, your lucky numbere is ${luckyNumber} `,
  });
};

module.exports = { login, dashboard };
