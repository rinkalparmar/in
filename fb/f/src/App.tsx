import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/SIgnup";
import Sidebar from "./components/Sidebar";
import Privateroute from "./components/Privateroute";
import Dashboard from "./components/Dashboard";
import Cards from "./components/Cards";
import Users from "./components/Users";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route element={<Privateroute />}>
          <Route element={<Sidebar />}>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/cards" element={<Cards />}></Route>
            <Route path="/users" element={<Users />}></Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
