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
    url: url,
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
}

client.get = function (url, customConfig = {}) {
  return client(url, customConfig);
};

client.post = function (url, body, customConfig = {}) {
  return client(url, { body, ...customConfig });
};
