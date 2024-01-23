export const getToken = () => {
  let token = localStorage.getItem("jwt");
  return token;
};
export const isLogedInUser = () => {
  let user = localStorage.getItem("user");
  return user || false;
};
