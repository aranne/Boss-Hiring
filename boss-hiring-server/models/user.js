const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // 用户名
  password: { type: String, required: true }, // 密码
  type: { type: String, required: true }, // 用户类型: employer/employee
  avatar: { type: String, default: "" }, // 头像
  post: { type: String, default: "" }, // 职位
  info: { type: String, default: "" }, // 个人或职位简介
  company: { type: String, default: "" }, // 公司名称
  salary: { type: String, default: "" }, // 工资
});

/**
 * Validations
 */
// UserSchema.path("username").validate(function (username) {
//   return new Promise((resolve) => {
//     const User = mongoose.model("User");
//     // Check this path is new or is modified
//     if (this.isNew || this.isModified("username")) {
//       User.find({ username }).exec((err, users) =>
//         resolve(!err && !users.length)
//       );
//     } else resolve(true);
//   });
// }, "Name `{username}` already exists");

/**
 * Pre-hook:   Encrypt the password using bcrypt
 */
UserSchema.pre("save", async function () {
  let user = this;
  // only hash the password if it has been modified or is new
  if (!user.isModified("password")) return Promise.resolve(true);

  // generate a salt
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR); // hash the password using our new salt
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash; // override the cleartext password with the hashed one
});

/**
 * Methods
 */
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: async function (plainText) {
    const isMatch = await bcrypt.compare(plainText, this.password);
    return Promise.resolve(isMatch);
  },
};

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Load user
   */
  load: function func(options, callback) {
    return this.where(param, new RegExp(param, "i")).exec(callback);
  },
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
