import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../../backend/userActions";
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
  const [egfrResultString, setEgfrResultString] = useState<string>(
    "Submit calculation to see your result",
  );
  const [ckdStageString, setCkdStageString] = useState<string>(
    "Submit calculation to see your result",
  );
  const [formData, setFormData] = useState({
    creatinineLevel: 90,
    userAge: 18,
    userEthnicity: "",
    userSex: "",
    creatinineUnit: creatinineUnits[0],
  });
  // Handlers ----------
  const getEgfrValue = (
    isBlack: boolean,
    isFemale: boolean,
    creatinineLevel: number,
    age: number,
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

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData.creatinineUnit);
    const isBlack: boolean = isEthnicityBlack(formData.userEthnicity);
    const isFemale: boolean = formData.userSex.toLowerCase() === "female";
    const result = getEgfrValue(
      isBlack,
      isFemale,
      formData.creatinineLevel,
      formData.userAge,
    );
    const ckdStage = getCKDStage(result);
    setEgfrResultString(`${Math.round(result).toString()} ml/min/1.73m2`);
    setCkdStageString(ckdStage.description);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // View -----------
  // TODO is mainContainer useful (styled) if not remove
  return (
    <>
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
              <label htmlFor="userAge">Age</label>
              <input
                type="number"
                id="userAge"
                name="userAge"
                value={formData.userAge}
                onChange={handleInputChange}
                className="formBox"
                required
              />
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
                  Select ethnicity
                </option>
                {ethnicities.map((ethnicity) => (
                  <option key={ethnicity} value={ethnicity}>
                    {ethnicity}
                  </option>
                ))}
              </select>
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
              <label htmlFor="creatinineUnit">Creatinine Unit</label>
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
              <label>eGFR</label>
              <textarea className="formBox" readOnly>
                {egfrResultString}
              </textarea>
            </div>
            <div className="formItem">
              <label>CKD Stage</label>
              <textarea className="formBox" readOnly>
                {ckdStageString}
              </textarea>
            </div>
            <div className="formItem">
              <label>Description</label>
              <textarea className="formBox" readOnly>
                {ckdStageString}
              </textarea>
            </div>
            <button className="submitButton" type="submit">
              Calculate
            </button>
            <p className="nextSteps">
              CKD Stage info and steps <FontAwesomeIcon icon={faArrowRight} />
            </p>
          </div>
        </form>
      </div>
    </>
  );
  //return (
  //  <>
  //    <div className="formContainer">
  //      <form onSubmit={handleCalculate}>
  //        <div className="formContent">
  //          <div className="formColumn">
  //            <div className="formItem">
  //              <label htmlFor="creatinineLevel">Creatinine Level</label>
  //              <input
  //                type="number"
  //                id="creatinineLevel"
  //                name="creatinineLevel"
  //                value={formData.creatinineLevel}
  //                onChange={handleInputChange}
  //                className="formBox"
  //                required
  //              />
  //            </div>
  //            <div className="formItem">
  //              <label htmlFor="userAge">Age</label>
  //              <input
  //                type="number"
  //                id="userAge"
  //                name="userAge"
  //                value={formData.userAge}
  //                onChange={handleInputChange}
  //                className="formBox"
  //                required
  //              />
  //            </div>
  //            <div className="formItem">
  //              <label htmlFor="userEthnicity">Ethnicity</label>
  //              <select
  //                id="userEthnicity"
  //                name="userEthnicity"
  //                value={formData.userEthnicity}
  //                onChange={handleInputChange}
  //                className="formBox"
  //                required
  //              >
  //                <option value="" disabled>
  //                  Select ethnicity
  //                </option>
  //                {ethnicities.map((ethnicity) => (
  //                  <option key={ethnicity} value={ethnicity}>
  //                    {ethnicity}
  //                  </option>
  //                ))}
  //              </select>
  //            </div>
  //            <div className="formItem">
  //              <label htmlFor="userSex">Sex assigned at birth</label>
  //              <select
  //                id="userSex"
  //                name="userSex"
  //                value={formData.userSex}
  //                onChange={handleInputChange}
  //                className="formBox"
  //                required
  //              >
  //                <option value="" disabled>
  //                  Select
  //                </option>
  //                {userSexes.map((userSex) => (
  //                  <option key={userSex} value={userSex}>
  //                    {userSex}
  //                  </option>
  //                ))}
  //              </select>
  //            </div>
  //
  //            <div>
  //              <button className="submitButton" type="submit">
  //                Calculate
  //              </button>
  //            </div>
  //          </div>
  //
  //          <div className="formColumn">
  //            <div>
  //              <select
  //                id="creatinineUnit"
  //                name="creatinineUnit"
  //                value={formData.creatinineUnit}
  //                onChange={handleInputChange}
  //                className="formBox"
  //                required
  //              >
  //                {creatinineUnits.map((unit) => (
  //                  <option key={unit} value={unit}>
  //                    {unit}
  //                  </option>
  //                ))}
  //              </select>
  //            </div>
  //            <div className="formItem">
  //              <label>eGFR</label>
  //              <textarea className="formBox" name="" id="" readOnly>
  //                {egfrResultString}
  //              </textarea>
  //            </div>
  //            <div className="formItem">
  //              <label>CKD Stage</label>
  //              <textarea className="formBox" name="" id="" readOnly>
  //                {ckdStageString}
  //              </textarea>
  //            </div>
  //            <div className="formItem">
  //              <label>Description</label>
  //              <textarea className="formBox" name="" id="" readOnly>
  //                {ckdStageString}
  //              </textarea>
  //            </div>
  //            <p>
  //              CKD Stage info and steps <FontAwesomeIcon icon={faArrowRight} />
  //            </p>
  //          </div>
  //        </div>
  //      </form>
  //
  //      <div>
  //        <div className="resultBox">
  //          <p className="resultLabel">eGFR</p>
  //          <p className="result">{egfrResultString}</p>
  //          <p className="resultLabel">CKD Stage</p>
  //          <p className="result">{ckdStageString}</p>
  //        </div>
  //      </div>
  //    </div>
  //  </>
  //);
};
export default CalculatorForm;
