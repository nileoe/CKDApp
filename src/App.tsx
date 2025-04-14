import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/screens/Login";
import Layout from "./components/layouts/Layout";
import Register from "./components/screens/Register";
import ProtectedRoute from "./utils/ProtectedRoute";
import CalculatorScreen from "./components/screens/CalculatorScreen";
import PastResultsScreen from "./components/screens/PastResultsScreen";
import { useEffect } from "react";
import { logout } from "./backend/userActions";
import PediatricCalculatorScreen from "./components/screens/PediatricCalculatorScreen";
import PatientListScreen from "./components/screens/PatientListScreen";
import AccountScreen from "./components/screens/AccountScreen";

function App() {
  useEffect(() => {
    const checkSession = async () => {
      const sessionFlag = sessionStorage.getItem("isLoggedIn");
      if (!sessionFlag) {
        await logout();
      }
    };
    checkSession();
  }, []);
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/calculator"
            element={
              <ProtectedRoute>
                <CalculatorScreen />
              </ProtectedRoute>
            }
          />
          <Route path="/past_results" element={<PastResultsScreen />} />
          <Route
            path="/pediatric_calculator"
            element={<PediatricCalculatorScreen />}
          />
          <Route path="/patients" element={<PatientListScreen />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <AccountScreen />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
