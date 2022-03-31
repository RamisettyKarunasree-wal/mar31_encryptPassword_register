const bcrypt = require('bcrypt');
const User = require('../models/user');
exports.createUser = function (req, res) {
  console.log(req.body);
  let encryptedPassword;
  try {
    let salt = bcrypt.genSaltSync(10);
    console.log(salt);
    encryptedPassword = bcrypt.hashSync(req.body.password, salt);
    console.log(encryptedPassword);
  } catch (error) {
    console.log(error);
    console.log('error in brcypt');
  }
  const userOb = new User({
    username: req.body.username,
    dob: req.body.dob,
    password: encryptedPassword,
    email: req.body.email,
  });
  userOb.save(function (err) {
    if (err) {
      res.json(err);
    } else {
      res.json('User created succesfully');
    }
  });
};
exports.checkUser = async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  if (user) {
    res.json({ status: 0, debug_data: 'username already exists' });
  } else {
    res.json({ status: 1, msg: "username doesn't exist" });
  }
};
exports.checkEmail = async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  console.log(user);
  if (user) {
    res.json({ status: 0, debug_data: 'email already exists' });
  } else {
    res.json({ status: 1, msg: "email doesn't exist" });
  }
};
exports.getUsers = (request, response) => {
  User.find((err, users_list) => {
    if (err) {
      response.json(err);
    } else {
      response.json({ status: 1, data: { users_list } });
    }
  });
};
