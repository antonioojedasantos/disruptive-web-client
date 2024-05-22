import { register as registerTheme , list} from "../api/themes";

export const register = async (name,permission) => {
  return await registerTheme(name,permission);
};

export const listTheme = async () => {
  return await list();
};