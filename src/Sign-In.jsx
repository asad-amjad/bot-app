// import React from 'react';

import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div
        className="bg-white p-4 rounded shadow-lg"
        style={{ maxWidth: "450px", width: "100%" }}
      >
        <h2 className="text-center mb-4">Login</h2>
        <form>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              Email Address
            </label>
            <input
              className="form-control"
              type="email"
              id="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              className="form-control"
              type="password"
              id="password"
              placeholder="Enter your password"
            />
          </div>
          <button
            className="btn btn-primary w-100"
            type="submit"
            onClick={() => navigate("/dashboard")}
          >
            Sign In
          </button>
          <div className="text-center mt-3">
            <a className="text-primary" href="#">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
