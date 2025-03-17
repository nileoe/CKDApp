import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../appwriteConfig";
import "./CalculatorForm.scss";
import {
  CalculationData,
  creatinineUnits,
  userSexes,
  ckdStages,
  ethnicities,
} from "../types/CalculationTypes";

//
//const user: User = {
//  $id: 123,
//  username: 'kingCharles',
//  userType: "patient",
//}
const CalculatorForm = () => {
  // Initialization -----------
  const [loggedInUser, setLoggedInUser] = useState<null | any>(null); // TODO any

  useEffect(() => {
    const fetchUser = async () => {
      setLoggedInUser(await getCurrentUser());
    };
    fetchUser();

    if (loggedInUser) {
      console.log(
        `logged in user with name ${loggedInUser?.name} and id ${loggedInUser?.$id}`,
      );
    } else {
      console.log("no logged in user found.");
    }
  }, []);

  // State -------------
  //export type CalculationData = {
  //  userId: number;
  //  userAge: number;
  //  creatinineUnit: CreatinineUnit;
  //  creatinineLevel: number;
  //  userEthnicity: Ethnicity;
  //  userSex: UserSex;
  //  calculationResult: CalculationResult;
  //};
  const [formData, setFormData] = useState({
    creatinineLevel: 0,
    userAge: 18,
    userEthnicity: "",
    userSex: "",
    creatinineUnit: "",
  });
  // Handlers ----------
  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("TODO handling calculation with form data:");
    console.log(formData);
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    console.log(
      `input change: set form data from ${name} to new value ${value}`,
    );
    //console.log(`input change: set form data from ${formData[name]} to new value ${value}`)
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // View -----------
  return (
    <form onSubmit={handleCalculate}>
      <div className="formField">
        <label htmlFor="creatinineLevel">Creatinine Level</label>
        <input
          type="text"
          id="creatinineLevel"
          name="creatinineLevel"
          value={formData.creatinineLevel}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="formField">
        <label htmlFor="userAge">Age</label>
        <input
          type="number"
          id="userAge"
          name="userAge"
          value={formData.userAge}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="formField">
        <label htmlFor="userEthnicity">Ethnicity</label>
        <select
          id="userEthnicity"
          name="userEthnicity"
          value={formData.userEthnicity}
          onChange={handleInputChange}
          required
        >
          <option value="" disabled>
            Select ethnicity
          </option>
          {ethnicities.map((ethnicity) => (
            <option key={ethnicity} value={ethnicity}>
              {ethnicity}
            </option>
          ))}
        </select>
      </div>
      <div className="formField">
        <label htmlFor="userSex">Sex assigned at birth</label>
        <select
          id="userSex"
          name="userSex"
          value={formData.userSex}
          onChange={handleInputChange}
          required
        >
          <option value="" disabled>
            Select
          </option>
          {userSexes.map((userSex) => (
            <option key={userSex} value={userSex}>
              {userSex}
            </option>
          ))}
        </select>
      </div>
      <div className="formField">
        <select
          id="creatinineUnit"
          name="creatinineUnit"
          value={formData.creatinineUnit}
          onChange={handleInputChange}
          required
        >
          {creatinineUnits.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button type="submit">Calculate</button>
      </div>
    </form>
  );
};
export default CalculatorForm;

//  return (
//    <Form onSubmit={handleCalculate}>
//      <Form.Item label="Creatine Level" error={errors.ContributionCompletionID}>
//        <select
//          name="ContributionCompletionID"
//          value={displayedContribution.ContributionCompletionID}
//          onChange={handleChange}
//        >
//          {isNewContribution && (
//            <option key="0" value="0" disabled selected>
//              None Selected
//            </option>
//          )}
//          {completion.list.map((completion) => (
//            <option key={completion.CompletionID} value={completion.CompletionID}>
//              {completion.CompletionName}
//            </option>
//          ))}
//        </select>
//    </Form>
//  );
//};
