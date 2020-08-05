const mongoose = require("mongoose");
const md5 = require("blueimp-md5");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true }, // 用户名
  password: { type: String, required: true }, // 密码
  type: { type: String, required: true }, // 用户类型: dashen/laoban header: {type: String}, // 头像名称
  post: { type: String, default: "" }, // 职位
  info: { type: String, default: "" }, // 个人或职位简介
  company: { type: String, default: "" }, // 公司名称
  salary: { type: String, default: "" }, // 工资
});

/**
 * Validations
 */
UserSchema.path("username").validate(function (username) {
  return new Promise((resolve) => {
    const User = mongoose.model('User');
    // Check this path is new or is modified
    if (this.isNew || this.isModified('username')) {
      User.find({username}).exec((err, users) => resolve(!err && !users.length));
    } else resolve(true);
  });
}, "Name `{username}` already exists");

const User = mongoose.model("User", UserSchema);
module.exports = User;
