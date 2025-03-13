import { BrowserRouter, Routes, Route } from "react-router-dom";
import { User } from "./types";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Layout from "./layouts/Layout";
import ProtectedRoute from "./utils/ProtectedRoute";
import Register from "./screens/Register";

function App() {
  //return <TestComponent />;
  const loggedInUser: User = { id: 1234, username: "kingCharles" };
  return (
    <BrowserRouter>
      <Layout loggedInUser={loggedInUser}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
