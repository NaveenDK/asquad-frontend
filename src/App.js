import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";

import Overview from "./components/Overview";
import WelcomeUser from "./screens/WelcomeUser";
import OurNavbar from "./components/OurNavbar";
import EditCycle from "./components/EditCycle";
import CreateCycle from "./components/CreateCycle";
import UpdateCycle from "./components/UpdateCycle";
import { AdminProvider } from "./components/AdminContext";
import { UserProvider } from "./components/UserContext";
import { createBrowserHistory } from "history";
import SignUp from "./components/SignUpForm";
import { GoogleLogin } from "@react-oauth/google";
import Login from "./components/LoginForm";
import LandingNav from "./components/LandingNav";
import LandingPage from "./components/LandingPage";
import ResetPassword from "./components/ResetPassword";
import BrowseGroups from "./screens/BrowseGroups";
import ChangePassword from "./components/ChangePassword";
import { GoogleOAuthProvider } from "@react-oauth/google";
import CreateGroup from "./screens/CreateGroup";
import MyGroups from "./screens/MyGroups";
import MyGroup from "./screens/MyGroup";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
  Redirect,
  Navigate,
} from "react-router-dom";
import GroupDetails from "./screens/GroupDetails";
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
function AppRouter() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  function handleCallbackResponse(response) {
    console.log("encoded JWT ID token: " + response.credential);
  }

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          isLoggedIn ? (
            <Navigate to="/userwelcome" replace />
          ) : (
            <Navigate to="/welcome" replace />
          )
        }
      />
      <Route path="/welcome" element={<LandingPage />} />
      <Route path="/creategroup" element={<CreateGroup />} />
      <Route path="/browsegroups" element={<BrowseGroups />} />
      <Route path="/mygroups" element={<MyGroups />} />
      <Route path="/overview" element={<Overview />} />
      <Route path="/userwelcome" element={<WelcomeUser />} />
      <Route path="/edit/" element={<EditCycle />} />
      <Route path="/review/:cycleId" element={<EditCycle />} />
      <Route path="/mygroups/:groupId" element={<MyGroup />} />
      <Route path="/browsegroups/:groupId" element={<GroupDetails />} />
      <Route path="/create" element={<CreateCycle />} />
      <Route path="/update/:cycleId" element={<UpdateCycle />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reset" element={<ResetPassword />} />
      <Route path="/changepwd/:id/:token" element={<ChangePassword />} />
    </Routes>
  );
}

function App() {
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <Router>
        <UserProvider>
          <OurNavbar />
          <AppRouter />
        </UserProvider>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
