import { NavLink } from "react-router-dom";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faUser } from '@fortawesome/free-solid-svg-icons';
//import './Navbar.scss';
//import { useAuth } from '../auth/useAuth';
//
function Navbar() {
  //const { loggedInUser } = useAuth();
  const loggedInUserIsAdmin = false; // TODO placeholder
  // activeClassName = the current URL matches the one in 'exact'
  return (
    <nav>
      <NavLink to="/calculator">Calculator</NavLink>
      <NavLink to="/past_results">Past Results</NavLink>
      <NavLink to="/consultation_notes">Consultation Notes</NavLink>
      <NavLink to="/CKD_stages">CKD Stages</NavLink>
    </nav>
  );
}

export default Navbar;
//
//// //lino
//// <>
//// <nav>
////   <div className="navItem">
////     <NavLink exact to="/" activeClassName="active">
////       Home
////     </NavLink>
////   </div>
////   {!loggedInUser ? (
////     <div className="navItem" id="logIn">
////       <NavLink to="/login" activeClassName="active">
////         Login
////       </NavLink>
////     </div>
////   ) : (
////     <div className="navItem" id="acc">
////       <NavLink to="/account" activeClassName="active">
////         <FontAwesomeIcon icon={faUser} />
////       </NavLink>
////     </div>
////   )}
////   {loggedInUserIsAdmin ? (
////     <div className="navItem">
////       <NavLink exact to="/modules" activeClassName="active">
////         Modules
////       </NavLink>
////     </div>
////   ) : null}
////   {loggedInUser && !loggedInUserIsAdmin && (
////     <div className="navItem">
////       <NavLink to="/projects" activeClassName="active">
////         Projects
////       </NavLink>
////     </div>
////   )}
//// </nav>
//// </>
//
//// //OLD
////      <nav>
////        <div className="navItem">
////          <NavLink exact to="/" activeClassName="active">
////            Home
////          </NavLink>
////        </div>
////
////        <div className="navItem">
////          <NavLink exact to="/modules" activeClassName="active">
////            Modules
////          </NavLink>
////        </div>
////
////        {loggedInUser && (
////          <div className="navItem">
////            <NavLink to="/projects" activeClassName="active">
////              Projects
////            </NavLink>
////          </div>
////        )}
////
////        {loggedInUser && (
////          <div className="navItem">
////            <NavLink exact to="/pie" activeClassName="active">
////              Graphs
////            </NavLink>
////          </div>
////        )}
////
////        {/* this will be later implemented with admin only can see this  */}
////        {loggedInUser && (
////          <div className="navItem">
////            <NavLink exact to="/Overview" activeClassName="active">
////              Overview
////            </NavLink>
////          </div>
////        )}
////
////        {!loggedInUser ? (
////          <div className="navItem" id="logIn">
////            <NavLink to="/login" activeClassName="active">
////              <FontAwesomeIcon icon={faUser} />
////            </NavLink>
////          </div>
////        ) : (
////          <div className="navItem" id="acc">
////            <NavLink to="/account" activeClassName="active">
////              <FontAwesomeIcon icon={faUser} />
////            </NavLink>
////          </div>
////        )}
////      </nav>
////    </>
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////return (
////    <>
////      <nav>
////        <div className="navItem">
////          <NavLink exact to="/" activeClassName="active">
////            Home
////          </NavLink>
////        </div>
////	{ !loggedInUser?
////	      (
////		<div className="navItem" id="logIn">
////		  <NavLink to="/login" activeClassName="active">
////		    <FontAwesomeIcon icon={faUser} />
////		  </NavLink>
////		</div>
////	      ) :
////	      (
////		<div className="navItem" id="acc">
////		  <NavLink to="/account" activeClassName="active">
////		    <FontAwesomeIcon icon={faUser} />
////		  </NavLink>
////		</div>
////		    loggedInUserIsAdmin? (
////
////		    <div className="navItem">
////		      <NavLink exact to="/modules" activeClassName="active">
////			Modules
////		      </NavLink>
////		    </div>
////		    ) :
////		    (
////		      <div className="navItem">
////			<NavLink to="/projects" activeClassName="active">
////			  Projects
////			</NavLink>
////		      </div>
////		    )
////	      ) }
////      </nav>
////  );
