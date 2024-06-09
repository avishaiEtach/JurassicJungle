import Cookies from "js-cookie";
import { http } from "../http";

export const userServices = {
  login,
  getallUsers,
  getLoggedInUser,
  logout,
  signup,
};

async function login(loginForm: { email: string; password: string }) {
  return await http.post(`/login`, { ...loginForm });
}

async function signup(user: User): Promise<User> {
  return await http.post(`/signup`, { user });
}

async function getallUsers() {
  return await http.get(`/getUsers/all`);
}

async function getLoggedInUser() {
  return await http.get(`/getLoggedInUser`);
}

async function logout() {
  Cookies.remove(process.env.REACT_APP_SESSION_COOKIE_NAME as string);
  return await http.get(`/logout`);
}
