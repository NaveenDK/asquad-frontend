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
import { GoogleLogin } from "@react-oauth/google";
import Login from "./components/LoginForm";
import LandingNav from "./components/LandingNav";
import LandingPage from "./components/LandingPage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
  Redirect,
  Navigate,
} from "react-router-dom";
const googleClientId = process.env.GOOGLE_CLIENT_ID;
function AppRouter() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  function handleCallbackResponse(response) {
    console.log("encoded JWT ID token: " + response.credential);
  }

  useEffect(() => {
    /* global google*/
    // google.accounts.id.initialize({
    //   client_id: { googleClientId },
    //   callback: handleCallbackResponse,
    // });

    // google.accounts.id.renderButton(document.getElementById("signInDiv"), {
    //   theme: "outline",
    //   size: "large",
    // });

    // gapi.auth2
    //   .init({
    //     client_id: { googleClientId },
    //     scope: "profile email",
    //   })
    //   .then(function (authInstance) {
    //     /* GoogleAuth object is now initialized and ready to be used */
    //   });
    if (location.pathname === "/" && !isLoggedIn) {
      navigate("/");
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
            <Navigate to="/" replace />
          )
        }
      />
      <Route path="/" element={<LandingPage />} />
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