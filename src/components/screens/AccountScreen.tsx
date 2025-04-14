import { useEffect, useState } from "react";
import { getCurrentUser } from "../../backend/userActions";
import AccountView from "../entity/AccountView";

const AccountScreen = () => {
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
      {loggedInUser ? (
        <AccountView account={loggedInUser} />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default AccountScreen;
