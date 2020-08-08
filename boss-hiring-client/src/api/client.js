import axios from "axios";

/**
 *
 * @param {String} url
 * @param {Object} date             body object for http request
 * @param {Object} customConfig     costom config like params
 */
export async function client(url, { body, ...customConfig } = {}) {
  const headers = { "Content-Type": "application/json" };

  const config = {
    url: url,
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  console.log(body, config.method);
  if (body) {
    config.data = body;
  }
  console.log(config);
  return axios(config);
}

client.get = function (url, customConfig = {}) {
  return client(url, customConfig);
};

client.post = function (url, body, customConfig = {}) {
  return client(url, { body, ...customConfig });
};
