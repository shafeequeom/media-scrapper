const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const userWithEmail = await User.findOne({ where: { email } }).catch(
    (err) => {
      console.log("Error: ", err);
    }
  );
  console.log(userWithEmail.email);

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
      res.json({ message: "Welcome Back!", token: jwtToken });
    } else {
      return res
        .status(400)
        .json({ message: "Email or password does not match!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const alreadyExistsUser = await User.findOne({ where: { email } }).catch(
    (err) => {
      console.log("Error: ", err);
    }
  );

  if (alreadyExistsUser) {
    return res.status(409).json({ message: "User with email already exists!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ name, email, password: hashedPassword });
  const savedUser = await newUser.save().catch((err) => {
    res.status(500).json({ message: "Cannot register user at the moment!" });
  });

  if (savedUser) res.json({ message: "Thanks for registering" });
};

exports.users = async (req, res) => {
  const users = await User.findAll({}).catch((err) => {
    console.log("Error: ", err);
  });

  res.json({ message: "Thanks for registering", data: users });
};