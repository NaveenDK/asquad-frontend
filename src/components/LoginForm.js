import { useState, useContext } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { UserContext } from "./UserContext";
import Button from "react-bootstrap/Button";
import MainLayout from "./MainLayout";
import Spinner from "react-bootstrap/Spinner";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
const apiUrl = process.env.REACT_APP_API_URL;

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { setUserId } = useContext(UserContext);

  const login = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      try {
        const res = await axios.post(
          `${apiUrl}/users/google-login-custom-btn`,
          {
            response: credentialResponse,
          }
        );
        //    console.log("responsse:: ");
        const token = res.data.token;
        //  console.log(JSON.stringify(res.data));
        localStorage.setItem("token", token); //
        const userId = res.data.userId; // Assuming the API response contains the adminId
        localStorage.setItem("userId", userId);
        setUserId(userId);

        navigate("/userwelcome");
      } catch (error) {
        console.log("We are facing this error: " + error);
        console.log("We are facing this error: " + error.response);
        console.log(
          "error.response.data.message" +
            JSON.stringify(error.response.data.message)
        );
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setError(error.response.data.message);
        }
      }
    },
  });

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

      const userId = response.data.userId; // Assuming the API response contains the adminId
      localStorage.setItem("userId", userId);
      setUserId(userId);

      navigate("/userwelcome");
    } catch (error) {
      console.error(error);
      setError("Oops, Please check your credentials ");
    } finally {
      setLoading(false);
    }
  };
  const handleForgotPassword = () => {
    navigate("/reset");
  };
  return (
    <>
      {" "}
      <Helmet>
        <title>Login </title>
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
                  "Sign in"
                )}
              </Button>
              <div className="fpwd pt-2 text-center tagline">
                <p onClick={handleForgotPassword}> Forgot Password?</p>
              </div>
              <div className="divider">
                {" "}
                <span className="line-grey"> </span> or
                <span className="line-grey"> </span>{" "}
              </div>
            </Form>
            <div className="googleBtn" onClick={() => login()}>
              Continue with Google
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default LoginForm;
