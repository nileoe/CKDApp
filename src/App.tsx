import { BrowserRouter, Routes, Route } from "react-router-dom";
import { User } from "./types";
import Home from "./screens/Home";
import Layout from "./layouts/Layout";
import CalculatorScreen from "./screens/CalculatorScreen";
import PastResultsScreen from "./screens/PastResultsScreen";
import ConsultationNotesScreen from "./screens/ConsultationNotesScreen";
import CDKStagesScreen from "./screens/CDKStagesScreen";

function App() {
  //return <TestComponent />;
  const loggedInUser: User = { id: 1234, username: "kingCharles" };
  return (
    <BrowserRouter>
      <Layout loggedInUser={loggedInUser}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculator" element={<CalculatorScreen />} />
          <Route path="/past_results" element={<PastResultsScreen />} />
          <Route
            path="/consultation_notes"
            element={<ConsultationNotesScreen />}
          />
          <Route path="/CKD_stages" element={<CDKStagesScreen />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
