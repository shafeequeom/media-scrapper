const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const userWithEmail = await User.scope("withPassword")
    .findOne({ where: { email } })
    .catch((err) => {
      next(err);
    });

  if (!userWithEmail)
    return res
      .status(400)
      .json({ message: "Email or password does not match!" });
  try {
    if (await bcrypt.compare(password, userWithEmail.password)) {
      const jwtToken = jwt.sign(
        { id: userWithEmail.id, email: userWithEmail.email },
        process.env.JWT_SECRET
      );
      let response = {
        name: userWithEmail.name,
        id: userWithEmail.id,
        email: userWithEmail.email,
        token: jwtToken,
      };
      res.json({ message: "Welcome Back!", data: response });
    } else {
      return res
        .status(400)
        .json({ message: "Email or password does not match!" });
    }
  } catch (err) {
    next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const alreadyExistsUser = await User.findOne({ where: { email } }).catch(
      (err) => {
        next(err);
      }
    );

    if (alreadyExistsUser) {
      return res
        .status(409)
        .json({ message: "User with email already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    const savedUser = await newUser.save().catch((err) => {
      next(err);
    });

    if (savedUser) res.json({ message: "Thanks for registering" });
  } catch (error) {
    next(error);
  }
};

exports.currentUser = async (req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id).catch((err) => {
      next(err);
    });
    if (currentUser) {
      currentUser.token = req.user.token;
      res.json({ message: "Thanks for registering", data: currentUser });
    }
  } catch (error) {
    next(error);
  }
};
