import { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
const apiUrl = process.env.REACT_APP_API_URL;

const ChangePassword = ({ handleResetPassword }) => {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);
  const { id, token } = useParams();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      setSending(true);
      const response = await axios.post(`${apiUrl}/admins/${id}/${token}`, {
        password,
      });
      console.log(response.data);
      setSending(false);
      setSuccessMsg(true);

      // Handle success, display a notification or redirect the user
    } catch (error) {
      console.error(error);
      setSending(false);
      // Handle error, display an error message or alert the user
    }
  };
  const navigateToLogin = () => {
    // 👇️ navigate to /contacts
    navigate("/login");
  };
  return (
    <Container fluid fill>
      <div className="container-wrapper align-items-center">
        <div className="signup-wrapper">
          <Form className="FormContainer">
            <img
              src={process.env.PUBLIC_URL + "/img/logo-asquad.png"}
              alt="Logo"
            />
            <div className="tagline">
              <p>Accountability made easy.</p>
            </div>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                className="form-rounded"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Form.Group>
            <Form.Group
              className="mb-3 confirmPassword"
              controlId="formBasicPassword2"
            >
              <Form.Control
                className="form-rounded"
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </Form.Group>
            {error && <p className="error-message">{error}</p>}
            <Button
              className="fullwidth"
              variant="primary"
              onClick={handleSubmit}
            >
              Change Password
            </Button>
          </Form>
          {successMsg && (
            <Alert
              variant="success"
              className="changepwdtxt"
              onClick={navigateToLogin}
            >
              Password Change successful Click here to Login
            </Alert>
          )}
        </div>
      </div>
    </Container>
  );
};

export default ChangePassword;
