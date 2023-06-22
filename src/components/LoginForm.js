import { useState, useContext } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { AdminContext } from "./AdminContext";
import Button from "react-bootstrap/Button";
import MainLayout from "./MainLayout";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { setAdminId } = useContext(AdminContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(email, password);
    setLoading(true);
    const admin = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(`${apiUrl}/admins/login`, admin);
      const token = response.data.token;

      localStorage.setItem("token", token); //

      const adminId = response.data.adminId; // Assuming the API response contains the adminId
      localStorage.setItem("adminId", adminId);
      setAdminId(adminId);

      navigate("/overview");
    } catch (error) {
      console.error(error);
      setError("Oops, Please check your credentials ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Form className="FormContainer">
        <h3 className="mainTitle">Login</h3>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            vlue={email}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Form.Group>
        {error && <div className="error-message">{error}</div>}{" "}
        {/* Display error message if it exists */}
        <Button
          className="fullwidth"
          variant="primary"
          onClick={handleSubmit}
          disabled={loading} // Disable the button while loading
        >
          {loading ? (
            <>
              <Spinner animation="border" size="sm" /> Loading...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </Form>
    </Container>
  );
};

export default LoginForm;
