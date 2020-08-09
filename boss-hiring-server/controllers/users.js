const mongoose = require("mongoose");
const User = require("./../models/user");
const only = require("only");

exports.create = async (req, res) => {
  const user = new User(only(req.body, "username password type"));
  try {
    const newUser = await user.save();
    const data = only(newUser, "_id username type");

    res.cookie("userid", newUser._id, { maxAge: 1000 * 60 * 60 * 24 });
    res.json({ user: data });
  } catch (err) {
    res.status(400).json({ message: "This user already exists" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const criteria = { username };
  try {
    const user = await User.load({ criteria });
    await user.authenticate(password);
    user.password = undefined; // remove password before send json

    res.cookie("userid", user._id, { maxAge: 1000 * 60 * 60 * 24 });
    res.json({ user });
  } catch (err) {
    res.clearCookie("userid"); // clear userid cookie
    res.status(401).json({ message: "Username or Password is not correct" });
  }
};

exports.update = async (req, res) => {
  const userid = req.cookies.userid;

  if (!userid) {
    return res.status(401).json({ message: "Please login first" });
  }
  const update = req.body;
  try {
    const oldUser = await User.findOneAndUpdate({ _id: userid }, update);
    const user = Object.assign(only(oldUser, "_id username type"), update);
    user.password = undefined; // remove password before send json

    res.json({ user });
  } catch (err) {
    // res.clearCookie("userid"); // clear userid cookie
    res.status(400).json({ message: "Update Error" });
  }
};

exports.show = async (req, res) => {
  const userid = req.cookies.userid;

  if (!userid) {
    return res.status(401).json({ message: "Please login first" });
  }

  const criteria = { _id: userid };
  const select = { password: 0 };
  try {
    const user = await User.load({ criteria, select });
    res.json({ user });
  } catch (err) {
    res.clearCookie("userid"); // clear userid cookie
    res.status(401).json({ message: "Please login first" });
  }
};

exports.index = async (req, res) => {
  const { type } = req.query;

  const criteria = { type };
  const select = { password: 0 };
  try {
    const users = await User.list({ criteria, select });
    res.json({ users });
  } catch (err) {
    res.end();
  }
};
