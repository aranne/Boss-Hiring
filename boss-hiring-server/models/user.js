import { Schema, model } from "mongoose";
import md5 from "blueimp-md5";

const UserSchema = new Schema({
  username: { type: String, required: true }, // 用户名
  hashed_password: { type: String, required: true }, // 密码
  type: { type: String, required: true }, // 用户类型: dashen/laoban header: {type: String}, // 头像名称
  post: { type: String }, // 职位
  info: { type: String }, // 个人或职位简介
  company: { type: String }, // 公司名称
  salary: { type: String }, // 工资
});

/**
 * Virtuals
 */
UserSchema.virtual("password")
  .set((password) => {
    this._password = password;
    this.hashed_password = md5(password);
  })
  .get(() => {
    return this._password;
  });

const User = model("User", UserSchema);
export default User;