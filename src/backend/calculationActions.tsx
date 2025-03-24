import { ID } from "appwrite";
import { CalculationData } from "../types/CalculationTypes";
import { databases, DB_ID } from "./appwriteConfig";

//export type CalculationData = {
//  userId: number;
//  userAge: number;
//  creatinineUnit: CreatinineUnit;
//  creatinineLevel: number;
//  userEthnicity: Ethnicity;
//  userSex: UserSex;
//  calculationResult: CalculationResult;
//};

//type CalculationResult = {
//  eGFRResult: string;
//  ckdStage: string;
//  ckdDescription: string;
//};

//export async function addCalculation(newCalculation: CalculationData): Promise<CalculationData> {
export async function addCalculation(
  newCalculation: CalculationData,
): Promise<void> {
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
  console.log("posted new calculation. Response:");
  console.log(response);
  //const calculation = {
  //  $id: response.$id,
  //  $createdAt: response.$createdAt,
  //};
  //return calculation;
}
