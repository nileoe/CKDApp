import { logout } from "../../backend/userActions";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // initialization -----------
  const navigate = useNavigate();
  // State -------------
  // Handlers ----------
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  // View -----------
  return (
    <>
      <div>
        <h1>Welcome to the Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
};

export default Home;
