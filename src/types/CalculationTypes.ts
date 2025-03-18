export const creatinineUnits = ["micromol/l", "mg/dl"] as const;
//export const userSexes = ["Female", "Male", "Other"] as const;
export const userSexes = ["Female", "Male"] as const;
export const ckdStages = ["Early", "Middle", "Advanced"] as const;
export const ethnicities = [
  "White - British",
  "White - Irish",
  "White - Any other White background",
  "Mixed - White and Black Caribbean",
  "Mixed - White and Black African",
  "Mixed - White and Asian",
  "Mixed - Any other mixed background",
  "Asian or Asian British - Indian",
  "Asian or Asian British - Pakistani",
  "Asian or Asian British - Bangladeshi",
  "Asian or Asian British - Any other Asian background",
  "Black or Black British - Caribbean",
  "Black or Black British - African",
  "Black or Black British - Any other Black background",
  "Other Ethnic Groups - Chinese",
] as const;

export const isEthnicityBlack = (ethnicity: string): boolean =>
  ethnicity.toLowerCase().includes("black"); // very advanced and conscious of the complex cultural landscapes of multiple black ethnicities i know i know

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

export type eGFRStage = {
  name: string;
  description: string;
};
export const eGFRStages: eGFRStage[] = [
  {
    name: "1",
    description:
      "Normal kidney function but urine findings or structural abnormalities or genetic trait point to kidney disease",
  },
  {
    name: "2",
    description:
      "Mildly reduced kidney function, and other findings (as for stage 1) point to kidney disease",
  },
  {
    name: "3A",
    description: "Moderately reduced kidney function",
  },
  {
    name: "3B",
    description: "Moderately reduced kidney function",
  },
  {
    name: "4",
    description: "Severely reduced kidney function",
  },
  {
    name: "5",
    description: "Very severe, or end stage kidney failure",
  },
];

//type eGFRName = (typeof eGFRStageNames)[number];
//type eGFRDescription = (typeof eGFRStageDescriptions)[number];
//
//export type eGFRStage = {
//  name: eGFRName;
//  description: eGFRDescription;
//};
//export const eGFRStages = {
//  nameList: eGFRStageNames,
//  //descriptionList: eGFRStageDescriptions,
//  getDescription: (stage: eGFRStageName): string => {
//    const index = eGFRStageNames.indexOf(stage);
//    return index >= 0
//      ? eGFRStageDescription[index]
//      : "eGFR types: Invalid stage name";
//  },
//};
