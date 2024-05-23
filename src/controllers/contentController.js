import { list } from "../api/content";
import { register } from "../models/contentModel";

export const handleRegisterContent = async (
  name,
  categoryOrTheme,
  selectedCategory,
  selectedTheme,
  imageUrl
) => {
  try {
    const contentData = await register(
      name,
      categoryOrTheme,
      selectedCategory,
      selectedTheme,
      imageUrl
    );
    if (contentData.status_code === 200) {
      return { success: true };
    }
    return { success: false, message: "Registration failed" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const handleGetContent = async (type) => {
  try {
    const contentData = await list(type);
    if (contentData.status_code === 200) {
      return contentData;
    }
    return { success: false, message: "list failed" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
