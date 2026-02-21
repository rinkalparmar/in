import { Route, Routes } from "react-router-dom";
import "./App.css";
// import Signup from "./components/Signup";
// import Login from "./components/Login";
// import Sidebar from "./components/Sidebar";
// import PrivateRoutes from "./components/PrivateRoutes";
// import Users from "./components/Users";
// import Dashboard from "./components/Dashboard";
import Signup1 from "./reduxcomponents/Signup1";
import PrivateRoutes1 from "./reduxcomponents/PrivateRoutes1";
import Sidebar1 from "./reduxcomponents/Sidebar1";
import Users1 from "./reduxcomponents/Users1";
import Dashboard1 from "./reduxcomponents/Dashboard1";
import Login1 from "./reduxcomponents/Login1";

function App() {
  return (
    <>
      {/* <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<PrivateRoutes />}>
          <Route element={<Sidebar />}>
            <Route path="/users" element={<Users />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes> */}
      <Routes>
        <Route path="/" element={<Login1 />} />
        <Route path="/signup" element={<Signup1 />} />
        <Route element={<PrivateRoutes1 />}>
          <Route element={<Sidebar1 />}>
            <Route path="/users" element={<Users1 />} />
            <Route path="/dashboard" element={<Dashboard1 />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
