import { ID, Query } from "appwrite";
import { CalculationData } from "../types/CalculationTypes";
import { databases, DB_ID } from "./appwriteConfig";

export const DATABASE_ID = "CKD_DB";
export const COLLECTION_ID = "Calculations";

export const saveCalculation = async (newCalculation: CalculationData) => {
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
      },
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
