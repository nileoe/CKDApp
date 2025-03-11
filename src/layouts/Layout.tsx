import Header from "./Header";
//import Navbar from "./Navbar";
import Footer from "./Footer";
import { User } from "../types.js";
//import { useAuth } from "../auth/useAuth";
//import "./Layout.scss";

type LayoutProps = {
  loggedInUser?: User;
  children?: React.ReactNode;
};

//<Navbar />
function Layout({ loggedInUser, children }: LayoutProps) {
  //const { loggedInUser } = useAuth();
  return (
    <div className="layout">
      <Header />
      <main>{children}</main>

      <Footer />
    </div>
  );
}

export default Layout;
