import { Account, Client, Databases, ID } from "appwrite";

export const API_ENDPOINT = "https://cloud.appwrite.io/v1";
export const PROJECT_ID = "67d0926f00273e046380";
export const DB_ID = "CKD_DB";

const client = new Client();
client.setEndpoint(API_ENDPOINT).setProject(PROJECT_ID);

export const databases = new Databases(client);

export const account = new Account(client);

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

export default client;
