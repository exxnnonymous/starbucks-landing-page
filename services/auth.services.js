import axios from "axios";

const API_URL = "/api/users/auth/";

const register = async (name, email, password,itemsInCart) => {
  const res = await axios.post(API_URL + "register", {
    name,
    email,
    password,
    itemsInCart
  });

  return res.data;
};

const login = async (email, password,itemsInCart) => {
  const res = await axios.post(API_URL + "login", {
    email,
    password,
    itemsInCart
  });
  return res.data;
};

const logout = async () => {
  try{
    await axios.post(API_URL + "logout");
  }catch(err){
  }
};

const authService = {
  register,
  login,
  logout,
};
export default authService;
