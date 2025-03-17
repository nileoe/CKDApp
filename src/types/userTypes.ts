export type User = {
  $id: number;
  username: string;
  userType: "patient" | "clinitian";
};

type CreatinineLevel = {
  id: number;
  level: number;
};
