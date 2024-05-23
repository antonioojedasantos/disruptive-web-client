import { list } from "../api/category";
import { register } from "../models/categoryModel";

export const handleRegisterCategory = async (name, permission) => {
  try {
    const categoryData = await register(name, permission);
    if (categoryData.status_code === 200) {
      return { success: true, categories: categoryData.categories };
    }
    return { success: false, message: "Registration failed" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const handleGetCategory = async () => {
  try {
    const categorieData = await list();
    if (categorieData.status_code === 200) {
      return categorieData;
    }
    return { success: false, message: "list failed" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
