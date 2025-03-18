//import { User } from "../types";
import "./Header.scss";

//type HeaderProps = {
//  loggedInUser?: User;
//};

//function Header({ loggedInUser }: HeaderProps) {
const Header = () => {
  // initialization -----------
  // State -------------
  // Handlers ----------
  // View -----------
  //const welcomeString: string = loggedInUser
  //  ? `Welcome user ${loggedInUser.username}`
  //  : "Welcome unknown user";
  return (
    <header>
      <h1 style={{ fontFamily: "'TT Barrels DemiBold', sans-serif" }}>
        CKD Calculator
      </h1>
    </header>
  );
};

export default Header;
