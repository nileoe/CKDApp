/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { getCurrentUser, getUserData } from "../../backend/userActions";
import "./CalculatorForm.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {
  CalculationData,
  creatinineUnits,
  userSexes,
  ethnicities,
  eGFRStage,
  eGFRStages,
  isEthnicityBlack,
} from "../../types/CalculationTypes";
import { saveCalculation } from "../../backend/calculationActions";
import { useNavigate } from "react-router-dom";

const CalculatorForm = () => {
  // Initialization -----------
  interface UserData {
    userEthnicity: string;
    userSex: string;
    userDOB: string; // Assuming ISO format
  }

  interface FormData {
    creatinineLevel: number;
    userAge: number; // Age as an integer
    userEthnicity: string;
    userSex: string;
    creatinineUnit: string;
  }
  const [loggedInUser, setLoggedInUser] = useState<null | any>(null);
  useEffect(() => {
    const fetchUser = async () => {
      setLoggedInUser(await getCurrentUser());
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!loggedInUser) return;
    const fetchUserData = async () => {
      setUserData((await getUserData(loggedInUser.$id))[0] as any);
    };
    fetchUserData();
  }, [loggedInUser]);

  const noResultsMessage = "Submit calculation to see your result";
  const navigate = useNavigate();

  // State -------------
  const [egfrValue, setEgfrValue] = useState<number | null>(null);
  const [egfrResultString, setEgfrResultString] = useState<string>("");
  const [ckdDescription, setCkdDescription] =
    useState<string>(noResultsMessage);
  const [ckdStageString, setCkdStage] = useState<string>(noResultsMessage);
  const [userData, setUserData] = useState<UserData | null>(null);

  const [formData, setFormData] = useState<FormData>({
    creatinineLevel: 90,
    userAge: 18,
    userEthnicity: "",
    userSex: "",
    creatinineUnit: creatinineUnits[0],
  });

  useEffect(() => {
    let resultString = "";
    if (egfrValue) {
      resultString = `${Math.round(egfrValue).toString()} ml/min/1.73m2`;
      const recordButton: HTMLElement | null =
        document.getElementById("recordButton");
      if (recordButton) {
        setButtonState(recordButton, true);
      }
    } else {
      resultString = noResultsMessage;
    }
    setEgfrResultString(resultString);
  }, [egfrValue]);

  useEffect(() => {
    if (!userData) return;

    // Calculate age based on userDOB
    const calculateAge = (dobString: string) => {
      const today = new Date();
      const dob = new Date(dobString);
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < dob.getDate())
      ) {
        age--;
      }
      return age;
    };

    setFormData((prevFormData) => ({
      ...prevFormData,
      userEthnicity: userData.userEthnicity,
      userSex: userData.userSex,
      userAge: calculateAge(userData.userDOB),
    }));
  }, [userData]);
  // Handlers ----------
  const getEgfrValue = (
    isBlack: boolean,
    isFemale: boolean,
    creatinineLevel: number,
    age: number
  ): number => {
    const blackModifier: number = isBlack ? 1.21 : 1;
    const femaleModifier: number = isFemale ? 0.742 : 1;
    const eGFRValue =
      186 *
      Math.pow(creatinineLevel / 88.4, -1.154) *
      Math.pow(age, -0.203) *
      femaleModifier *
      blackModifier;
    return eGFRValue;
  };

  const setButtonState = (
    button: HTMLElement | null,
    newState: boolean
  ): void => {
    if (!button) return;
    if (newState) {
      button.classList.add("buttonEnabled");
      button.classList.remove("buttonDisabled");
    } else {
      button.classList.add("buttonDisabled");
      button.classList.remove("buttonEnabled");
    }
  };

  const getCKDStage = (eGFRValue: number): eGFRStage => {
    let stage: eGFRStage;
    if (eGFRValue > 90) {
      stage = eGFRStages[0];
    } else if (eGFRValue >= 60) {
      stage = eGFRStages[1];
    } else if (eGFRValue >= 45) {
      stage = eGFRStages[2];
    } else if (eGFRValue >= 30) {
      stage = eGFRStages[3];
    } else if (eGFRValue >= 15) {
      stage = eGFRStages[4];
    } else {
      stage = eGFRStages[5];
    }
    return stage;
  };

  const allFormFieldsAreFilled = () => {
    const ageDropdown: HTMLSelectElement = document.getElementById(
      "userAge"
    ) as HTMLSelectElement;
    const ethnicityDropdown: HTMLSelectElement = document.getElementById(
      "userEthnicity"
    ) as HTMLSelectElement;
    const sexDropdown: HTMLSelectElement = document.getElementById(
      "userSex"
    ) as HTMLSelectElement;
    return ageDropdown.value && ethnicityDropdown.value && sexDropdown.value;
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.userAge < 18) {
      alert(
        "This calculator is for users 18 years and older. Please use the Pediatric Calculator."
      );
      navigate("/pediatric_calculator");
      return;
    }

    const isBlack = isEthnicityBlack(formData.userEthnicity);
    const isFemale = formData.userSex.toLowerCase() === "female";
    const result = getEgfrValue(
      isBlack,
      isFemale,
      formData.creatinineLevel,
      formData.userAge
    );
    const ckdStage = getCKDStage(result);
    setEgfrValue(result);
    setCkdDescription(ckdStage.description);
    setCkdStage(ckdStage.name);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
    if (allFormFieldsAreFilled()) {
      const calculateButton: HTMLElement | null =
        document.getElementById("calculateButton");
      if (calculateButton) {
        setButtonState(calculateButton, true);
      }
    }
  };

  const handleRecord = async () => {
    if (!egfrValue) {
      console.log("no calculation");
      return;
    }
    if (!loggedInUser) {
      console.error("No logged in user found");
      return;
    }
    const calculation: CalculationData = {
      userId: loggedInUser.$id,
      userAge: formData.userAge,
      userSex: formData.userSex,
      userEthnicity: formData.userEthnicity,
      creatinineUnit: formData.creatinineUnit,
      creatinineLevel: formData.creatinineLevel,
      calculationResult: {
        eGFRResult: egfrResultString,
        ckdStage: ckdStageString,
        ckdDescription: ckdDescription,
      },
    };
    try {
      await saveCalculation(calculation);
    } catch (err) {
      console.error("Could not save calculation: ", err);
    }
  };

  // View -----------
  return (
    <div className="formContainer">
      <form onSubmit={handleCalculate}>
        <div className="gridContainer">
          <div className="formItem">
            <label htmlFor="creatinineLevel">Creatinine Level</label>
            <input
              type="number"
              id="creatinineLevel"
              name="creatinineLevel"
              value={formData.creatinineLevel}
              onChange={handleInputChange}
              className="formBox"
              required
            />
          </div>
          <div className="formItem">
            <label htmlFor="creatinineUnit">Unit</label>
            <select
              id="creatinineUnit"
              name="creatinineUnit"
              value={formData.creatinineUnit}
              onChange={handleInputChange}
              className="formBox"
              required
            >
              {creatinineUnits.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
          <div className="formItem">
            <label htmlFor="userAge">Age</label>
            <input
              type="number"
              id="userAge"
              name="userAge"
              value={formData.userAge}
              onChange={handleInputChange}
              className="formBox"
              max="110"
              required
            />
          </div>
          <div className="formItem">
            <label>eGFR</label>
            <textarea className="formBox" readOnly value={egfrResultString} />
          </div>
          <div className="formItem">
            <label htmlFor="userEthnicity">Ethnicity</label>
            <select
              id="userEthnicity"
              name="userEthnicity"
              value={formData.userEthnicity}
              onChange={handleInputChange}
              className="formBox"
              required
            >
              <option value="" disabled>
                Select
              </option>
              {ethnicities.map((ethnicity) => (
                <option key={ethnicity} value={ethnicity}>
                  {ethnicity}
                </option>
              ))}
            </select>
          </div>
          <div className="formItem">
            <label>CKD Stage</label>
            <textarea className="formBox" readOnly value={ckdStageString} />
          </div>
          <div className="formItem">
            <label htmlFor="userSex">Sex assigned at birth</label>
            <select
              id="userSex"
              name="userSex"
              value={formData.userSex}
              onChange={handleInputChange}
              className="formBox"
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
          <div className="formItem">
            <label>Description</label>
            <textarea className="formBox" readOnly value={ckdDescription} />
          </div>
          <button id="calculateButton" type="submit" className="buttonDisabled">
            Calculate
          </button>
          <div className="infoTray">
            <p className="nextSteps">
              CKD Stage info and steps <FontAwesomeIcon icon={faArrowRight} />
            </p>
            <button
              id="recordButton"
              className="buttonDisabled"
              onClick={handleRecord}
            >
              Record Calculation
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default CalculatorForm;
