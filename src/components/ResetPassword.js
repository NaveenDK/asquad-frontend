import { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
const apiUrl = process.env.REACT_APP_API_URL;

const ResetPassword = ({ handleResetPassword }) => {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSending(true);
      const response = await axios.post(`${apiUrl}/admins/sendpasswordlink`, {
        email,
      });
      console.log(response.data);
      setSending(false);
      setEmailSent(true);
      // Handle success, display a notification or redirect the user
    } catch (error) {
      console.error(error);
      setSending(false);
      // Handle error, display an error message or alert the user
    }
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
            <Form.Group controlId="formEmail">
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Button
              className="fullwidth"
              variant="primary"
              onClick={handleSubmit}
              disabled={sending}
            >
              {sending ? "Sending..." : "Reset"}
            </Button>
            {emailSent && (
              <Alert variant="success" className="changepwdtxt">
                Email sent succesfully, if you do not see the email in few
                minutes, check your 'junk' mail folder or 'spam' folder
              </Alert>
            )}
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default ResetPassword;
