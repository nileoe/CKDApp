import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import Layout from "./layouts/Layout";
import Register from "./screens/Register";
import ProtectedRoute from "./utils/ProtectedRoute";
import CalculatorScreen from "./screens/CalculatorScreen";
import PastResultsScreen from "./screens/PastResultsScreen";

function App() {
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
