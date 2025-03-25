import { useLocation } from "react-router-dom";
import "./Footer.scss";

function Footer() {
  const location = useLocation();

  const hideFooterRoutes = ["/", "/register"];
  if (hideFooterRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <footer>
      <p className="footerText">©CareMetrics2025</p>
    </footer>
  );
}

export default Footer;
