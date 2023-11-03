import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

//Styles
import { Container, Form, Button, Spinner } from "react-bootstrap";

//Custom hook
import { useAdminContext } from "../../hooks/useAdminContext";

//Services
import { loginGoogleService } from "../../services/googleServices";
import { postLoginAdminData } from "../../services/adminServices";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { setAdminId } = useAdminContext();

  const login = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      const res = await loginGoogleService(credentialResponse);

      const token = res.data.token;
      const adminId = res.data.adminId; // Assuming the API response contains the adminId

      localStorage.setItem("token", token);
      localStorage.setItem("adminId", adminId);

      setAdminId(adminId);
      navigate("/userwelcome");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const admin = {
      email: email,
      password: password,
    };

    try {
      const response = await postLoginAdminData(admin);

      const token = response.data.token;
      const adminId = response.data.adminId; // Assuming the API response contains the adminId

      localStorage.setItem("token", token);
      localStorage.setItem("adminId", adminId);
      setAdminId(adminId);

      navigate("/overview");
    } catch (error) {
      setError("Oops, Please check your credentials ");
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate("/reset");
  };

  return (
    <>
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
              {error && <div className="error-message">{error}</div>}
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
                <p onClick={handleForgotPassword}>Forgot Password?</p>
              </div>
              <div className="divider">
                <span className="line-grey"> </span> or
                <span className="line-grey"> </span>
              </div>
            </Form>
            <div className="googleBtn" onClick={login}>
              Continue with Google
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default LoginForm;
