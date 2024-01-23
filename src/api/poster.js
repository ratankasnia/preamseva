import axios from "axios";
import { API_ROUTE } from "./constant";
import { getToken } from "../../src/utility/utility";

// By using  this function we can call POST DELETE and PUT methods
const poster = async ({
  url,
  method = "POST",
  bodyData = {},
  authToken = getToken(),
}) => {
  const config = {
    method: method,
    url: API_ROUTE + url,
    data: bodyData,
    headers: { Authorization: `Bearer ${authToken}` },
  };
  return axios(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      // Swal.fire('Error', error.message, 'error');
    });
};

export { poster };
