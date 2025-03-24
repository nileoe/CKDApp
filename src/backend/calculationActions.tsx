/* eslint-disable @typescript-eslint/no-explicit-any */
import { databases } from "./appwriteConfig";
import { ID, Query } from "appwrite";

export const DATABASE_ID = "CKD_DB";
export const COLLECTION_ID = "Calculations";

export const saveCalculation = async (data: any) => {
  try {
    const response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      data
    );
    return response;
  } catch (error) {
    console.error("Failed to save calculation:", error);
    throw error;
  }
};

export const getUserCalculations = async (userId: string) => {
  try {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("userId", userId),
      Query.orderDesc("$createdAt"),
    ]);
    return response.documents;
  } catch (error) {
    console.error("Failed to fetch calculations:", error);
    throw error;
  }
};
