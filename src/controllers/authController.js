import { register, login } from "../models/userModel";

export const handleRegister = async (email, user_name, type_user) => {
  try {
    const userData = await register(email, user_name, type_user);
    if (userData.status_code === 200) {
      localStorage.setItem("confirmation_token",  userData.confirmation_token);
      localStorage.setItem("_id", userData._id);
      localStorage.setItem("user",  JSON.stringify(userData.user));

      return { success: true };
    }
    return { success: false, message: "Registration failed" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const handleLogin = async (email, userName) => {
  try {
    const userData = await login(email, userName);
    if (userData.status_code === 200) {
      localStorage.setItem("token", userData.token);
      localStorage.setItem("refresh_token",  userData.refresh_token);
      localStorage.setItem("user",  JSON.stringify(userData.user));

      return { success: true };
    }
    return { success: false, message: "Login failed" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
