import { register as registerUser, login as loginUser } from "../api/auth";

export const register = async (email, user_name, type_user) => {
  return await registerUser(email, user_name, type_user);
};

export const login = async (email, userName) => {
  return await loginUser(email, userName);
};
