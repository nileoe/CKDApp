import { useEffect, useState } from "react";
import { getAllUserData } from "../../backend/userActions";
import "./PatientListScreen.scss";
import { formatDate } from "../../utils/DateUtils";
import { getUserCalculations } from "../../backend/calculationActions";

interface UserDoc {
  $id: string;
  name: string;
  userId: string;
  email: string;
  userDOB: string;
  userSex: string;
  userEthnicity: string;
  lastKnownCkdStage: string | null;
  lastKnownCreatinineLevel: number | null;
}

const PatientListScreen = () => {
  const [users, setUsers] = useState<UserDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [calculationsAreLoaded, setCalculationsAreLoaded] =
    useState<boolean>(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await getAllUserData();
        setUsers(res);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const findLastCalculationData = (
    calculations: any[],
    userId: string,
  ): { stage: string | null; cLevel: number | null } => {
    console.log(`user id: ${userId}`);
    const userCalculations = calculations.filter(
      (calc) => calc.userId == userId,
    );
    console.log(`found ${userCalculations.length} calculations for user`);
    let stage = null;
    let cLevel = null;
    if (userCalculations.length !== 0) {
      console.log(`found user calculation array:`);
      console.log(userCalculations);
      (stage = userCalculations[userCalculations.length - 1].ckdStage),
        (cLevel =
          userCalculations[userCalculations.length - 1].creatinineLevel);
    }

    return {
      stage: stage,
      cLevel: cLevel,
    };
  };
  useEffect(() => {
    if (!users.length || calculationsAreLoaded) return;
    const loadUserCalculations = async () => {
      try {
        const calculations = await getUserCalculations("all");
        console.log("users are:");
        console.log(users);
        console.log(`all calculations:`);
        console.log(calculations);
        const updatedUsers = users.map((u) => {
          const { stage, cLevel } = findLastCalculationData(
            calculations,
            u.userId,
          );
          return {
            ...u,
            lastKnownCkdStage: stage,
            lastKnownCreatinineLevel: cLevel,
          };
        });
        setUsers(updatedUsers);
        setCalculationsAreLoaded(true);
      } catch (err) {
        console.error("Failed to fetch calculation:", err);
      }
    };
    loadUserCalculations();
  }, [users, calculationsAreLoaded]);
  const getStageClassName = (stage: string | null): string => {
    if (!stage) return "None";
    switch (stage) {
      case "1":
        return "one";
      case "2":
        return "two";
      case "3A":
        return "threeA";
      case "3B":
        return "threeA";
      case "4":
        return "four";
      case "5":
        return "five";
      default:
        return "None";
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="patientListContainer">
      <h2>Patient List</h2>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="patientGrid">
          {users.map((user) => (
            <div key={user.$id} className="patientCard">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Date of Birth:</strong> {formatDate(user.userDOB)}
              </p>
              <p>
                <strong>Sex:</strong> {user.userSex}
              </p>
              <p>
                <strong>Ethnicity:</strong> {user.userEthnicity}
              </p>
              {user.lastKnownCreatinineLevel ? (
                <div className={getStageClassName(user.lastKnownCkdStage)}>
                  <p>
                    <strong>Last recorded creatinine level:</strong>{" "}
                    {user.lastKnownCreatinineLevel} (stage{" "}
                    {user.lastKnownCkdStage})
                  </p>
                </div>
              ) : (
                <p className="noDataP">No Data</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientListScreen;
