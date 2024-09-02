import axios from "axios";

import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, CardBody, Col, Form, Row, Spinner } from "react-bootstrap";

import { signUpSchema } from "./validation";
import SubmitButton from "../../components/Button";
import rfpLogo from "../../assets/rfp.png";
import styles from "./Auth.module.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
    // defaultValues: {
    //   firstName: "John",
    //   lastName: "Doe",
    //   email: "john.doe@example.com",
    //   mobileNumber: "1234567890",
    //   username: "johndoe",
    //   password: "password123",
    // },
  });

  const handleSignUp = async (data) => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
        data
      );

      if (response.status === 201) {
        toast.success(
          response?.data?.message || "Account created successfully!"
        );
        navigate("/sign-in"); // Redirect to login page
      } else {
        toast.error(response?.data?.message || "An error occurred");
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(
        error?.response?.data?.message || "An unexpected error occurred"
      );
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
          <h2 className="text-center mb-4">Sign Up</h2>
          <Form onSubmit={handleSubmit(handleSignUp)}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="firstName" className={"mb-4"}>
                  <Form.Label>First Name:</Form.Label>
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    className={`form-control ${
                      errors.firstName ? "is-invalid" : ""
                    }`}
                    {...register("firstName")}
                  />
                  <div className="invalid-feedback">
                    {errors.firstName?.message}
                  </div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="lastName" className={"mb-4"}>
                  <Form.Label>Last Name:</Form.Label>
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    className={`form-control ${
                      errors.lastName ? "is-invalid" : ""
                    }`}
                    {...register("lastName")}
                  />
                  <div className="invalid-feedback">
                    {errors.lastName?.message}
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="email" className={"mb-4"}>
                  <Form.Label>Email:</Form.Label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    {...register("email")}
                  />
                  <div className="invalid-feedback">
                    {errors.email?.message}
                  </div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="mobileNumber" className={"mb-4"}>
                  <Form.Label>Mobile Number:</Form.Label>
                  <input
                    type="text"
                    placeholder="Enter your mobile number"
                    className={`form-control ${
                      errors.mobileNumber ? "is-invalid" : ""
                    }`}
                    {...register("mobileNumber")}
                  />
                  <div className="invalid-feedback">
                    {errors.mobileNumber?.message}
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="username" className={"mb-4"}>
                  <Form.Label>Username:</Form.Label>
                  <input
                    type="text"
                    placeholder="Choose a username"
                    className={`form-control ${
                      errors.username ? "is-invalid" : ""
                    }`}
                    {...register("username")}
                  />
                  <div className="invalid-feedback">
                    {errors.username?.message}
                  </div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="password" className={"mb-4"}>
                  <Form.Label>Password:</Form.Label>
                  <input
                    type="password"
                    placeholder="Choose a password"
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    {...register("password")}
                  />
                  <div className="invalid-feedback">
                    {errors.password?.message}
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <SubmitButton
              className="mt-4 w-100"
              type="submit"
              isLoading={isLoading}
              label="Sign Up"
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

            {/* Link to Sign-In Page */}
            <div className="text-center mt-4">
              <Link to="/sign-in">Already have an account? Sign in</Link>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default SignUp;
