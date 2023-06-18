import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";

import Overview from "./components/Overview";
import OurNavbar from "./components/OurNavbar";
import EditCycle from "./components/EditCycle";
import CreateCycle from "./components/CreateCycle";
import UpdateCycle from "./components/UpdateCycle";
import { AdminProvider } from "./components/AdminContext";
import { createBrowserHistory } from "history";
import SignUp from "./components/SignUpForm";
import Login from "./components/LoginForm";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
  Redirect,
  Navigate,
} from "react-router-dom";

function AppRouter() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  useEffect(() => {
    if (location.pathname === "/" && !isLoggedIn) {
      navigate("/login");
    } else if (location.pathname === "/" && isLoggedIn) {
      navigate("/overview");
    } else if (location.pathname === "/overview" && !isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, location.pathname, navigate]);

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          isLoggedIn ? (
            <Navigate to="/overview" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="/overview" element={<Overview />} />
      <Route path="/edit/" element={<EditCycle />} />
      <Route path="/review/:cycleId" element={<EditCycle />} />
      <Route path="/create" element={<CreateCycle />} />
      <Route path="/update/:cycleId" element={<UpdateCycle />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AdminProvider>
        <OurNavbar />
        <AppRouter />
      </AdminProvider>
    </Router>
  );
}

export default App;
