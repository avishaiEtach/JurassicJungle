import Cookies from "js-cookie";
import { http } from "../http";

export const userServices = {
  login,
  getallUsers,
  getLoggedInUser,
  logout,
  signup,
  updateUser,
  updateMember,
  deleteUser,
  deleteUsers,
  updateUserByAdmin,
  createUserByAdmin,
  getAllEmployees,
  createMail,
};

async function login(loginForm: { email: string; password: string }) {
  return await http.post(`/login`, { ...loginForm });
}

async function signup(user: newUser): Promise<User> {
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

async function updateUser(id = "", fieldsToChange: any) {
  return await http.put(`/updateUser/${id}`, { fieldsToChange });
}

async function updateMember(id = "", fieldsToChange: any) {
  return await http.put(`/updateMember/${id}`, { fieldsToChange });
}

async function deleteUser(id = "") {
  return await http.delete(`/deleteUser/${id}`);
}

async function deleteUsers(idsToDelete: string[]) {
  return await http.delete(`/deleteUsers`, { idsToDelete });
}

async function updateUserByAdmin(
  { ids, user, member, employee }: AdminUser,
  userId: string | null
) {
  return await http.put(`/updateUserByAdmin/${userId}`, {
    ids,
    user,
    member,
    employee,
  });
}

async function createUserByAdmin({ ids, user, member, employee }: AdminUser) {
  return await http.post(`/createUserByAdmin`, { ids, user, member, employee });
}

async function getAllEmployees(): Promise<Employee[]> {
  return await http.get(`/getAllEmployees`);
}

async function createMail(mail: NewMail): Promise<Mail[]> {
  return await http.post(`/createMail`, { mail });
}
