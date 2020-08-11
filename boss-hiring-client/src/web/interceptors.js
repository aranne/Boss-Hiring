import axios from "axios";
import { logout } from "../features/users/currentUserSlice";

const httpService = {
  setupInterceptors: (store) => {
    axios.interceptors.response.use(
      (response) => { // Any status code that lie within the range of 2xx cause this function to trigger
        return response;
      },
      (error) => {    // Any status codes that falls outside the range of 2xx cause this function to trigger
        if (error.response.status === 401) {
          store.dispatch(logout());
        }
        return Promise.reject(error);
      }
    );
  },
};

export default httpService;
