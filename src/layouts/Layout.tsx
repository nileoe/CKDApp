import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { User } from "../types.js";
//import { useAuth } from "../auth/useAuth";
import "./Layout.scss";

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
