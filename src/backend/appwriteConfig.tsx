/* eslint-disable @typescript-eslint/no-explicit-any */
import { Account, Client, Databases } from "appwrite";

export const API_ENDPOINT = "https://cloud.appwrite.io/v1";
export const PROJECT_ID = "67d0926f00273e046380";
export const DB_ID = "CKD_DB";
export const pediatricCal = "pediatricCal";

const client = new Client();

client.setEndpoint(API_ENDPOINT).setProject(PROJECT_ID);

export const databases = new Databases(client);

export const account = new Account(client);

export default client;
