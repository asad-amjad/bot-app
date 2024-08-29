import { Card, CardBody, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../../components/button/Button";
import rfpLogo from "../../assets/rfp.png";
import styles from "./Sign-In.module.css"; // Import the CSS module

const SignIn = () => {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-5"
      style={{ minHeight: "84vh" }}
    >
      <img
        src={rfpLogo}
        alt="RFP logo"
        className="img-fluid p-4"
        style={{ maxWidth: "100%", maxHeight: "300px" }}
      />
      <Card
        className={`shadow p-4 mb-4 mb-md-0 ${styles.noBorderMobile}`} // Use the CSS module class
        style={{ maxWidth: "450px", width: "100%" }}
      >
        <CardBody>
          <h2 className="text-center mb-4">Login</h2>
          <Form>
            <Form.Group controlId="email" className={"mb-4"}>
              <Form.Label>Email:</Form.Label>
              <input
                type="text"
                placeholder="Enter your email"
                className="form-control"
              />
            </Form.Group>

            <Form.Group controlId="password" className={"mb-4"}>
              <Form.Label>Password:</Form.Label>
              <input
                type="password"
                placeholder="Enter your password"
                className="form-control"
              />
            </Form.Group>

            <SubmitButton
              className="mt-4 w-100"
              onClick={() => navigate("/dashboard")}
              isLoading={false}
              label="Sign in"
            />
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default SignIn;
