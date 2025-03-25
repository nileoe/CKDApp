/* eslint-disable @typescript-eslint/no-unused-vars */
import { ID } from "appwrite";
import { account, databases, DB_ID } from "./appwriteConfig";

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

const createUserData = async (
  userId: string,
  userDOB: string,
  userSex: string,
) => {
  try {
    const response = await databases.createDocument(
      DB_ID,
      "UserData",
      ID.unique(),
      {
        userId: userId,
        userDOB: userDOB,
        userSex: userSex,
      },
    );
    return response;
  } catch (error) {
    console.error("Failed to save userdata:", error);
    throw error;
  }
};

export const createAccount = async (
  name: string,
  email: string,
  password: string,
  userDOB: string,
  userSex: string,
) => {
  const newAccount = await account.create(ID.unique(), email, password, name);
  await createUserData(newAccount.$id, userDOB, userSex);
};
