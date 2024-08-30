import { useState } from "react";
import { Card, CardBody, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import SubmitButton from "../../components/button/Button";
import rfpLogo from "../../assets/rfp.png";
import styles from "./Auth.module.css";

// Define validation schema using yup
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const SignIn = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSignIn = async (data) => {
    setIsLoading(true);
  
    try {
      const response = await fetch("https://api.vectorshift.ai/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        if (result.isEmailVerified) {
          localStorage.setItem("authToken", result.token);
          toast.success("Login successful!");
          navigate("/dashboard");
        } else {
          toast.warn("Please verify your email before logging in.");
        }
      } else if (response.status === 401) {
        toast.error("Invalid email or password.");
      } else if (response.status === 403) {
        toast.error("Email not verified.");
      } else {
        toast.error(`Error: ${result.detail}`);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  

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
        className={`shadow p-4 mb-4 mb-md-0 ${styles.noBorderMobile}`}
        style={{ maxWidth: "600px", width: "100%" }}
      >
        <CardBody>
          <h2 className="text-center mb-4">Login</h2>
          <Form onSubmit={handleSubmit(handleSignIn)}>
            <Form.Group controlId="email" className={"mb-4"}>
              <Form.Label>Email:</Form.Label>
              <input
                type="text"
                placeholder="Enter your email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                {...register("email")}
              />
              <div className="invalid-feedback">{errors.email?.message}</div>
            </Form.Group>

            <Form.Group controlId="password" className={"mb-4"}>
              <Form.Label>Password:</Form.Label>
              <input
                type="password"
                placeholder="Enter your password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                {...register("password")}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </Form.Group>

            <SubmitButton
              className="mt-4 w-100"
              type="submit"
              isLoading={isLoading}
              label="Sign In"
            />

            {/* Link to Sign-Up Page */}
            <div className="text-center mt-4">
              <Link to="/sign-up">Don't have an account? Join now</Link>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default SignIn;
