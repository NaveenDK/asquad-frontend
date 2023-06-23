import React, { useState, useContext } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import { AdminContext } from "./AdminContext";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
const apiUrl = process.env.REACT_APP_API_URL;
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const SignUpForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { setAdminId } = useContext(AdminContext);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const admin = {
      name: name,
      email: email,
      password: password,
      confirmpassword: confirmPassword,
    };

    try {
      const response = await axios.post(`${apiUrl}/admins`, admin);
      const token = response.data.token;

      localStorage.setItem("token", token); //

      const adminId = response.data.adminId; // Assuming the API response contains the adminId
      localStorage.setItem("adminId", adminId);
      setAdminId(adminId);

      navigate("/overview");
    } catch (error) {
      console.error(error);
      setError("Failed to create admin");
    }
  };

  const googleSignup = async (e) => {
    e.preventDefault();
    console.log("signu using google");
  };
  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };
  return (
    <Container>
      <Form className="FormContainer">
        <h3 className="mainTitle">Sign Up</h3>
        {error && <p className="error">{error}</p>}
        <Form.Group className="mb-3" controlId="formName">
          <Form.Control
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
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
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </Form.Group>

        <Button className="fullwidth" variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
        <div className="text-center pt-5">
          {/* <Button id="signInDiv"></Button> */}
          <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        </div>
      </Form>
    </Container>
  );
};

export default SignUpForm;