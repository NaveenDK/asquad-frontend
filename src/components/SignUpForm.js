import React, { useState, useContext } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import { AdminContext } from "./AdminContext";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import googleOneTap from "google-one-tap";
const apiUrl = process.env.REACT_APP_API_URL;
const client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const SignUpForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { setAdminId } = useContext(AdminContext);

  function handleGoogle() {
    const options = {
      client_id: client_id,
    };
    googleOneTap(options, (response) => {
      // Send response to server
      console.log("googleonetap-triggered");
      console.log(response);
    });
    console.log("handle google");
  }
  // try {
  //   googleOneTap(options, async (response) => {
  //     console.log(response);
  //     console.log("google one tap 2");
  //     try {
  //       const res = await axios.post(
  //         "http://localhost:5000/admins/google-login",
  //         {
  //           token: response.credentials,
  //         }
  //       );
  //       const data = res.data;
  //       console.log("Data:", data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   });
  // } catch (error) {
  //   console.log("error encountered on googleonetap..." + error);
  // }

  // console.log("Data " + data)
  //};

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
      if (error.response && error.response.data && error.response.data.msg) {
        setError(error.response.data.msg);
      }
      // console.log("error.response.data.errors: ");
      // console.log(error.response.data.errors[0].msg);
      setError(error.response.data.errors[0].msg);
    }
  };

  return (
    <>
      <Helmet>
        <title>Signup </title>
        <meta name="description" content="Asquad - accountability made easy" />
      </Helmet>
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
              <div className="google-auth"></div>
              {/* <div className="line-breaker">
              <p>
                <span>or</span>
              </p>
            </div> */}
              <Form.Group className="mb-3" controlId="formName">
                <Form.Control
                  className="form-rounded"
                  type="text"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Control
                  className="form-rounded"
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </Form.Group>
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
                Sign Up
              </Button>
              or
            </Form>
            <Button onClick={handleGoogle}>Google Sign Up</Button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SignUpForm;
