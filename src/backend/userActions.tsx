import { ID } from "appwrite";
import { account } from "./appwriteConfig";

export const getCurrentUser = async () => {
  try {
    return await account.get();
  } catch (error) {
    return null;
  }
};

export const login = async (email: string, password: string) => {
  const user = await getCurrentUser();
  if (user) {
    return user;
  }

  try {
    return await account.createEmailPasswordSession(email, password);
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};
export const logout = async () => {
  await account.deleteSession("current");
};

export const createAccount = async (
  name: string,
  email: string,
  password: string,
) => {
  return await account.create(ID.unique(), email, password, name);
};
