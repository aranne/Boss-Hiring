const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true}, // 用户名
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
UserSchema.pre("save", function (next) {
  let user = this;
  // only hash the password if it has been modified or is new
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

/**
 * Methods
 */
UserSchema.methods = {
  /**
   * Compare password
   */
  comparePassword: function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
    });
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
