import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../../backend/userActions";
import "./CalculatorForm.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {
  CalculationData,
  creatinineUnits,
  userSexes,
  ckdStages,
  ethnicities,
} from "../../types/CalculationTypes";

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
  const [egfrResultString, setEgfrResultString] =
    useState<string>("Enter calculation");
  const [ckdStageString, setCkdStageString] =
    useState<string>("Enter calculation");
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
    setEgfrResultString(formData.creatinineLevel.toString());
    setCkdStageString((formData.creatinineLevel * 3).toString());
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
    <div className="mainContainer">
      <div>
        <form onSubmit={handleCalculate}>
          <div className="formRowGroupItem">
            <div className="formItem">
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
            <div>
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
          </div>
          <div className="formItem">
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
          <div className="formItem">
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
          <div className="formItem">
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
          <div>
            <button className="submitButton" type="submit">
              Calculate
            </button>
          </div>
        </form>
      </div>

      <div>
        <h4 className="resultTitle">Your results</h4>
        <div className="resultBox">
          <p className="resultLabel">eGFR</p>
          <p className="result">{egfrResultString}</p>
          <p className="resultLabel">CKD Stage</p>
          <p className="result">{ckdStageString}</p>
          <p className="resultLabel">
            CKD Stage info and steps <FontAwesomeIcon icon={faArrowRight} />
          </p>
        </div>
      </div>
    </div>
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
