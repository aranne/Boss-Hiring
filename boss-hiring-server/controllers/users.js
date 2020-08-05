const mongoose = require("mongoose");
const User = require("./../models/user");

exports.create = async function (req, res) {
  const { username, password, type } = req.body;
  const user = new User({
    username: username,
    password: password,
    type: type,
  });
  try {
    const newUser = await user.save();
    res.cookie("userid", newUser._id, { maxAge: 1000 * 60 * 60 * 24 });
    res.send({
      code: 0,
      data: { _id: newUser._id, username, type },
    });
  } catch (err) {
    res.send({ code: 1, msg: "This user already exists" });
  }
};

exports.login = async function (req, res) {
  const { username, password } = new User(req.body);
  try {
    const user = await User.findOne(
      {
        username,
        password: password,
      },
      { password: 0, __v: 0 }         // 0 means excluding password from result
    ); 
    res.cookie("userid", user._id, { maxAge: 1000 * 60 * 60 * 24 });
    res.send({ code: 0, user });
  } catch (err) {
    res.send({ code: 1, msg: "Username or Password is not correct" });
  }
};
