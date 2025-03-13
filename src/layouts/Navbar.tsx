import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faGear,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.scss";
//import { useAuth } from '../auth/useAuth';
//
function Navbar() {
  //const { loggedInUser } = useAuth();
  const loggedInUserIsAdmin = false; // TODO placeholder
  // activeClassName = the current URL matches the one in 'exact'
  return (
    <nav>
      <div className="navArea">
        <NavLink to="/calculator" className="navItem leftItem">
          Calculator
        </NavLink>
        <NavLink to="/past_results" className="navItem leftItem">
          Past Results
        </NavLink>
        <NavLink to="/consultation_notes" className="navItem leftItem">
          Consultation Notes
        </NavLink>
        <NavLink to="/CKD_stages" className="navItem leftItem">
          CKD Stages
        </NavLink>
      </div>

      <div className="navArea">
        <NavLink to="/signout" className="navItem rightItem">
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </NavLink>
        <NavLink to="/account" className="navItem rightItem">
          <FontAwesomeIcon icon={faUser} />
        </NavLink>
        <NavLink to="/settings" className="navItem rightItem">
          <FontAwesomeIcon icon={faGear} />
        </NavLink>
      </div>
    </nav>
  );
}

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
