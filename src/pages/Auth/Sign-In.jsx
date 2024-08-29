import { Card, CardBody, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../../components/button/Button";

const SignIn = () => {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "84vh" }}
    >
      <Card
        className={` shadow p-4`}
        style={{ maxWidth: "450px", width: "100%" }}
      >
        <CardBody>
          <h2 className="text-center mb-4">Login</h2>
          <Form>
            <Form.Group controlId="email" className={"mb-4"}>
              <Form.Label>Email:</Form.Label>
              <input type="text" placeholder="Enter your email" />
            </Form.Group>

            <Form.Group controlId="password" className={"mb-4"}>
              <Form.Label>Password:</Form.Label>
              <input type="password" placeholder="Enter your password" />
            </Form.Group>

            <SubmitButton
              className="mt-4"
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
