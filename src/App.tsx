import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/screens/Login";
import Layout from "./components/layouts/Layout";
import Register from "./components/screens/Register";
import ProtectedRoute from "./utils/ProtectedRoute";
import CalculatorScreen from "./components/screens/CalculatorScreen";
import PastResultsScreen from "./components/screens/PastResultsScreen";
import { useEffect } from "react";
import { logout } from "./backend/userActions";

function App() {
  useEffect(() => {
    const checkSession = async () => {
      const sessionFlag = sessionStorage.getItem("isLoggedIn");
      console.log(`printing session storage`);
      console.log(sessionStorage);
      console.log(`printing sessionFlag (isLoggedIn)`);
      console.log(sessionFlag);

      if (!sessionFlag) {
        await logout();
      }
    };
    checkSession();
  }, []);
  //return <TestComponent />;
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
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
