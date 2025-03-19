export type User = {
  $id: number;
  username: string;
  userType: "patient" | "clinitian";
};

type CreatinineLevel = {
  id: number;
  level: number;
};

export const creatinineUnits = ["mcl", "mgdl"] as const;
export const userSexes = ["female", "male", "other"] as const;
export const ckdStages = ["early", "middle", "advanced"] as const;
export const ethnicities = [
  "Indian",
  "Pakistani",
  "Bangladeshi",
  "Chinese",
  "Any other Asian background",
  "Caribbean",
  "African",
  "Any other Black background",
  "White and Black Caribbean",
  "White and Black African",
  "White and Asian",
  "Any other Mixed background",
  "English, Welsh, Scottish, Northern Irish or British",
  "Irish",
  "Gypsy or Irish Traveller",
  "Roma",
  "Any other White background",
  "Arab",
  "Any other ethnic group",
] as const;
type CreatinineUnit = (typeof creatinineUnits)[number];
type UserSex = (typeof userSexes)[number];
type CKDStage = (typeof ckdStages)[number];
type Ethnicity = (typeof ethnicities)[number];
type CalculationResult = {
  eGFR: number;
  CKDStage: CKDStage;
};

// Example types
//type CreatinineUnit = {
//  id: 1 | 2;
//  unitname: CreatinineUnitName;
//};
//
//type CKDStage = {
//  id: 1 | 2 | 3;
//  stageName: CKDStageName;
//};

export type CalculationData = {
  userId: number;
  userAge: number;
  creatinineUnit: CreatinineUnit;
  creatinineLevel: CreatinineLevel;
  userEthnicity: Ethnicity;
  userSex: UserSex;
  calculationResult: CalculationResult;
};
