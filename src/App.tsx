import { BrowserRouter, Routes, Route } from "react-router-dom";
import { User } from "./types";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Layout from "./layouts/Layout";


function App() {
  //return <TestComponent />;
  const loggedInUser: User = { id: 1234, username: "kingCharles" };
  return (
    <BrowserRouter>
      <Layout loggedInUser={loggedInUser}>
        <Routes>

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
