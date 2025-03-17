export const creatinineUnits = ["micromol/l", "mg/dl"] as const;
//export const userSexes = ["Female", "Male", "Other"] as const;
export const userSexes = ["Female", "Male"] as const;
export const ckdStages = ["Early", "Middle", "Advanced"] as const;
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

export type CalculationData = {
  userId: number;
  userAge: number;
  creatinineUnit: CreatinineUnit;
  creatinineLevel: number;
  userEthnicity: Ethnicity;
  userSex: UserSex;
  calculationResult: CalculationResult;
};
