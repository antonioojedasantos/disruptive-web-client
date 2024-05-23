import { register as registerCategory, list } from "../api/category";

export const register = async (name, permission) => {
  return await registerCategory(name, permission);
};

export const listCategory = async () => {
  return await list();
};
