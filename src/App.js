import logo from "./logo.svg";
import "./App.css";
import Overview from "./components/Overview";
import OurNavbar from "./components/OurNavbar";
import EditCycle from "./components/EditCycle";
import ReviewCycle from "./components/ReviewCycle";
import CreateCycle from "./components/CreateCycle";
import UpdateCycle from "./components/UpdateCycle";
import { AdminProvider } from "./components/AdminContext";
import SignUp from "./components/SignUpForm";
import Login from "./components/LoginForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      {/* <OurNavbar /> */}
      <AdminProvider>
        <OurNavbar />
        <Routes>
          <Route path="/overview" element={<Overview />} />

          <Route path="edit/" element={<EditCycle />} />
          <Route path="review/:cycleId" element={<EditCycle />} />
          <Route path="create" element={<CreateCycle />} />
          <Route path="update/:cycleId" element={<UpdateCycle />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </AdminProvider>
    </Router>
  );
}

export default App;
