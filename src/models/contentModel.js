import { register as registerContent , list} from "../api/content";

export const register = async (name, categoryOrTheme, selectedCategory,selectedTheme,imageUrl) => {
  return await registerContent(name, categoryOrTheme, selectedCategory,selectedTheme,imageUrl);
};

export const listContent = async () => {
  return await list();
};