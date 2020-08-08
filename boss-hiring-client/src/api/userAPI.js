/**
 * HTTP Request API
 */
import {client} from './client';

/**
 * Register
 * @param {Object} user
 */
export const reqRegister = (user) => {
  return client.post('/users/register', user);
};

/**
 * Login
 * @param {Object} user
 */
export const reqLogin = (user) => {
  return client.post('/users/login', user);
};

/**
 * Update
 * @param {Object} user
 */
export const reqUpdate = (user) => {
  return client.post('/users/update', user);
};
