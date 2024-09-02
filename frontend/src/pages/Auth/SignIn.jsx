import axios from "axios";

import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, CardBody, Form, Spinner } from "react-bootstrap";

import { useAuth } from "../../../AuthContext";
import { signInSchema } from "./validation";
import SubmitButton from "../../components/Button";
import rfpLogo from "../../assets/rfp.png";
import styles from "./Auth.module.css";

const SignIn = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth(); // Get setIsAuthenticated from context
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: "john.doe@example.com",
      password: "password123",
    },
  });

  const handleSignIn = async (data) => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        data
      );

      if (response.status === 200) {
        const { token } = response.data.data;
        localStorage.setItem("authToken", token);
        setIsAuthenticated(true); // Update auth state in context
        // toast.success("Login successful!");
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data.message || "An error occurred. Please try again.";
        toast.error(errorMessage);
      } else if (error.request) {
        toast.error("No response from the server. Please try again later.");
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
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
                type="email"
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
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                {...register("password")}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </Form.Group>

            <SubmitButton
              className="mt-4 w-100"
              type="submit"
              isLoading={isLoading}
              label="Sign in"
              loadingLabel={
                <Spinner
                  style={{
                    fontSize: "10px",
                    color: "white",
                    marginBottom: "-5px",
                  }}
                />
              }
            />

            <div className="text-center mt-4">
              <Link to="/sign-up">Don&apos;t have an account? Join now</Link>
            </div>
            {/* <div className="text-center mt-2">
              <Link to="/forgot-password">Forgot your password?</Link>
            </div> */}
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default SignIn;
