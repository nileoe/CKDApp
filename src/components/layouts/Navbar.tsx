import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faGear,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.scss";
import { logout } from "../../backend/userActions";
//import { useAuth } from '../auth/useAuth';
//
function Navbar() {
  const loggedInUserIsAdmin = true; // TODO placeholder
  return (
    <nav>
      <div className="navArea">
        <NavLink to="/calculator" className="navItem leftItem">
          Calculator
        </NavLink>

        {!loggedInUserIsAdmin ? (
          <>
            <NavLink to="/pediatric_calculator" className="navItem leftItem">
              Pediatric Calculator
            </NavLink>
            <NavLink to="/past_results" className="navItem leftItem">
              Past Results
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/patients" className="navItem leftItem">
              My Patients
            </NavLink>
          </>
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
