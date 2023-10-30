import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AdminProvider } from "./context/AdminContext";

//Components
import ChangePassword from "./components/ChangePassword";
import CreateCycle from "./components/CreateCycle/CreateCycle";
import EditCycle from "./components/EditCycle";
import LandingPage from "./components/LandingPage";
import Login from "./components/LoginForm";
import OurNavbar from "./components/OurNavbar";
import Overview from "./components/OverviewCycles";
import ResetPassword from "./components/ResetPassword";
import SignUp from "./components/SignUpForm";
import UpdateCycle from "./components/UpdateCycle";

//Screens
import BrowseGroups from "./screens/BrowseGroups";
import CreateGroup from "./screens/CreateGroup";
import MyGroup from "./screens/MyGroup";
import MyGroups from "./screens/MyGroups";
import WelcomeUser from "./screens/WelcomeUser";

import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import { getToken } from "./utils/Token/tokenUtils";

const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function AppRouter() {
  const isLoggedIn = Boolean(getToken());

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
      <Route path="/mygroup/:groupId" element={<MyGroup />} />
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
        <AdminProvider>
          <OurNavbar />
          <AppRouter />
        </AdminProvider>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
