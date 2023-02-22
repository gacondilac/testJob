// import { useRef, useState, useEffect } from "react";
import "./login.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
const REGISTER_URL = "https://localhost:7170/api/Authenticate/register";
const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const ShowErrorMessage = ({ name }) => {
    return (
      <div className="row">
        <div className="col-sm-3"></div>
        <div className="col-sm-9 ps-0">
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => <p className="error-message">{message}</p>}
          />
        </div>
      </div>
    );
  };
  const onSubmit = (data) => {
    axios.post(REGISTER_URL, data).then(() => {
      navigate("/login");
    });
  };
  return (
    <>
      <div className="login-area">
        <div className="login-form-wrap">
          <h1 className="m-0 text-center login-title">Register</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label" htmlFor="userName">
                Username
              </label>
              <input
                type="text"
                id="userName"
                className="form-control"
                autoComplete="off"
                {...register("userName", {
                  required: "User name is required",
                })}
              />
            </div>
            <ShowErrorMessage name="userName" />
            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                autoComplete="off"
                {...register("email", {
                  required: "Email is required",
                })}
              />
            </div>
            <ShowErrorMessage name="email" />
            <div className="mb-3">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                {...register("password", {
                  required: "Password is required",
                })}
              />
            </div>
            <ShowErrorMessage name="password" />
            <div className="mb-3">
              <label className="form-label" htmlFor="confirm_pwd">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm_pwd"
                className="form-control"
                {...register("confirm_pwd", {
                  required: "Confirm password is required",
                  validate: (val) => {
                    if (watch("password") !== val) {
                      return "Your passwords do no match";
                    }
                  },
                })}
              />
            </div>
            <ShowErrorMessage name="confirm_pwd" />
            <button
              disabled={!isValid}
              type="submit"
              className="btn-login btn-custom-loading mb-3 "
            >
              <div className="loader"></div>
              <span>Register</span>
            </button>
          </form>
          <p className="form-label">
            Already registered?
            <br />
            <span>
              <a href="/login">Sign In</a>
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
