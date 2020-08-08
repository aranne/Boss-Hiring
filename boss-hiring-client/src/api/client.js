import axios from "axios";

/**
 *
 * @param {String} url
 * @param {Object} date             body object for http request
 * @param {Object} customConfig     costom config like params
 */
export async function client(url, { data, ...customConfig } = {}) {
  const headers = { "Content-Type": "application/json" };

  const config = {
    method: data ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (data) {
    config.data = data;
  }

  return axios(config);

  // try {
  //   const response = await axios(config);
  //   if (response.status === 200) {
  //     return response.data;
  //   }
  //   throw new Error(response.statusText);
  // } catch (err) {
  //   if (err.response) {                         // if we received the response
  //     throw new Error(err.response.data);
  //   } else if (err.request) {                   // if we sent request
  //     throw new Error(err.request);
  //   } else {
  //     throw new Error(err.message);
  //   }
  // }
}

client.get = function (url, customConfig = {}) {
  return client(url, customConfig);
};

client.post = function (url, body, customConfig = {}) {
  return client(url, { body, ...customConfig });
};
