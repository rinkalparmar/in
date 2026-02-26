import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Users from "./components/Users";
import Sidebar from "./components/Sidebar";
import Welcome from "./components/Welcome";
import Home from "./components/Home";
import About from "./components/About";
import PrivateRoutes from "./components/PrivateRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<PrivateRoutes />}>
          <Route element={<Sidebar />}>
            <Route path="/users" element={<Users />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
