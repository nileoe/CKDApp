/* eslint-disable @typescript-eslint/no-unused-vars */
import { ID, Query } from "appwrite";
import { account, databases, DB_ID } from "./appwriteConfig";

const USERDATA_COLLECTION_ID = "UserData";

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
  name: string,
  email: string,
  userDOB: string,
  userSex: string,
  userEthnicity: string
) => {
  try {
    const response = await databases.createDocument(
      DB_ID,
      USERDATA_COLLECTION_ID,
      ID.unique(),
      {
        userId,
        name,
        email,
        userDOB,
        userSex,
        userEthnicity,
      }
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
  userEthnicity: string
) => {
  const newAccount = await account.create(ID.unique(), email, password, name);
  await createUserData(
    newAccount.$id,
    name,
    email,
    userDOB,
    userSex,
    userEthnicity
  );
};

export const getUserData = async (userId: any) => {
  try {
    const response = await databases.listDocuments(
      DB_ID,
      USERDATA_COLLECTION_ID,
      [Query.equal("userId", userId)]
    );
    return response.documents;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    throw error;
  }
};

export const getAllUserData = async () => {
  try {
    const response = await databases.listDocuments(
      DB_ID,
      USERDATA_COLLECTION_ID
    );
    return response.documents;
  } catch (error) {
    console.error("Failed to fetch all users:", error);
    throw error;
  }
};
