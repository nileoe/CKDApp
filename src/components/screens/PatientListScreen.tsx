import { useEffect, useState } from "react";
import { getAllUserData } from "../../backend/userActions";
import "./PatientListScreen.scss";

interface UserDoc {
  $id: string;
  name: string;
  email: string;
  userDOB: string;
  userSex: string;
  userEthnicity: string;
}

const PatientListScreen = () => {
  const [users, setUsers] = useState<UserDoc[]>([]);
  const [loading, setLoading] = useState(true);

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
                <strong>Date of Birth:</strong> {user.userDOB}
              </p>
              <p>
                <strong>Sex:</strong> {user.userSex}
              </p>
              <p>
                <strong>Ethnicity:</strong> {user.userEthnicity}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientListScreen;
