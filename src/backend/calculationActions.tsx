/* eslint-disable @typescript-eslint/no-explicit-any */
import { ID, Query } from "appwrite";
import { databases, DB_ID, pediatricCal } from "./appwriteConfig";

export const DATABASE_ID = "CKD_DB";
export const COLLECTION_ID = "Calculations";

export const saveCalculation = async (newCalculation: any) => {
  try {
    const response = await databases.createDocument(
      DB_ID,
      "Calculations",
      ID.unique(),
      {
        userId: newCalculation.userId,
        userSex: newCalculation.userSex,
        userAge: newCalculation.userAge,
        userEthnicity: newCalculation.userEthnicity,
        creatinineLevel: newCalculation.creatinineLevel,
        creatinineUnit: newCalculation.creatinineUnit,
        eGFRResult: newCalculation.calculationResult.eGFRResult,
        ckdStage: newCalculation.calculationResult.ckdStage,
        ckdDescription: newCalculation.calculationResult.ckdDescription,
      }
    );
    return response;
  } catch (error) {
    console.error("Failed to save calculation:", error);
    throw error;
  }
};

export const saveCalculationPedi = async (newData: any) => {
  try {
    const response = await databases.createDocument(
      DB_ID,
      pediatricCal,
      ID.unique(),
      newData
    );
    return response;
  } catch (error) {
    console.error("Failed to save calculation:", error);
    throw error;
  }
};

/*
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
*/

export const getUserCalculations = async (userId: string) => {
  try {
    const filters = userId === "all" ? [] : [Query.equal("userId", userId)];

    const res = await databases.listDocuments(
      "CKD_DB",
      "Calculations",
      filters
    );

    return res.documents;
  } catch (err) {
    console.error("Error fetching user calculations:", err);
    return [];
  }
};

export const getPaediatricCal = async (userId: string) => {
  try {
    const filters = userId == "all" ? [] : [Query.equal("userId", userId)];

    const res = await databases.listDocuments(DB_ID, pediatricCal, filters);
    return res.documents;
  } catch (err) {
    console.error("Error fetching user calculations:", err);
  }
};

export const fetchPediatricResults = async (userId: string) => {
  try {
    const res = await databases.listDocuments(DB_ID, pediatricCal, [
      Query.equal("userId", userId),
      Query.orderDesc("$createdAt"),
    ]);
    return res.documents;
  } catch (err) {
    console.error("Failed to fetch pediatric results:", err);
    return [];
  }
};
