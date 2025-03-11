import { BrowserRouter, Routes, Route } from "react-router-dom";
import { User } from "./types";
import Home from "./screens/Home";
import Layout from "./layouts/Layout";

function App() {
  //return <TestComponent />;
  const loggedInUser: User = { id: 1234, username: "kingCharles" };
  return (
    <BrowserRouter>
      <Layout loggedInUser={loggedInUser}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
