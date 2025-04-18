import { useLocation } from "react-router-dom";
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";
import "./Layout.scss";
import { User } from "../../types/UserTypes.js";

type LayoutProps = {
  loggedInUser?: User;
  children?: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const hideNavbarRoutes = ["/", "/register"];

  return (
    <div className="layout">
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <main>{children}</main>

      <Footer />
    </div>
  );
}

export default Layout;
