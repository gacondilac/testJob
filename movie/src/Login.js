import "./login.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { DecodeToken } from "./utils/DecodeToken";
import Cookies from "js-cookie";
const LOGIN_URL = "https://localhost:7170/api/Authenticate/login";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({ mode: "onChange" });
  const onSubmit = (data) => {
    axios.post(LOGIN_URL, data).then((response) => {
      const token = response.data;
      Cookies.set("token", token, { expires: 7 });
      if (DecodeToken(response.data).role === "Admin") {
        navigate("/");
      }
    });
  };

  return (
    <>
      <div className="login-area">
        <div className="login-form-wrap">
          <h1 className="m-0 text-center login-title">Sign in your account</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label" htmlFor="userName">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="userName"
                autoComplete="off"
                {...register("userName", {
                  required: "User name is required",
                })}
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                {...register("password", {
                  required: "password is required",
                })}
              />
            </div>

            <button
              disabled={!isValid}
              type="submit"
              className="btn-login btn-custom-loading mb-3"
            >
              <div className="loader"></div>
              <span>Sign in</span>
            </button>
          </form>
          <p className="form-label">
            Need an Account?
            <br />
            <span className="form-label">
              <a href="/register">Sign Up</a>
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
