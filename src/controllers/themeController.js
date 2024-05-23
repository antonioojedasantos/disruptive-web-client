import { list } from "../api/themes";
import { register } from "../models/themeModel";

export const handleRegisterTheme = async (name, permission) => {
  try {
    const themeData = await register(name, permission);
    if (themeData.status_code === 200) {
      return { success: true, themes: themeData.themes };
    }
    return { success: false, message: "Registration failed" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const handleGetThemes = async () => {
  try {
    const themeData = await list();
    if (themeData.status_code === 200) {
      return themeData;
    }
    return { success: false, message: "list failed" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
