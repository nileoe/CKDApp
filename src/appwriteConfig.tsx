import { Account, Client, ID } from "appwrite";

export const API_ENDPOINT = "https://cloud.appwrite.io/v1";
export const PROJECT_ID = "67d0926f00273e046380";

const client = new Client();
client.setEndpoint(API_ENDPOINT).setProject(PROJECT_ID);

export const account = new Account(client);

export const login = async (email: string, password: string) => {
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
  password: string
) => {
  return await account.create(ID.unique(), email, password, name);
};

export default client;
