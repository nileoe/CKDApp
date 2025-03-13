import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.scss";
//import { useAuth } from '../auth/useAuth';
//
function Navbar() {
  //const { loggedInUser } = useAuth();
  const loggedInUserIsAdmin = false; // TODO placeholder
  // activeClassName = the current URL matches the one in 'exact'
  return (
    <nav>
      <div className="navStart">
        <div className="navItem">
          <NavLink to="/calculator">Calculator</NavLink>
        </div>
        <div className="navItem">
          <NavLink to="/past_results">Past Results</NavLink>
        </div>
        <div className="navItem">
          <NavLink to="/consultation_notes">Consultation Notes</NavLink>
        </div>
        <div className="navItem">
          <NavLink to="/CKD_stages">CKD Stages</NavLink>
        </div>
      </div>

      <div className="navEnd">
        <div className="navItem">
          <NavLink to="/account">
            <FontAwesomeIcon icon={faUser} />
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
