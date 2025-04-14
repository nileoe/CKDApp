import { useEffect, useState } from "react";
import { getCurrentUser } from "../../backend/userActions";

const PatientListScreen = () => {
  // initialization -----------
  // State -------------
  // Handlers ----------
  // View -----------
  const [loggedInUser, setLoggedInUser] = useState<null | any>(null);
  useEffect(() => {
    const fetchUser = async () => {
      setLoggedInUser(await getCurrentUser());
    };
    fetchUser();
  }, []);
  return (
    <>
      <p>yo patients</p>
      <button
        onClick={() => console.log(JSON.stringify(loggedInUser, null, 4))}
      >
        Log User
      </button>
    </>
  );
};

export default PatientListScreen;
