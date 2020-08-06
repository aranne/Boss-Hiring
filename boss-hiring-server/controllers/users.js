const mongoose = require("mongoose");
const User = require("./../models/user");
const only = require("only");

exports.create = async (req, res) => {
  const user = new User(only(req.body, "username password type"));
  try {
    const newUser = await user.save();
    res.cookie("userid", newUser._id, { maxAge: 1000 * 60 * 60 * 24 });
    res.json({
      code: 0,
      data: only(newUser, "_id username type"),
    });
  } catch (err) {
    res.status(500).json({ code: 1, error: "This user already exists" });
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
    res.json({ code: 0, user });
  } catch (err) {
    res
      .status(500)
      .json({ code: 1, error: "Username or Password is not correct" });
  }
};

exports.update = async (req, res) => {
  const userid = req.cookies.userid;

  if (!userid) {
    return res.status(500).json({ code: 1, error: "Please login first" });
  }

  const update = req.body;
  try {
    const oldUser = await User.findOneAndUpdate({ userid }, update);
    const data = Object.assign(only(oldUser, "_id username type"), user);
    res.json({ code: 0, data });
  } catch (err) {
    res.clearCookie("userid"); // 通知浏览器删除userid cookie
    res.status(500).json({ code: 1, error: "Please login first" });
  }
};
