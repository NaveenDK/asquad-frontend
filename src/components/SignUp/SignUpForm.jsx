import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { Helmet } from "react-helmet-async";

//Styles
import { Button, Container, Form } from "react-bootstrap";

//Custom hook
import { useAdminContext } from "../../hooks/useAdminContext";

//Services
import { signUpGoogleService } from "../../services/googleServices";
import { postSignUpAdminData } from "../../services/adminServices";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { setAdminId } = useAdminContext();

  const signUp = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      try {
        const res = await signUpGoogleService(credentialResponse);

        const token = res.data.token;
        const adminId = res.data.adminId;

        localStorage.setItem("token", token);
        localStorage.setItem("adminId", adminId);
        setAdminId(adminId);
        navigate("/overview");
      } catch (error) {
        error.response.data.message && setError(error.response.data.message);
      }
    },
  });

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
      const response = await postSignUpAdminData(admin);

      const token = response.data.token;
      const adminId = response.data.adminId; // Assuming the API response contains the adminId

      localStorage.setItem("token", token); //
      localStorage.setItem("adminId", adminId);
      setAdminId(adminId);

      navigate("/userwelcome");
    } catch (error) {
      error.response.data.msg && setError(error.response.data.msg);
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
                Sign Up !
              </Button>
              <div className="divider">
                <span className="line-grey"> </span> or
                <span className="line-grey"> </span>{" "}
              </div>
            </Form>
            <div className="googleBtn" onClick={signUp}>
              Continue with Google
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SignUpForm;
