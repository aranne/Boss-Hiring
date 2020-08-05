/**
 * AJAX function
 * @param {String} type
 * @returns {Promise}
 */
import axios from "axios";

export default function ajax(url, data = {}, type = "GET") {
  if (type === "GET") {
    let str = "";
    Object.keys(data).forEach((key) => {
      str += key + "=" + data[key] + "&";
    });
    if (str) {
      str = str.slice(0, str.length - 1);
    }

    return axios.get(url + "?" + str);    // url?id=123&name=abc
  } else {
    return axios.post(url, data);
  }
}
