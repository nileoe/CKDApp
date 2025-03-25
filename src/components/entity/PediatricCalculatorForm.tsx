/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import "./PediatricCalculatorForm.scss";
import { getCurrentUser } from "../../backend/userActions";
import { saveCalculation } from "../../backend/calculationActions";

const PediatricCalculatorForm = () => {
  const [formData, setFormData] = useState({
    age: 1,
    height: 50,
    creatinine: 0.5,
    sex: "",
    unit: "mg/dL",
  });

  const [eGFR, setEGFR] = useState<string>("Submit calculation to see result");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setUser(await getCurrentUser());
    };
    fetchUser();
  }, []);

  const getKConstant = (age: number, sex: string): number => {
    if (age <= 1) return 0.45;
    if (age <= 12) return 0.55;
    return sex.toLowerCase() === "male" ? 0.7 : 0.55;
  };

  const convertCreatinine = (value: number, unit: string): number => {
    return unit === "µmol/L" ? value / 88.4 : value;
  };

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();

    const { age, height, creatinine, sex, unit } = formData;

    if (formData.age >= 18) {
      alert(
        "This calculator is for users under 18 years old. Please use the Adult Calculator."
      );
      return;
    }

    if (!sex || !height || !age || !creatinine) {
      setEGFR("Please fill out all fields.");
      return;
    }

    const k = getKConstant(age, sex);
    const creatinineMg = convertCreatinine(creatinine, unit);
    const result = (k * height) / creatinineMg;
    const rounded = Math.round(result);

    setEGFR(`${rounded} ml/min/1.73m²`);

    if (user) {
      const data = {
        userId: user.$id,
        calculatorType: "pediatric",
        age,
        height,
        sex,
        creatinine,
        unit,
        eGFRResult: `${rounded} ml/min/1.73m²`,
      };

      try {
        await saveCalculation(data);
        console.log("Saved pediatric result");
      } catch (err) {
        console.error("Save failed:", err);
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  return (
    <div className="pediatricCalculatorForm">
      <h2>Pediatric eGFR Calculator</h2>
      <form onSubmit={handleCalculate}>
        <label>
          Age (years)
          <input
            type="number"
            name="age"
            min={0}
            max={17}
            value={formData.age}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Height (cm)
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Serum Creatinine
          <input
            type="number"
            name="creatinine"
            value={formData.creatinine}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Unit
          <select
            name="unit"
            value={formData.unit}
            onChange={handleInputChange}
            required
          >
            <option value="mg/dL">mg/dL</option>
            <option value="µmol/L">µmol/L</option>
          </select>
        </label>
        <label>
          Sex
          <select
            name="sex"
            value={formData.sex}
            onChange={handleInputChange}
            required
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>

        <button type="submit">Calculate</button>
      </form>

      <div className="resultBox">
        <h3>eGFR Result</h3>
        <p>{eGFR}</p>
      </div>
    </div>
  );
};

export default PediatricCalculatorForm;
