import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.scss";
import { logout } from "../../backend/userActions";
import { account } from "../../backend/appwriteConfig";
import { useEffect, useState } from "react";
//import { useAuth } from '../auth/useAuth';
//
function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await account.get();
        setUser(userData);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, []);

  const isAdmin = user?.prefs?.role?.toLowerCase() === "admin";

  return (
    <nav>
      <div className="navArea">
        <NavLink to="/calculator" className="navItem leftItem">
          Calculator
        </NavLink>
        <NavLink to="/pediatric_calculator" className="navItem leftItem">
          Pediatric Calculator
        </NavLink>
        <NavLink to="/past_results" className="navItem leftItem">
          Past Results
        </NavLink>
        <NavLink to="/pediatric_results" className="navItem leftItem">
          Pediatric Results
        </NavLink>

        {isAdmin && (
          <NavLink to="/patients" className="navItem leftItem">
            My Patients
          </NavLink>
        )}
      </div>

      <div className="navArea">
        <NavLink to="/" onClick={logout} className="navItem rightItem">
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </NavLink>
        <NavLink to="/account" className="navItem rightItem">
          <FontAwesomeIcon icon={faUser} />
        </NavLink>
      </div>
    </nav>
  );
}

//<NavLink to="/settings" className="navItem rightItem">
//  <FontAwesomeIcon icon={faGear} />
//</NavLink>
//<nav>
//  <div className="navArea">
//    <div className="navItem leftItem">
//      <NavLink to="/calculator">Calculator</NavLink>
//    </div>
//    <div className="navItem leftItem">
//      <NavLink to="/past_results">Past Results</NavLink>
//    </div>
//    <div className="navItem leftItem">
//      <NavLink to="/consultation_notes">Consultation Notes</NavLink>
//    </div>
//    <div className="navItem leftItem">
//      <NavLink to="/CKD_stages">CKD Stages</NavLink>
//    </div>
//  </div>
//
//  <div className="navArea">
//    <div className="navItem rightItem">
//      <NavLink to="/account">
//        <FontAwesomeIcon icon={faArrowRightFromBracket} />
//      </NavLink>
//    </div>
//    <div className="navItem rightItem">
//      <NavLink to="/account">
//        <FontAwesomeIcon icon={faUser} />
//      </NavLink>
//    </div>
//    <div className="navItem rightItem">
//      <NavLink to="/account">
//        <FontAwesomeIcon icon={faGear} />
//      </NavLink>
//    </div>
//  </div>
//</nav>

export default Navbar;
