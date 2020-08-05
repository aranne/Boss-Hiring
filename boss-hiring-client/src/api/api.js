/**
 * HTTP Request API
 */
import axios from "./ajax";

/**
 * Register
 * @param {Object} user
 */
export const reqRegister = (user) => {
  return axios("/users/register", user, "POST");
};

/**
 * Login
 * @param {Object} user
 */
export const reqLogin = (user) => {
  return axios("/users/login", user, "POST");
};

/**
 * Update
 * @param {Object} user
 */
export const reqUpdate = (user) => {
  return axios("/users/update", user, "POST");
};
