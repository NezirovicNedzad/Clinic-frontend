import axios from "axios";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    return response;
  },
  (error) => {
    const { data, status } = error.response;
    switch (status) {
      case 400:
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        } else {
          console.log(data);
        }
        break;
      case 401:
        break;
      case 403:
        break;
      case 404:
        console.log("lol");
        break;
      case 500:
        break;

      default:
        break;
    }
    return Promise.reject(error);
  }
);
