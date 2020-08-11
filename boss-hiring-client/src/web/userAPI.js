/**
 * HTTP Request API
 */
import { client } from "./client";

/**
 * Register
 * @param {Object} user
 */
export const reqRegister = (user) => {
  return client.post("/users/register", user);
};

/**
 * Login
 * @param {Object} user
 */
export const reqLogin = (user) => {
  return client.post("/users/login", user);
};

/**
 * Update
 * @param {Object} user
 */
export const reqUpdateUser = (user) => {
  return client.post("/users/update", user);
};

/**
 * Get all users
 * @param {Object} type type of user [employee/employer] must exist
 */
export const reqAllUsers = (type) => {
  return client.get("/users/userlist", { params: type });
};
