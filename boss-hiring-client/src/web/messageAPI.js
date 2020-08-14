import { client } from "./client";

/**
 * Fetch all related messages for current user
 * @return {Promise}
 */
export const reqAllMessages = () => {
  return client.get('/msgs/msglist');
}