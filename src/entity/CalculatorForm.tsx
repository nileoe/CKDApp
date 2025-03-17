import { CalculationData, User } from "../types/userTypes";
import "./CalculatorForm.scss";

const user: User = {
  $id: 123,
  username: 'kingCharles',
  userType: "patient",
}

const CalculatorForm = () => {
  // initialization -----------
      const dummyCalcData: CalculationData = {
	    userId: user.$id,
  creatinineLevel: null,
  creatinineUnitId: null,
  creatinineUnit: null,
  userAge: null,
  userEthnicity: null,
  userSex: null,
  eGFR: null
  CKDStageId: null,
  CKDStage: null,
};
  const validation = {
    isValid: {
      creatineLevel: (level: number) => level > 0 && level <= 100
    },
    errorMessage: {
      creatineLevel: 'Creatine level must be positive and cannot exceed 100.',
    },
  };
  // State -------------
  const [displayedContribution, errors, handleChange, handleSubmit] = Form.useForm(
    contribution,
    conformance,
    validation,
    onSubmit
  );
  // Handlers ----------
      const handleCalculate = () => {
	    console.log('handling calculation...')
      }
  // View -----------
  return (
    <Form onSubmit={handleCalculate}>
      <Form.Item label="Creatine Level" error={errors.ContributionCompletionID}>
        <select
          name="ContributionCompletionID"
          value={displayedContribution.ContributionCompletionID}
          onChange={handleChange}
        >
          {isNewContribution && (
            <option key="0" value="0" disabled selected>
              None Selected
            </option>
          )}
          {completion.list.map((completion) => (
            <option key={completion.CompletionID} value={completion.CompletionID}>
              {completion.CompletionName}
            </option>
          ))}
        </select>
    </Form>
  );
};

export default CalculatorForm;
